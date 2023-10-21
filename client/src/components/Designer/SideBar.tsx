import React, { useCallback, useEffect, useState } from "react";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import * as MUIcon from "@mui/icons-material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import EventIcon from "@mui/icons-material/Event";
import CycloneOutlined from "@mui/icons-material/CycloneOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import DonutSmallOutlinedIcon from "@mui/icons-material/DonutSmallOutlined";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { EdgeName, useEdgeNames } from "../../store/flow-context";
import {
  convertAgentsToAslFile,
  convertEnvironmentModelToJava,
  convertMasModelToJava,
  createAndDownloadFiles,
} from "../../utils/convertCode";
import { callApi } from "../../utils/callApi";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Sidebar = (props: any) => {
  const { setEdgeName, setdownloadClicked, reactFlowInstance } = useEdgeNames();
  const { nodeName, setNodeName, nodeSubtitle, setNodeSubtitle } =
    useEdgeNames();
  const [selectedProject, setSelectedProject] = React.useState("");

  interface Node {
    width: number;
    height: number;
    id: string;
    type: string;
    position: { x: number; y: number };
    data: { label: string; name: string };
    selected: boolean;
    positionAbsolute: { x: number; y: number };
    dragging: boolean;
  }

  interface AslData {
    planName: string;
    beliefs: string;
    actions?: string[];
  }

  interface Edge {
    source: string;
    sourceHandle: null;
    target: string;
    targetHandle: null;
    type: string;
    markerStart: { type: string };
    label: string;
    deletable: boolean;
    id: string;
  }

  interface Data {
    nodes: Node[];
    edges: Edge[];
  }

  const handleChange = (event: any) => {
    setSelectedProject(event.target.value);
  };

  const onDragStart = (
    event: any,
    nodeType: any,
    nodeName: string,
    icon: keyof typeof MUIcon
  ) => {
    var obj = { type: nodeType, name: nodeName, icon: icon };
    event.dataTransfer.setData("application/reactflow", JSON.stringify(obj));
    event.dataTransfer.effectAllowed = "move";
  };
  function onModelExportClick(): void {
    callApi(
      `/api/sessions/getFlowDataByFileName?flowFileName=${selectedProject}&userId=${props.userId}`,
      "GET"
    )
      .then((data) => {
        const files = data.map((pair: any) => {
          return { filename: pair.flowFileName, content: pair.flowFileData };
        });
        console.log("files-sidebar", files);
        createAndDownloadFiles(files, selectedProject + "_models");
      })
      .catch((error) => {
        console.error("Error fetching tree data:", error);
      });
  }

  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Simulating an asynchronous API call to fetch the array data
    console.log("instant tree", props.instantTreeData);
    const projects = collectFolderNames(props.instantTreeData);
    console.log("projects", projects);
    setOptions(projects);
  }, [props.instantTreeData]);

  const collectFolderNames = (data: any) => {
    const folderNames: any = [];

    const processNode = (node: any) => {
      if (node.type === "folder") {
        if (node.name !== "projects") folderNames.push(node.name);
        if (node.files) {
          node.files.forEach(processNode);
        }
      }
    };

    data.forEach(processNode);
    return folderNames;
  };

  function onCodeExportCodeClick(): void {
    console.log("selectedProject", selectedProject);

    callApi(
      `/api/sessions/getFlowDataByFileName?flowFileName=${selectedProject}&userId=${props.userId}`,
      "GET"
    )
      .then((data) => {
        const fileData = data.map((pair: any) => {
          return { fileName: pair.flowFileName, content: pair.flowFileData };
        });

        console.log("fileData", fileData);
        let masData = fileData.find((item: any) =>
          item.fileName.includes(".mas")
        );
        let environmentData = fileData.find((item: any) =>
          item.fileName.includes(".env")
        );
        console.log(masData);

        console.log(environmentData);
        const params = extractLabelsFromJSON(environmentData.content);
        let environmentNodeName;
        const beforeDotEnv = environmentData.fileName.split(".env")[0];
        const afterLastUnderscore = beforeDotEnv.split("_").pop();

        if (afterLastUnderscore) {
          environmentNodeName = afterLastUnderscore;
          console.log("beforeDotEnv", beforeDotEnv);
          console.log("afterLastUnderscore", afterLastUnderscore);
        } else {
          console.log("Pattern not found");
        }
        let masFileName = "";

        const beforeDotMas = masData.fileName.split(".mas")[0];
        const afterLastUnderscoreMas = beforeDotMas.split("_").pop();

        if (afterLastUnderscoreMas) {
          masFileName = afterLastUnderscoreMas;
        } else {
          console.log("Pattern not found");
        }
        console.log(params);

        if (masFileName === environmentNodeName) {
          masFileName = masFileName + "MAS";
        }

        var masCode = convertMasModelToJava(
          masFileName,
          environmentNodeName,
          params
        );
        var envCode = convertEnvironmentModelToJava(
          environmentNodeName,
          params
        );

        var files = [];

        files.push({
          filename: masFileName + ".java",
          content: masCode,
        });
        files.push({
          filename: environmentNodeName + ".java",
          content: envCode,
        });

        var agentNames = extractLabelsFromJSONforAgents(masData.content);
        console.log("agentNames", agentNames);

        // var allCapabilitiesForMas = getCapabilitiesWithRelatedAgentsFor(
        //   masData.content
        // );
        // console.log("asd", allCapabilitiesForMas); //TODO: Check the subcapability if necessary

        for (var i = 0; i < agentNames.length; i++) {
          var sourceLabel = getCapabilitiesWithRelatedAgents(
            agentNames[i],
            masData.content
          );

          // eslint-disable-next-line no-loop-func
          let capabilityData = fileData.find((item: any) =>
            item.fileName
              .toLowerCase()
              .includes(sourceLabel.toLowerCase() + ".cap")
          );
          const capabilityJsonData = JSON.parse(capabilityData.content);
          console.log("capabilityJsonData", capabilityJsonData);
          let aslFileMainList: AslData[] = [];

          capabilityJsonData.nodes.forEach(
            (nodeElement: { data: { label: string; name: string } }) => {
              if (
                nodeElement.data.name === "belief" ||
                nodeElement.data.name === "relation"
              ) {
                console.log("belief or rel", nodeElement.data.label);
              }
              if (nodeElement.data.name === "plan") {
                const planName: string = nodeElement.data.label;

                let connectedNodesWithPlans =
                  checkBeliefOfRelationNodeHasConnectionWithPlan(
                    planName,
                    capabilityJsonData
                  );
                console.log(
                  "connectedNodesWithPlans_",
                  planName + "," + connectedNodesWithPlans
                );
                // connectedNodesWithPlans.map(function(x){return x.replace(/,/g, ';');});

                aslFileMainList.push({
                  planName: planName,
                  beliefs: connectedNodesWithPlans.join(";"),
                  actions: [],
                });

                let planData = fileData.find((item: any) =>
                  item.fileName
                    .toLowerCase()
                    .includes(planName.toLowerCase() + ".pln")
                );

                let planJsonData = JSON.parse(planData.content);

                planJsonData.nodes.forEach(
                  (planNodeElement: { data: { name: string; label: any } }) => {
                    if (
                      planNodeElement.data.name === "action" ||
                      planNodeElement.data.name === "message"
                    ) {
                      const action = planNodeElement.data.label;

                      const matchingAslData = aslFileMainList.find(
                        (aslData) => aslData.planName === planName
                      );
                      if (matchingAslData) {
                        matchingAslData.actions =
                          matchingAslData.actions.concat(action);
                      }
                      console.log("plan with actions", planName + "," + action);
                    }
                  }
                );
              }
            }
          );

          console.log("asldata;", aslFileMainList);
          var fileName = agentNames[i] + ".asl";
          var content = convertAgentsToAslFile(agentNames[i], aslFileMainList); //"This is the content of " + agentName + " file.";

          files.push({ filename: fileName, content: content });
          console.log("files;", files);
        }

        createAndDownloadFiles(files, selectedProject + "_codes");
      })
      .catch((error) => {
        alert(
          "Please be sure that each plan/capability has value and matched with file names!"
        );
        console.error("Error fetching tree data:", error);
      });
  }
  // TODO: Refactor for generic method all node types
  function extractLabelsFromJSON(jsonString: any) {
    var json = JSON.parse(jsonString);
    var nodes = json.nodes;
    console.log("nodes", nodes);
    var labels = [];

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      // console.log("node", node.data);
      // var data = JSON.parse(node.data);
      var type = node.data.name; //JSON.parse(node.type);
      var label = node.data.label;

      console.log("type", type);
      // console.log("label", label);
      // console.log("label123", node.data.label);
      if (type === "operation" || type === "environment") labels.push(label);
    }

    return labels;
  }

  function extractLabelsFromJSONforAgents(jsonString: any) {
    var json = JSON.parse(jsonString);
    var nodes = json.nodes;
    console.log("nodes", nodes);
    var labels = [];

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      // console.log("node", node.data);
      // var data = JSON.parse(node.data);
      var type = node.data.name;
      var label = node.data.label;
      // console.log("label", label);
      // console.log("label123", node.data.label);
      if (type === "agent") labels.push(label);
    }

    return labels;
  }

  function checkBeliefOfRelationNodeHasConnectionWithPlan(
    nodeLabel: string,
    capabilityData: any
  ): string[] {
    console.log("capabilityData", capabilityData);
    let nodes = capabilityData.nodes;
    let edges = capabilityData.edges;

    const connectedNodes = nodes.filter(
      (node: { data: { label: any } }) => node.data.label === nodeLabel
    );
    if (connectedNodes.length === 0) {
      // Node not found
      return [];
    }
    const connectedLabels: string[] = [];
    let nodeLabels = "";
    connectedNodes.forEach((node: { id: any }) => {
      edges.forEach((edge: { source: any; target: any }) => {
        if (edge.source === node.id) {
          const targetNode = nodes.find(
            (n: { id: any }) => n.id === edge.target
          );
          if (targetNode) {
            nodeLabels = targetNode.data.label;
            if (nodeLabels.includes(":")) {
              nodeLabels = nodeLabels.split(":")[1];
            }
            connectedLabels.push(nodeLabels);
          }
        }
        if (edge.target === node.id) {
          const sourceNode = nodes.find(
            (n: { id: any }) => n.id === edge.source
          );
          if (sourceNode) {
            nodeLabels = sourceNode.data.label;
            if (sourceNode.data.label.includes(":")) {
              nodeLabels = nodeLabels.split(":")[1];
            }
            connectedLabels.push(nodeLabels);
          }
        }
      });
    });

    return connectedLabels;
  }

  function getCapabilitiesWithRelatedAgents(
    agent: string,
    masData: any
  ): string | null {
    const data: Data = JSON.parse(masData);
    console.log("agent", agent);
    console.log("masData", data);
    let nodeId: string | null = null;
    data.nodes.forEach((node) => {
      if (node.data.label === agent) {
        nodeId = node.id;
        return;
      }
    });
    console.log("nodeId", nodeId);

    let edgeId: string | null = null;
    data.edges.forEach((edge) => {
      if (edge.target === nodeId) {
        edgeId = edge.source;
        return;
      }
    });

    if (edgeId == null) {
      data.edges.forEach((edge) => {
        if (edge.source === nodeId) {
          edgeId = edge.target;
          return;
        }
      });
    }
    console.log("edgeId", edgeId);

    let relatedLabel: string | null = null;
    data.nodes.forEach((node) => {
      if (node.id === edgeId) {
        relatedLabel = node.data.label;
        return;
      }
    });

    return relatedLabel;
  }

  return (
    <Box sx={{ width: "100%", maxWidth: 360 }}>
      <Box sx={{ my: 1, mx: 1 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5" component="div">
              Nodes
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          You can drag these nodes to the pane on the left.
        </Typography>
      </Box>
      <Divider variant="middle" />
      <br />
      <Box>
        {props.selectedPageName === "mas" && (
          <Stack direction="row" spacing={3}>
            <Item
              onDragStart={(event: any) =>
                onDragStart(event, "default", "agent", "AccessibilityNew")
              }
              draggable
            >
              {" "}
              <Tooltip title="Agent Node">
                <AccessibilityNewIcon />
              </Tooltip>
            </Item>
            <Item
              onDragStart={(event: any) =>
                onDragStart(
                  event,
                  "default",
                  "capability",
                  "PsychologyOutlined"
                )
              }
              draggable
            >
              {" "}
              <Tooltip title="Capability Node">
                <PsychologyOutlinedIcon />
              </Tooltip>
            </Item>
            <Item
              onDragStart={(event: any) =>
                onDragStart(event, "default", "environment", "CycloneOutlined")
              }
              draggable
            >
              {" "}
              <Tooltip title="Environment Node">
                <CycloneOutlined />
              </Tooltip>
            </Item>
          </Stack>
        )}
        {props.selectedPageName === "env" && (
          <Stack direction="row" spacing={3}>
            <Item
              onDragStart={(event: any) =>
                onDragStart(event, "default", "event", "Event")
              }
              draggable
            >
              <Tooltip title="Event Node">
                <EventIcon />
              </Tooltip>
            </Item>
            <Item
              onDragStart={(event: any) =>
                onDragStart(event, "default", "operation", "DonutSmallOutlined")
              }
              draggable
            >
              {" "}
              <Tooltip title="Operation Node">
                <DonutSmallOutlinedIcon />
              </Tooltip>
            </Item>
          </Stack>
        )}
        {props.selectedPageName === "cap" && (
          <Stack direction="row" spacing={3}>
            <Item
              onDragStart={(event: any) =>
                onDragStart(event, "default", "belief", "Fireplace")
              }
              draggable
            >
              {" "}
              <Tooltip title="Belief Node">
                <FireplaceIcon />
              </Tooltip>
            </Item>
            <Item
              onDragStart={(event: any) =>
                onDragStart(event, "default", "plan", "RateReviewOutlined")
              }
              draggable
            >
              {" "}
              <Tooltip title="Plan Node">
                <RateReviewOutlinedIcon />
              </Tooltip>
            </Item>
            <Item
              onDragStart={(event: any) =>
                onDragStart(
                  event,
                  "default",
                  "subCapability",
                  "DisplaySettingsOutlined"
                )
              }
              draggable
            >
              {" "}
              <Tooltip title="SubCapability Node">
                <DisplaySettingsOutlinedIcon />
              </Tooltip>
            </Item>
            <Item
              onDragStart={(event: any) =>
                onDragStart(
                  event,
                  "default",
                  "relation",
                  "CompareArrowsOutlined"
                )
              }
              draggable
            >
              {" "}
              <Tooltip title="Relation Node">
                <CompareArrowsOutlinedIcon />
              </Tooltip>
            </Item>
          </Stack>
        )}
        {props.selectedPageName === "pln" && (
          <Stack direction="row" spacing={3}>
            <Item
              onDragStart={(event: any) =>
                onDragStart(event, "default", "action", "PlayCircleFilledWhite")
              }
              draggable
            >
              {" "}
              <Tooltip title="Action Node">
                <PlayCircleFilledWhiteIcon />
              </Tooltip>
            </Item>{" "}
            <Item
              onDragStart={(event: any) =>
                onDragStart(event, "default", "message", "MarkAsUnreadOutlined")
              }
              draggable
            >
              {" "}
              <Tooltip title="Message Node">
                <MarkAsUnreadOutlinedIcon />
              </Tooltip>
            </Item>
            <Item
              onDragStart={(event: any) =>
                onDragStart(
                  event,
                  "default",
                  "relation",
                  "CompareArrowsOutlined"
                )
              }
              draggable
            >
              {" "}
              <Tooltip title="Relation Node">
                <CompareArrowsOutlinedIcon />
              </Tooltip>
            </Item>
          </Stack>
        )}
      </Box>

      <Divider variant="middle" />
      <br />
      <Box sx={{ my: 1, mx: 1 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5" component="div">
              Edges
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          You can click these edges to change your edge type.
        </Typography>
      </Box>
      <Divider variant="middle" />

      {props.selectedPageName === "mas" && (
        <Stack direction="row" spacing={2}>
          <Item onClick={(event: any) => setEdgeName(EdgeName.Implements)}>
            {" "}
            <Tooltip title="Implements">
              <DragHandleIcon />
            </Tooltip>
          </Item>
          <Item onClick={() => setEdgeName(EdgeName.InteractsWith)}>
            {" "}
            <Tooltip title="interactsWith">
              <DragHandleIcon />
            </Tooltip>
          </Item>
          <Item onClick={(event: any) => setEdgeName(EdgeName.SubCapability)}>
            {" "}
            <Tooltip title="subCapability">
              <DragHandleIcon />
            </Tooltip>
          </Item>
        </Stack>
      )}
      {props.selectedPageName === "env" && (
        <Stack direction="row" spacing={2}>
          <Item onClick={(event: any) => setEdgeName(EdgeName.PostEvents)}>
            {" "}
            <Tooltip title="PostEvents">
              <DragHandleIcon />
            </Tooltip>
          </Item>
        </Stack>
      )}
      {props.selectedPageName === "cap" && (
        <Stack direction="row" spacing={2}>
          <Item onClick={(event: any) => setEdgeName(EdgeName.HasContext)}>
            {" "}
            <Tooltip title="HasContext">
              <DragHandleIcon />
            </Tooltip>
          </Item>
          <Item onClick={(event: any) => setEdgeName(EdgeName.IsTriggered)}>
            {" "}
            <Tooltip title="IsTriggered">
              <DragHandleIcon />
            </Tooltip>
          </Item>
        </Stack>
      )}
      {props.selectedPageName === "pln" && (
        <Stack direction="row" spacing={2}>
          <Item onClick={(event: any) => setEdgeName(EdgeName.Use)}>
            {" "}
            <Tooltip title="Use">
              <DragHandleIcon />
            </Tooltip>
          </Item>
          <Item onClick={(event: any) => setEdgeName(EdgeName.AddBelief)}>
            {" "}
            <Tooltip title="AddBelief">
              <DragHandleIcon />
            </Tooltip>
          </Item>
          <Item onClick={(event: any) => setEdgeName(EdgeName.DelBelief)}>
            {" "}
            <Tooltip title="DelBelief">
              <DragHandleIcon />
            </Tooltip>
          </Item>
        </Stack>
      )}
      <Divider />
      <br />
      <FormControl sx={{ m: 1, minWidth: 230 }}>
        <InputLabel id="demo-simple-select-helper-label">Projects</InputLabel>

        <Select onChange={handleChange}>
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <br />
      <Stack direction="row" spacing={2}>
        <Button
          onClick={() => onModelExportClick()}
          variant="outlined"
          endIcon={<CloudDownloadIcon />}
        >
          Export Modal
        </Button>
        <br />
        <Button
          onClick={() => onCodeExportCodeClick()}
          variant="outlined"
          endIcon={<CloudDownloadIcon />}
        >
          Export Code
        </Button>
      </Stack>

      <br />
      <Divider variant="middle" />
      <Box sx={{ my: 1, mx: 1 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h5" component="div">
              Update Nodes
            </Typography>
          </Grid>
        </Grid>
        <Typography color="text.secondary" variant="body2">
          Click any node to update name from the label field
        </Typography>
      </Box>
      <Divider variant="middle" />

      <FormGroup>
        <TextField
          id="outlined-basic"
          label="Node Name"
          variant="outlined"
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />
        {nodeSubtitle === "plan" && (
          <FormControlLabel control={<Checkbox />} label="Initialization" />
        )}
      </FormGroup>
    </Box>
  );
};

export default Sidebar;

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
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
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
import httpCommon from "../../utils/http-common";
import {
  convertEnvironmentModelToJava,
  convertMasModelToJava,
  createAndDownloadFiles,
} from "../../utils/convertCode";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Sidebar = (props: any) => {
  const { setEdgeName, setdownloadClicked, reactFlowInstance } = useEdgeNames();
  const { nodeName, setNodeName } = useEdgeNames();
  const [selectedProject, setSelectedProject] = React.useState("");

  const handleChange = (event: any) => {
    setSelectedProject(event.target.value);
  };

  const onDragStart = (event: any, nodeType: any, nodeName: string) => {
    var obj = { type: nodeType, name: nodeName };
    event.dataTransfer.setData("application/reactflow", JSON.stringify(obj));
    event.dataTransfer.effectAllowed = "move";
  };
  function onModelExportClick(): void {
    // iterate localStorage
    var keyValuePairs = getAllValuesWithKeyName(selectedProject);

    const files = keyValuePairs.map((pair) => {
      return { filename: pair.key, content: pair.value };
    });
    createAndDownloadFiles(files, "models");
  }

  const getProjectNamesFromLocalStorage = () => {
    let projectNames: any = [];
    for (var i = 0; i < localStorage.length; i++) {
      // set iteration key name
      var key = localStorage.key(i);

      if (key.includes(".")) {
        var name = key.split("_")[0];

        if (!projectNames.includes(name)) {
          projectNames.push(name);
        }
        console.log("key: ", key);
        console.log("projects: ", projectNames);
      }
      // console.log the iteration key and value
      // console.log("Key: " + key + ", Value: " + value);
    }
    return projectNames;
  };
  function getAllValuesWithKeyName(keyName: any) {
    var matchingValues = [];

    for (var i = 0; i < localStorage.length; i++) {
      var key = localStorage.key(i);

      if (key.includes(keyName)) {
        var value = localStorage.getItem(key);
        matchingValues.push({ key: key, value: value });
      }
    }

    return matchingValues;
  }
  // function getAllValuesWithKeyName(keyName: any) {
  //   var matchingValues = [];

  //   for (var i = 0; i < localStorage.length; i++) {
  //     var key = localStorage.key(i);

  //     if (key.includes(keyName)) {
  //       var value = localStorage.getItem(key);
  //       matchingValues.push(value);
  //     }
  //   }

  //   return matchingValues;
  // }
  function onCodeExportCodeClick(): void {
    let masFileName: any;
    let environmentFileName: any;

    var keyValuePairs = getAllValuesWithKeyName(selectedProject);
    for (let index = 0; index < keyValuePairs.length; index++) {
      const element = keyValuePairs[index];
      console.log("keyval", keyValuePairs);
      if (element.key.includes(".mas")) {
        masFileName = element.key;
      }
      if (element.key.includes(".env")) {
        environmentFileName = element.key;
      }
    }
    console.log("mas", masFileName);
    console.log("environmentName", environmentFileName);

    var environmentValue = keyValuePairs.find(function (item) {
      return item.key === environmentFileName;
    });

    var masValue = keyValuePairs.find(function (item) {
      return item.key === masFileName;
    });
    console.log("masValue", masValue.value);
    console.log("environmentValue", environmentValue.value);

    const params = extractLabelsFromJSON(environmentValue.value);
    const environmentNodeName = extractLabelsFromJSON(masValue.value)[0];
    console.log("environmentNodeName", environmentNodeName);
    console.log("params", params);

    const parameters = ["goToGarbage", "goToBurner", "startBurn", "reTryTrash"];

    var masCode = convertMasModelToJava(
      masFileName.split("_")[1].split(".")[0],
      environmentNodeName,
      params
    );
    var envCode = convertEnvironmentModelToJava(environmentNodeName, params);

    const files = [
      {
        filename: masFileName.split("_")[1].split(".")[0] + ".java",
        content: masCode,
      },
      { filename: environmentNodeName + ".java", content: envCode },
    ];
    createAndDownloadFiles(files, "codes");
  }

  function extractLabelsFromJSON(jsonString: any) {
    var json = JSON.parse(jsonString);
    var nodes = json.nodes;
    console.log("nodes", nodes);
    var labels = [];

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      // console.log("node", node.data);
      // var data = JSON.parse(node.data);
      var type = JSON.parse(node.type);
      var label = node.data.label;
      // console.log("label", label);
      // console.log("label123", node.data.label);
      if (type.name === "operation" || type.name === "environment")
        labels.push(label);
    }

    return labels;
  }

  const names = getProjectNamesFromLocalStorage();

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
                onDragStart(event, "default", "agent")
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
                onDragStart(event, "default", "capability")
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
                onDragStart(event, "default", "environment")
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
                onDragStart(event, "default", "event")
              }
              draggable
            >
              <Tooltip title="Event Node">
                <EventIcon />
              </Tooltip>
            </Item>
            <Item
              onDragStart={(event: any) =>
                onDragStart(event, "default", "operation")
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
                onDragStart(event, "default", "belief")
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
                onDragStart(event, "default", "plan")
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
                onDragStart(event, "default", "subCapability")
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
                onDragStart(event, "default", "relationNode")
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
                onDragStart(event, "default", "action")
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
                onDragStart(event, "default", "message")
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
                onDragStart(event, "default", "relationNode")
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

        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedProject}
          onChange={handleChange}
        >
          {names.map((name: any) => (
            <MenuItem key={name} value={name}>
              {name}
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
      <TextField
        id="outlined-basic"
        label="Node Name"
        variant="outlined"
        value={nodeName}
        onChange={(evt) => setNodeName(evt.target.value)}
      />
    </Box>
  );
};

export default Sidebar;

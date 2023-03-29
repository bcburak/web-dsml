import React, { useCallback, useEffect, useState } from "react";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import EventIcon from "@mui/icons-material/Event";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import CycloneIcon from "@mui/icons-material/Cyclone";
import GroupsIcon from "@mui/icons-material/Groups";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { EdgeName, useEdgeNames } from "../../store/flow-context";
import httpCommon from "../../utils/http-common";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Sidebar = (props: any) => {
  // const [downloadClicked, setdownloadClicked] = useState(false);

  const { setEdgeName, setdownloadClicked, reactFlowInstance } = useEdgeNames();
  const { nodeName, setNodeName } = useEdgeNames();

  const onDragStart = (event: any, nodeType: any, nodeName: string) => {
    var obj = { type: nodeType, name: nodeName };
    event.dataTransfer.setData("application/reactflow", JSON.stringify(obj));
    event.dataTransfer.effectAllowed = "move";
  };
  function onDownloadClick(): void {
    const flow = reactFlowInstance.toObject();
    const fileData = JSON.stringify(flow);
    console.log("instance", flow);
    localStorage.setItem("reactFlowInstance", fileData);
    httpCommon.post("/userData", fileData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "flowFile.json";
    link.href = url;
    link.click();
  }

  // if (reactFlowInstance && isDownloadActive) {
  //   console.log("active");
  //   const flow = reactFlowInstance.toObject();
  //   localStorage.setItem(reactFlowInstance, JSON.stringify(flow));
  // }
  // const createFlowFile = () => {

  // };

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
                <PlayCircleFilledWhiteIcon />
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
                <PlayCircleFilledWhiteIcon />
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
                <PlayCircleFilledWhiteIcon />
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
                <NextPlanIcon />
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
                <PlayCircleFilledWhiteIcon />
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
                <PlayCircleFilledWhiteIcon />
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
                <NextPlanIcon />
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
                <PlayCircleFilledWhiteIcon />
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
      <br />
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
      <Stack direction="row" spacing={200}>
        <Button
          onClick={() => onDownloadClick()}
          variant="contained"
          endIcon={<CloudDownloadIcon />}
        >
          Save & Download
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

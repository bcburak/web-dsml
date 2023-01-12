import React from "react";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box, Button, Divider, Grid, Tooltip, Typography } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import EventIcon from "@mui/icons-material/Event";
import NextPlanIcon from "@mui/icons-material/NextPlan";
import CycloneIcon from "@mui/icons-material/Cyclone";
import GroupsIcon from "@mui/icons-material/Groups";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Sidebar = () => {
  const onDragStart = (event: any, nodeType: any, nodeName: string) => {
    var obj = { type: nodeType, name: nodeName };
    event.dataTransfer.setData("application/reactflow", JSON.stringify(obj));
    event.dataTransfer.effectAllowed = "move";
  };
  const onEdgeClick = (event: any, edgeLabel: string) => {};

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
        <Stack direction="row" spacing={3}>
          <Item
            onDragStart={(event: any) => onDragStart(event, "default", "agent")}
            draggable
          >
            {" "}
            <Tooltip title="Agent Node">
              <AccessibilityNewIcon />
            </Tooltip>
          </Item>
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
              onDragStart(event, "default", "action")
            }
            draggable
          >
            {" "}
            <Tooltip title="Action Node">
              <PlayCircleFilledWhiteIcon />
            </Tooltip>
          </Item>
          <Item
            onDragStart={(event: any) => onDragStart(event, "default", "event")}
            draggable
          >
            {" "}
            <Tooltip title="Event Node">
              <EventIcon />
            </Tooltip>
          </Item>
        </Stack>
        <Divider variant="middle" />
        <br />
        <Stack direction="row" spacing={3}>
          <Item
            onDragStart={(event: any) => onDragStart(event, "default", "plan")}
            draggable
          >
            {" "}
            <Tooltip title="plan Node">
              <NextPlanIcon />
            </Tooltip>
          </Item>
          <Item
            onDragStart={(event: any) =>
              onDragStart(event, "default", "Environment")
            }
            draggable
          >
            {" "}
            <Tooltip title="Environment Node">
              <CycloneIcon />
            </Tooltip>
          </Item>
          <Item
            onDragStart={(event: any) => onDragStart(event, "default", "Mas")}
            draggable
          >
            {" "}
            <Tooltip title="Mas Node">
              <GroupsIcon />
            </Tooltip>
          </Item>
        </Stack>
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

      <Stack direction="row" spacing={2}>
        <Item onClick={(event: any) => onEdgeClick(event, "implements")}>
          {" "}
          <Tooltip title="Implements">
            <DragHandleIcon />
          </Tooltip>
        </Item>
        <Item onClick={(event: any) => onEdgeClick(event, "interactsWith")}>
          {" "}
          <Tooltip title="interactsWith">
            <DragHandleIcon />
          </Tooltip>
        </Item>
        <Item onClick={(event: any) => onEdgeClick(event, "subCapability")}>
          {" "}
          <Tooltip title="subCapability">
            <DragHandleIcon />
          </Tooltip>
        </Item>
      </Stack>
      <Divider />
      <br />
      <Stack direction="row" spacing={200}>
        <Button
          onClick={(event: any) => onEdgeClick(event, "implements")}
          variant="contained"
          endIcon={<CloudDownloadIcon />}
        >
          Download
        </Button>
      </Stack>
    </Box>
  );
};

export default Sidebar;

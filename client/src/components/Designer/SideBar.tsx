import React from "react";
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Tooltip } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const Sidebar = () => {
  const onDragStart = (event:any, nodeType:any) => {
    var obj = { type:nodeType,name:"agent"};
    event.dataTransfer.setData("application/reactflow", JSON.stringify(obj));
    event.dataTransfer.effectAllowed = "move";
  };
  return (
 <aside>
  <div className="description">
        You can drag these nodes to the pane on the right.
      </div>

<Stack direction="row" spacing={2}>
  <Item onDragStart={(event:any) => onDragStart(event, "input")}
        draggable> <Tooltip title="Agent Node"><AccessibilityNewIcon /></Tooltip></Item>
  <Item onDragStart={(event:any) => onDragStart(event, "default")}
        draggable> <PlayCircleFilledWhiteIcon>Action Node</PlayCircleFilledWhiteIcon></Item>
  <Item onDragStart={(event:any) => onDragStart(event, "default")}
        draggable> <AccessibilityNewIcon>Agent Node</AccessibilityNewIcon></Item>
  <Item onDragStart={(event:any) => onDragStart(event, "default")}
        draggable> <AccessibilityNewIcon>Agent Node</AccessibilityNewIcon></Item>

</Stack>
    </aside>
   
  );
};

export default Sidebar;

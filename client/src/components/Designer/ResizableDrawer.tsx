import React, { useCallback } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Divider } from "@mui/material";
import Tree from "../Tree/Tree";

export const defaultDrawerWidth = 240;
const minDrawerWidth = 50;
const maxDrawerWidth = 1000;

const useStyles = styled("div")(({ theme }) => ({
  drawer: {
    flexShrink: 0,
  },
  toolbar: theme.mixins.toolbar,
  dragger: {
    width: "5px",
    cursor: "ew-resize",
    padding: "4px 0 0",
    borderTop: "1px solid #ddd",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "#f4f7f9",
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface ChildProps {
  onUpdate: (state: any) => void;
  handleDrawerClose: () => void;
  onNodeClick: (node: any) => void;

  data: any;
  open: boolean;
}
const ResizableDrawer: React.FC<ChildProps> = ({
  handleDrawerClose,
  open,
  data,
  onUpdate,
  onNodeClick,
}) => {
  const theme = useTheme();
  const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth);

  const handleMouseDown = (e: any) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback((e: any) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);
  return (
    <Drawer
      sx={{
        width: drawerWidth,

        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          resize: "horizontal",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <div
        onMouseDown={(e) => handleMouseDown(e)}
        style={{
          width: "5px",
          cursor: "ew-resize",
          padding: "4px 0 0",
          borderTop: "1px solid #ddd",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          backgroundColor: "#f4f7f9",
        }}
      />
      <div />
      <div onMouseDown={(e) => handleMouseDown(e)} />
      <DrawerHeader>
        <Typography
          sx={{
            "&.MuiTypography-root": {
              //MuiTypography-root
              margin: "auto",
              boxSizing: "border-box",
              resize: "horizontal",
            },
          }}
          variant="h6"
          component="div"
        >
          Project Files
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />
      {/* <Tree
        children={[]}
        data={data}
        onUpdate={onUpdate}
        onNodeClick={onNodeClick}
      /> */}
    </Drawer>
  );
};

export default ResizableDrawer;

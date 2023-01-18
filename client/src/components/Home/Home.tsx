import React, { useState, useLayoutEffect } from "react";
import "./style.css";
import "reactflow/dist/style.css";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tree from "../Tree/Tree";
import Sidebar from "../Designer/SideBar";
import FlowLayout from "../Designer/FlowLayout";

import { TabList, TabContext, TabPanel } from "@mui/lab";

import CloseIcon from "@mui/icons-material/Close";
import { Tab } from "@mui/material";
import FlowProvider from "../../store/FlowProvider";

interface Node {
  type: string;
  name: string;
  id: string;
}

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  paddingTop: "inherit",
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const structure = [
  {
    type: "folder",
    name: "projects",
    files: [
      {
        type: "folder",
        name: "project#1",
        files: [{ type: "file", name: "dsml.flow" }],
      },
      { type: "file", name: "setup.js" },
    ],
  },
];

function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = useState("Main");

  const [tabs, setTabs] = useState([]);
  // const [panels, setPanels] = useState([]);
  const [tabIndex, setTabIndex] = useState(2);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let [data, setData] = useState(structure);

  const handleClick = (node: any) => {
    console.log("handle click");
    console.log(node.node.type);
    if (node.node.type === "file") {
      createNewTab(node.node.name);
    }
  };
  const handleUpdate = (state: any) => {
    console.log(state);
    localStorage.setItem(
      "tree",
      JSON.stringify(state, function (key, value) {
        if (key === "parentNode" || key === "id") {
          return null;
        }
        return value;
      })
    );
  };

  const handleTabOptions = (value: any) => {
    setSelectedTab(value);
    setTabIndex(tabIndex + 1);
  };
  const createNewTab = (fileName: any) => {
    const value = fileName;
    const newTab = {
      value: value,
      child: () => <FlowLayout />,
      index: tabIndex,
    };

    setTabs([...tabs, newTab]);
    console.log("newtab", newTab);
    // setPanels([
    //     ...panels,
    //     {
    //         value: value,
    //         child: () => <div style={{height: '300px', width: '300px', backgroundColor: 'blue'}} />
    //     }
    // ])

    handleTabOptions(value);
  };

  useLayoutEffect(() => {
    try {
      let savedStructure = JSON.parse(localStorage.getItem("tree") as any);
      if (savedStructure) {
        setData(savedStructure);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleTabClose = (event: any, value: any) => {
    console.log(value);
    const tabArr = tabs.filter((x) => x.value !== value);
    console.log(tabArr);
    setTabs(tabArr);

    // const panelArr = panels.filter(p => p.value !== value)
    // setPanels(panelArr);
  };

  return (
    <FlowProvider>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              sx={{
                "& 	.MuiTypography-root": {
                  //MuiTypography-root
                  margin: "auto",
                  boxSizing: "border-box",
                },
              }}
              variant="h6"
              noWrap
              component="div"
            >
              Web Flow DSML
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <Typography
              sx={{
                "&.MuiTypography-root": {
                  //MuiTypography-root
                  margin: "auto",
                  boxSizing: "border-box",
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
          <Tree
            children={[]}
            data={data}
            onUpdate={handleUpdate}
            onNodeClick={handleClick}
          />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />

          <TabContext value={selectedTab}>
            <TabList aria-label="lab API tabs example">
              {tabs.map((tab) => (
                <Tab
                  icon={
                    <CloseIcon onClick={(e) => handleTabClose(e, tab.value)} />
                  }
                  iconPosition="end"
                  key={tab.value}
                  tabIndex={tab.index}
                  label={tab.value}
                  value={tab.value}
                />
              ))}
            </TabList>

            {tabs.map((panel) => (
              <TabPanel
                key={panel.value}
                value={panel.value}
                sx={{
                  "&.MuiTabPanel-root": {
                    width: "100%",
                    height: "100%",
                    padding: "0px",
                  },
                }}
              >
                {panel.child()}
              </TabPanel>
            ))}
          </TabContext>
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              // backgroundColor: "red",
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="right"
        >
          <Toolbar style={{ backgroundColor: "text.disabled" }}>
            <Typography
              sx={{
                "&.MuiTypography-root": {
                  margin: "auto",
                  boxSizing: "border-box",
                },
              }}
              variant="h6"
              component="div"
            >
              Designer Tool Box
            </Typography>
          </Toolbar>
          <Divider />

          <Sidebar />
        </Drawer>
      </Box>
    </FlowProvider>
  );
}

export default Home;

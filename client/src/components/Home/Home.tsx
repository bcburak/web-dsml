import React, { useState, useLayoutEffect, useEffect } from "react";
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
import { Button, Tab, Tabs } from "@mui/material";
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

interface TabData {
  title: string;
  content: React.ReactNode;
}

function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [tabs, setTabs] = useState<TabData[]>([
  //   { title: "Tab 1", content: <FlowLayout /> },
  // ]);
  // const [value, setValue] = useState(0);

  // const [selectedTab, setSelectedTab] = useState("Main");

  // const [tabs, setTabs] = useState([]);
  // const [panels, setPanels] = useState([]);
  // const [tabIndex, setTabIndex] = useState<number>(0);
  // const [activeNode, setActiveNode] = useState<any>([]);

  const [selectedTab, setSelectedTab] = useState("Main");

  const [tabs, setTabs] = useState([]);
  const [tabIndex, setTabIndex] = useState(2);

  const handleChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  const handleTabOptions = (value: any) => {
    setSelectedTab(value);
    setTabIndex(tabIndex + 1);
  };

  const addTab = () => {
    const value = `Blue Box ${tabIndex}`;
    const newTab = {
      value: value,
      child: () => <FlowLayout fileName={value} />,
      index: tabIndex,
    };

    setTabs([...tabs, newTab]);

    handleTabOptions(value);
  };

  const handleTabClose = (event: any, value: any) => {
    tabs.map((e) => console.log("e.value", e.value));
    const tabArr = tabs.filter((x) => x.value !== value);
    console.log("tabArr", tabArr);
    setTabs(tabArr);
    setSelectedTab(tabArr[0].value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let [data, setData] = useState(structure);

  const handleUpdate = (state: any) => {
    console.log("update", state);
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

  // useEffect(() => {
  //   console.log("active tab ", tabIndex);
  //   console.log("activeNode tab ", activeNode);
  //   console.log("activeNode type ", activeNode.node);

  //   // if (activeNode.node.type === "file") {
  //   //   setTabIndex((tabIndex) => tabIndex + 1);
  //   //   console.log("node handle", tabIndex);
  //   //   //createNewTab(node.node.name);
  //   //   // setActiveTabIndex((activeTabIndex) => activeTabIndex + 1);
  //   // }
  //   // setTabIndex(tabIndex + 1);
  //   console.log("tabIndex", tabIndex);
  // }, [activeNode, tabIndex]);

  // const increase = () => {
  //   setTabIndex((tabIndex) => tabIndex + 1);
  // };

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
          <Button onClick={addTab}></Button>

          {/* <Tree
            children={[]}
            data={data}
            onUpdate={handleUpdate}
            activeTabIndex={tabIndex}
            onNodeClick={handleNodeClick}
          />
          {tabIndex} */}
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <TabContext value={selectedTab}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {tabs.map((tab) => (
                <Tab
                  icon={
                    <CloseIcon onClick={(e) => handleTabClose(e, tab.value)} />
                  }
                  iconPosition="end"
                  key={tab.value}
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

          {/* <TabContext value={selectedTab}>
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
                  onClick={() => {
                    setSelectedTab(tab.value);
                    console.log("on tab click", tab.value);
                  }}
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
          </TabContext> */}
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

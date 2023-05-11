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
import FolderTree from "react-folder-tree";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import { TabList, TabContext, TabPanel } from "@mui/lab";

import CloseIcon from "@mui/icons-material/Close";
import { Button, Tab } from "@mui/material";
import FlowProvider from "../../store/FlowProvider";
// import { renderers as bpRenderers } from "react-complex-tree-blueprintjs-renderers";
// import {
//   ControlledTreeEnvironment,
//   StaticTreeDataProvider,
//   Tree,
//   TreeItem,
//   TreeItemIndex,
//   UncontrolledTreeEnvironment,
// } from "react-complex-tree";
// import { longTree, longTreeTemplate, readTemplate } from "../Tree/data";
import { useEdgeNames } from "../../store/flow-context";

interface Node {
  type: string;
  name: string;
  id: string;
}

const initialNodes = [
  {
    root: {
      index: "root",
      canMove: true,
      isFolder: true,
      children: ["Projects"],
      data: "root",
      canRename: true,
    },
    Projects: {
      index: "Projects",
      canMove: true,
      isFolder: true,
      children: ["GarbageCollector"],
      data: "Projects",
      canRename: true,
    },
    GarbageCollector: {
      index: "GarbageCollector",
      canMove: true,
      isFolder: true,
      children: ["Mas", "Blueberry"],
      data: "GarbageCollector",
      canRename: true,
    },
    Mas: {
      index: "Mas",
      canMove: true,
      isFolder: false,
      data: "Mas",
      canRename: true,
    },
    Blueberry: {
      index: "Blueberry",
      canMove: true,
      isFolder: false,
      data: "Blueberry",
      canRename: true,
    },
  },
];

const initState = {
  name: "Project Files",
  checked: 0.5, // half check: some children are checked
  isOpen: true, // this folder is opened, we can see it's children
  children: [
    {
      name: "Garbage Collector",
      checked: 0.5,
      isOpen: false,
      children: [
        { name: "MAS.mas", checked: 0, isFolder: false },
        { name: "environment.env", checked: 0, isFolder: false },
      ],
    },
  ],
};
const drawerWidth = 255;

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

var tabArrInc: any = [];
const treeStructure = [
  {
    type: "folder",
    name: "projects",
    files: [
      {
        type: "folder",
        name: "GarbageCollector",
        files: [
          { type: "file", name: "Mas.mas" },
          { type: "file", name: "Environment.env" },
        ],
      },
      { type: "file", name: "setup.js" },
    ],
  },
];

interface ExactTree {
  [key: string]: {
    index: string;
    canMove: boolean;
    isFolder: boolean;
    children?: string[];
    data: string;
    canRename: boolean;
    countIndex: number;
  };
}

const actualTree: ExactTree = {
  root: {
    index: "root",
    canMove: true,
    isFolder: true,
    children: ["Projects"],
    data: "root",
    canRename: true,
    countIndex: 2,
  },
  Projects: {
    index: "Projects",
    canMove: true,
    isFolder: true,
    children: ["GarbageCollector"],
    data: "Projects",
    canRename: true,
    countIndex: 2,
  },
  GarbageCollector: {
    index: "GarbageCollector",
    canMove: true,
    isFolder: true,
    children: ["Mas", "Blueberry"],
    data: "GarbageCollector",
    canRename: true,
    countIndex: 2,
  },
  Mas: {
    index: "Mas",
    canMove: true,
    isFolder: false,
    data: "Mas",
    canRename: true,
    countIndex: 2,
  },
  Blueberry: {
    index: "Blueberry",
    canMove: true,
    isFolder: false,
    data: "Blueberry",
    canRename: true,
    countIndex: 3,
  },
};

function Home() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const { tabIndex, setTabIndex } = useEdgeNames();
  const [counter, setCounter] = useState(0);
  // const [focusedItem, setFocusedItem] = useState<TreeItem<string>>();
  const [treeState, setTreeState] = useState(initState);

  const [selectedTab, setSelectedTab] = useState("Main");

  const [tabs, setTabs] = useState([]);

  const [treeItems, setTreeItems] = useState<ExactTree>();

  const handleChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
    console.log("setSelectedTab:", newValue);
  };

  // const handleTabOptions = (value: any) => {
  //   setSelectedTab(value);
  //   // setTabIndex(tabIndex + 1);
  //   // setTabIndex(5);
  //   // console.log("tabindex:", tabIndex);
  // };

  const addTab = (parentNode: string, treeFileName: any, itemIndex: any) => {
    // const value = `Blue Box ${itemIndex}`;
    console.log("treeFileName:", treeFileName);
    console.log("itemIndex:", itemIndex);
    const newTab = {
      value: treeFileName,
      child: () => (
        <FlowLayout fileName={parentNode.concat("_", treeFileName)} />
      ),
      index: itemIndex,
    };
    // setTabs([...tabs, newTab]);
    setTabs((prevTabs) => [...prevTabs, newTab]);

    setSelectedTab(treeFileName);
    // handleTabOptions(treeFileName);
  };

  const addNewTreeNode = (nodeName: any) => {
    // let treeNodes = longTree.items;
    nodeName = "Environment";

    const treeNode = {
      index: nodeName,
      canMove: true,
      isFolder: false,
      data: nodeName,
      canRename: true,
      countIndex: 2,
    };

    actualTree[nodeName] = treeNode;
    // const jsonArray = JSON.stringify([actualTree]);

    setTreeItems(actualTree);
    console.log("setted", treeItems);
  };

  const addFileNode = () => {
    const newNode = { name: "new node", checked: 0, isFolder: false };
    console.log("newNode", newNode);

    // get the last children node
    const lastNode = treeState.children[treeState.children.length - 1];

    // add the new node to the last node's children array
    lastNode.children.push(newNode);
    setTreeState(treeState);
  };

  const handleTabClose = (event: any, value: any) => {
    tabs.map((e) => console.log("e.value", e.value));
    // const tabArr = tabs.filter((x) => x.value !== value);
    // console.log("tabArr", tabArr);
    setTabs((tabs) => {
      return tabs.filter((x) => x.value !== value);
    });
    console.log("tabArrtabs", tabs);
    setSelectedTab(tabs[0].value);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let [data, setData] = useState(treeStructure);

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

  const handleClick = (node: any) => {
    let parentNode: string = "";
    console.log("parent node", node.node.parentNode.name);
    console.log(node.node.type);
    if (node.node.parentNode.name !== "undefined") {
      parentNode = node.node.parentNode.name;
    }
    // if (event) {
    //   event.preventDefault();
    setCounter((counter) => counter + 1);
    // console.log("focused", counter);
    // }
    let lastItemOfTabArr = tabArrInc[tabArrInc.length - 1];
    if (node.node.type === "file") {
      if (lastItemOfTabArr.length > 0) {
        console.log("addtab", lastItemOfTabArr);

        const isInsideTabs = lastItemOfTabArr.filter(
          (x: any) => x.value === node.node.name
        ).length;
        if (isInsideTabs === 1) {
          return;
        }

        console.log("isInsideTabs:", isInsideTabs);
      }

      // setTabIndex(tabIndex + 1);
      addTab(parentNode, node.node.name, counter);
    }

    // if (node.node.type === "file") {
    //   createNewTab(node.node.name);
    // }
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

  useEffect(() => {
    console.log("counter", counter);
    console.log("tabs", tabs);
    console.log("treeState", treeState);
    tabArrInc.push(tabs);
  }, [counter, tabs, selectedTab, treeState]);

  useEffect(() => {
    // setTreeItems(actualTree);
    setTreeState(initState);
  }, []);

  // const onTreeItemDoubleClick = async (item: any) => {
  //   // event.preventDefault();
  //   console.log("ontree:");
  //   // if (event) {
  //   //   event.preventDefault();
  //   setCounter((counter) => counter + 1);
  //   // console.log("focused", counter);
  //   // }
  //   if (item.isFolder === false) {
  //     // setTabIndex(tabIndex + 1);
  //     // console.log("tabindex:", tabIndex);
  //     addTab(item.data, counter);
  //   }
  // };

  // const onNameClick = ({ defaultOnClick, nodeData }: any) => {
  //   defaultOnClick();
  //   console.log("nodeData", nodeData);
  //   //   event.preventDefault();
  //   setCounter((counter) => counter + 1);
  //   // console.log("focused", counter);
  //   // }
  //   if (nodeData.isFolder === false) {
  //     // setTabIndex(tabIndex + 1);
  //     // console.log("tabindex:", tabIndex);
  //     addTab(nodeData.name, counter);
  //   }

  //   // const {
  //   //   // internal data
  //   //   path,
  //   //   name,
  //   //   checked,
  //   //   isOpen,
  //   //   // custom data
  //   //   url,
  //   // } = nodeData;
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
          {/* <Button onClick={() => addFileNode()}></Button> */}

          {/* <UncontrolledTreeEnvironment<string>
            canDragAndDrop
            canDropOnFolder
            canReorderItems
            dataProvider={
              new StaticTreeDataProvider(
                treeItems as ExactTree,
                (item, data) => ({
                  ...item,
                  data,
                })
              )
            }
            getItemTitle={(item) => item.data}
            onFocusItem={(item) => setFocusedItem(item)}
            canRename={true}
            defaultInteractionMode={{
              mode: "custom",
              createInteractiveElementProps: (
                item,
                treeId,
                actions,
                renderFlags
              ) => ({
                onDoubleClick: (e) => {
                  e.preventDefault();
                  onTreeItemDoubleClick(e, item);
                },
                onFocus: () => {
                  // console.log("focuus", actions.focusItem());
                },

                tabIndex: !renderFlags.isRenaming
                  ? renderFlags.isFocused
                    ? 0
                    : -1
                  : undefined,
              }),
            }}
            viewState={{
              "tree-1": {
                expandedItems: [],
              },
            }}
            {...bpRenderers}
          >
            <Tree treeId="tree-1" rootItem="root" treeLabel="Projects tree" />
          </UncontrolledTreeEnvironment> */}

          <Tree
            children={[]}
            data={data}
            onUpdate={handleUpdate}
            onNodeClick={handleClick}
          />
          {/* {tabIndex} */}
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

          <Sidebar selectedPageName={selectedTab.split(".")[1]} />
        </Drawer>
      </Box>
    </FlowProvider>
  );
}

export default Home;

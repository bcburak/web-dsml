import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import "./style.css";
import "reactflow/dist/style.css";
import { styled, useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import AccountCircle from "@mui/icons-material/AccountCircle";
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
import { Button, Menu, MenuItem, Tab } from "@mui/material";
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
import ResizableDrawer from "../Designer/ResizableDrawer";
import { callApi } from "../../utils/callApi";

interface FileNode {
  type: "file";
  name: string;
}

interface FolderNode {
  type: "folder";
  name: string;
  files: TreeNode[];
}

type TreeNode = FileNode | FolderNode;

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
const treeStructure: TreeNode[] = [
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

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  picture: any;
  email: string;
  token: string;
}

const defaultDrawerWidth = 256;
const minDrawerWidth = 50;
const maxDrawerWidth = 1000;

function Home(user: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [counter, setCounter] = useState(0);
  const [treeState, setTreeState] = useState(initState);

  const [selectedTab, setSelectedTab] = useState("Main");

  const [tabs, setTabs] = useState([]);

  const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth);

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
    console.log("setSelectedTab:", newValue);
  };

  const addTab = (parentNode: string, treeFileName: any, itemIndex: any) => {
    const newTab = {
      value: treeFileName,
      child: () => (
        <FlowLayout
          fileName={parentNode.concat("_", treeFileName)}
          userId={user.user.id}
        />
      ),
      index: itemIndex,
    };
    // setTabs([...tabs, newTab]);
    setTabs((prevTabs) => [...prevTabs, newTab]);

    setSelectedTab(treeFileName);
    // handleTabOptions(treeFileName);
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
    let treeData = JSON.stringify(state, function (key, value) {
      if (key === "parentNode" || key === "id") {
        return null;
      }
      return value;
    });

    callApi("/api/sessions/createTree", "POST", {
      treeValue: treeData,
      userId: user.user.id,
    })
      .then(async (response) => {})
      .catch((error) => {
        console.error("There was an error!", error);
      });

    console.log("update", state);

    //TODO:Set tree item in mongo
    localStorage.setItem(
      "tree",
      JSON.stringify(state, function (key, value) {
        if (key === "parentNode" || key === "id") {
          return null;
        }
        return value;
      })
    );

    setData(state);
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
    // let getTreeUrl = `http://localhost:8000/api/sessions/getTreeByUserId?userId=${user.user.id}`;

    // fetch(getTreeUrl)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("treedat", JSON.parse(data[0].treeValue));
    //     setData(JSON.parse(data[0].treeValue)); // Assuming the API returns an array of treeValue fields
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching tree data:", error);
    //   });
    setLoading(true);
    callApi(`/api/sessions/getTreeByUserId?userId=${user.user.id}`, "GET").then(
      (data) => {
        setLoading(false);
        console.log("treedat", JSON.parse(data[0].treeValue));
        setData(JSON.parse(data[0].treeValue)); // Assuming the API returns an array of treeValue fields
      }
    );
  }, []);

  useEffect(() => {
    console.log("counter", counter);
    console.log("tabs", tabs);
    console.log("treeState", treeState);
    tabArrInc.push(tabs);
  }, [counter, tabs, selectedTab, treeState]);

  useEffect(() => {
    setTreeState(initState);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
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
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Web Flow DSML
            </Typography>

            <div
              style={{
                marginInlineEnd: "230px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            minWidth: defaultDrawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              minWidth: defaultDrawerWidth,
              boxSizing: "border-box",
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
          {loading ? (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          ) : (
            <Tree
              children={[]}
              data={data}
              onUpdate={handleUpdate}
              onNodeClick={handleClick}
            />
          )}
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
        </Main>
        <Drawer
          sx={{
            width: defaultDrawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: defaultDrawerWidth,
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

          <Sidebar
            selectedPageName={selectedTab.split(".")[1]}
            userId={user.user.id}
            instantTreeData={data}
          />
        </Drawer>
      </Box>
    </FlowProvider>
  );
}

export default Home;

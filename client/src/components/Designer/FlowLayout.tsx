import { useState, useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  addEdge,
  Node,
  Edge,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  updateEdge,
  Background,
  ReactFlowProvider,
  useReactFlow,
  useKeyPress,
} from "reactflow";
import "reactflow/dist/style.css";
import "../Home/style.css";
import { useEdgeNames } from "../../store/flow-context";
import CustomNode from "./CustomNode";
import { callApi } from "../../utils/callApi";
import CircularProgress from "@mui/material/CircularProgress";

// const nodeTypes = {
//   shape: ShapeNode,
// };
const nodeTypes = { customNode: CustomNode };

interface FileState {
  [key: string]: object;
}

interface FlowProps {
  fileName: string;
  userId: any;
}

let id = Math.random();
const getId = () => `dndnode_${id++}`;

const keyMap = {
  SAVE_LAYOUT: "del",
};

const FlowLayout = (props: FlowProps) => {
  const spacePressed = useKeyPress(["Control+s", "Command+s"]);
  const { edgeName, isDownloadActive, setdownloadClicked } = useEdgeNames();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();
  const { reactFlowInstance, setReactFlowInstance } = useEdgeNames();
  const { nodeName, setNodeName } = useEdgeNames();
  const [fileState, setFileState] = useState<FileState>({});
  const [selectedNodeState, setSelectedNodeState] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const updateFileState = (key: string, value: object) => {
    setFileState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onEdgeUpdate = useCallback(
    (oldEdge: any, newConnection: any) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  useEffect(() => {
    console.log("spacePressed");
    if (spacePressed) {
      onSave();
    }
  }, [spacePressed]);

  // const onEdgeUpdateEnd = useCallback(() => {
  //   console.log("fileName", fileName);
  //   const flow = reactFlowInstance.toObject();
  //   updateFileState(fileName, flow);
  // }, [fileState]);

  const onRestore = useCallback(() => {
    //TODO: Get flow layout here
    const restoreFlow = async () => {
      // console.log("userId", props.userId);
      // console.log("fileName", props.fileName);
      setLoading(true);
      callApi(
        `/api/sessions/getFlowDataByUserId?flowFileName=${props.fileName}&userId=${props.userId}`,
        "GET"
      )
        .then((data) => {
          console.log("flowData data", data);
          if (data.length === 0) {
            setLoading(false);
          }
          let flowData = JSON.parse(data[0].flowFileData);
          console.log("flowData", flowData);
          const { x = 0, y = 0, zoom = 1 } = flowData.viewport;
          setNodes(flowData.nodes || []);
          setEdges(flowData.edges || []);
          setViewport({ x, y, zoom });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tree data:", error);
        });
    };

    restoreFlow();
  }, [setEdges, setNodes]);

  useEffect(() => {
    // Update the document title using the browser API
    onRestore();
  }, [props.fileName, props.userId]);

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds: any) =>
        addEdge(
          {
            ...params,
            type: "floating",
            markerStart: { type: MarkerType.ArrowClosed },
            label: edgeName,
            deletable: true,
          },
          eds
        )
      ),
    [edgeName, setEdges]
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      console.log("ondrop", reactFlowInstance.toObject());

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");
      console.log("event", JSON.parse(type));
      console.log("type", JSON.parse(type).name);
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        console.log("invalid");
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const nodeTypeName = JSON.parse(type).name;
      let colorCode = colorizedNodes(nodeTypeName);
      const newNode = {
        id: getId(),
        type: "customNode",
        position,
        data: {
          label: `${nodeTypeName} node`,
          name: `${nodeTypeName}`,
          colorCode: colorCode,
        },

        // type: "shape",
        // position,
        // data: {
        //   shape: JSON.parse(type).name,
        //   width: 70,
        //   height: 70,
        //   label: JSON.parse(type).name + "asdas",
        //   color: "#6ede87",
        // },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  function colorizedNodes(nodeTypeName: string) {
    switch (nodeTypeName) {
      case "agent":
        return "#33B2FF";
      case "capability":
        return "#33FFCE";
      case "envrionment":
        return "#FFD433";
      case "event":
        return "#FFAC33";
      case "operation":
        return "#AA8FC0";
      case "belief":
        return "#FF6433";
      case "plan":
        return "#C08FAE";
      case "subCapability":
        return "#C8C4C6";
      case "relation":
        return "#E1EBE7";
      case "message":
        return "#55BBFD";
      case "environment":
        return "#3D47F0";
      case "action":
        return "#FF6433";
    }
  }
  const onSave = useCallback(() => {
    // let createFlowDataUrl = "http://localhost:8000/api/sessions/createFlowData";
    if (reactFlowInstance) {
      let flowInstanceData = JSON.stringify(reactFlowInstance.toObject());
      console.log("flow instance", flowInstanceData);
      setLoading(true);
      callApi("/api/sessions/createFlowData", "POST", {
        flowFileData: flowInstanceData,
        flowFileName: props.fileName,
        userId: props.userId,
      }).then((data) => {
        setLoading(false);
        // alert("file saved");
      });
    }

    localStorage.setItem(
      props.fileName,
      JSON.stringify(reactFlowInstance.toObject())
    );
  }, [reactFlowInstance, props.fileName]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNodeState) {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }
        return node;
      })
    );
  }, [selectedNodeState, nodeName]);

  const onNodeClick = useCallback((event: any, element: Node | Edge) => {
    setSelectedNodeState(element.id);
    setNodeName(element.data.label);

    console.log("clicked", element);
  }, []);
  const onNodeDoubleClick = useCallback((event: any, element: Node | Edge) => {
    // Set the clicked element in local state
    console.log("double");
  }, []);

  const handlers = {
    SAVE_LAYOUT: () => console.log("saved"),
  };

  return (
    <ReactFlowProvider>
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
        <ReactFlow
          ref={reactFlowWrapper}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodeClick={onNodeClick}
          onInit={setReactFlowInstance}
          fitView
          onEdgeUpdate={onEdgeUpdate}
          onDrop={onDrop}
          onDragOver={onDragOver}
          snapToGrid={true}
          nodeTypes={nodeTypes}
          // defaultEdgeOptions={defaultEdgeOptions}
        >
          <div className="save__controls">
            <button onClick={onSave}>save</button>
            {/* <button onClick={onRestore}>restore</button> */}
          </div>

          <Controls />
          <Background color="#99b3ec" />
        </ReactFlow>
      )}
    </ReactFlowProvider>
  );
};

function FlowWithProvider(props: any) {
  return (
    <ReactFlowProvider>
      <FlowLayout {...props} />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;

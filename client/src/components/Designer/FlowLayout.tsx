import { useState, useCallback, useRef, useEffect } from "react";

import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  updateEdge,
  Viewport,
  Background,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "../Home/style.css";
import CustomEdge from "./CustomEdge";
import { useEdgeNames } from "../../store/flow-context";

const initialNodes = [
  {
    id: "edges-1",
    type: "input",
    data: { label: "Input 1" },
    position: { x: 250, y: 0 },
  },
  { id: "edges-2", data: { label: "Node 2" }, position: { x: 150, y: 100 } },
];
const initialEdges = [
  {
    id: "edges-e1-2",
    source: "edges-1",
    target: "edges-2",
    label: "bezier edge (default)",
    className: "normal-edge",
  },
];

interface FileState {
  [key: string]: object;
}

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowLayout = ({ fileName }: { fileName: any }) => {
  const { edgeName, isDownloadActive, setdownloadClicked } = useEdgeNames();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { setViewport } = useReactFlow();
  const { reactFlowInstance, setReactFlowInstance } = useEdgeNames();
  const { nodeName, setNodeName } = useEdgeNames();
  const [fileState, setFileState] = useState<FileState>({});
  const [selectedNodeState, setSelectedNodeState] = useState<string>("");
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

  const onEdgeUpdateEnd = useCallback(() => {
    console.log("fileName", fileName);
    const flow = reactFlowInstance.toObject();
    updateFileState(fileName, flow);
  }, [fileState]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem("Blue Box 3"));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setEdges, setNodes]);

  useEffect(() => {
    // Update the document title using the browser API

    onRestore();
    // console.log("reactFlowInstance", reactFlowInstance);
    // if (reactFlowInstance) {
    //   console.log("fileName", fileName);
    //   // const flow = reactFlowInstance.toObject();
    //   // updateFileState(fileName, flow);
    //   // localStorage.setItem(fileName, JSON.stringify(flow));
    //   // setdownloadClicked(false);
    // }
  }, [isDownloadActive, reactFlowInstance, fileName, onRestore]);

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
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${JSON.parse(type).name} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      localStorage.setItem(
        fileName,
        JSON.stringify(reactFlowInstance.toObject())
      );
      alert("file saved");
      // console.log(
      //   "reactFlowInstance created:",
      //   JSON.stringify(reactFlowInstance.toObject())
      // );
    }
  }, [reactFlowInstance, fileName]);

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

  return (
    <ReactFlowProvider>
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
      >
        <div className="save__controls">
          <button onClick={onSave}>save</button>
        </div>
        <Controls />
        <Background color="#99b3ec" />
      </ReactFlow>
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

// function setViewport(arg0: { x: any; y: any; zoom: any }) {
//   throw new Error("Function not implemented.");
// }

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
} from "reactflow";
import "reactflow/dist/style.css";
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

let id = 0;
const getId = () => `dndnode_${id++}`;

const FlowLayout: React.FC = (props) => {
  const { edgeName, isDownloadActive, setdownloadClicked } = useEdgeNames();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { reactFlowInstance, setReactFlowInstance } = useEdgeNames();

  const onEdgeUpdate = useCallback(
    (oldEdge: any, newConnection: any) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );

  useEffect(() => {
    // Update the document title using the browser API
    console.log("reactFlowInstance", reactFlowInstance);
    if (reactFlowInstance) {
      console.log("reactFlow");
      const flow = reactFlowInstance.toObject();
      localStorage.setItem("flowKey", JSON.stringify(flow));
      // setdownloadClicked(false);
    }
  }, [isDownloadActive, reactFlowInstance]);

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
      console.log("ondrop", reactFlowInstance);

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
  return (
    <ReactFlow
      ref={reactFlowWrapper}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={setReactFlowInstance}
      fitView
      onEdgeUpdate={onEdgeUpdate}
      onDrop={onDrop}
      onDragOver={onDragOver}
      snapToGrid={true}
    >
      <Controls />
      <Background color="#99b3ec" />
    </ReactFlow>
  );
};

export default FlowLayout;

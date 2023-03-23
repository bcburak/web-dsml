import React, { useContext } from "react";

export enum EdgeName {
  Implements = "Implements",
  InteractsWith = "InteractsWith",
  SubCapability = "SubCapability",
}

// const [nodeName, setNodeName] = useState("Node 1");

type FlowContextType = {
  edgeName: EdgeName;
  setEdgeName: (EdgeName: EdgeName) => void;
  isDownloadActive: boolean;
  setdownloadClicked: (isDownloadActive: boolean) => void;
  reactFlowInstance: any;
  setReactFlowInstance: (reactFlowInstance: any) => void;
  nodeName: any;
  setNodeName: (reactFlowInstance: any) => void;
  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;
  // setNodeName :(nodeName:any) => void;
};

const FlowContext = React.createContext<FlowContextType | null>({
  edgeName: EdgeName.Implements,
  setEdgeName: (edgeName) => console.warn("no theme provider"),
  isDownloadActive: false,
  setdownloadClicked: (isDownloadActive: boolean) =>
    console.warn("no theme provider"),
  reactFlowInstance: null,
  setReactFlowInstance: () => console.log("setReactFlowInstance"),
  nodeName: null,
  setNodeName: () => console.log("setReactFlowInstance"),
  tabIndex: 0,
  setTabIndex: () => console.log("tabIndex from context"),
});
export { FlowContext };
export const useEdgeNames = () => useContext(FlowContext);

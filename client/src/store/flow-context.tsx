import React, { useContext } from "react";

export enum EdgeName {
  Implements = "Implements",
  InteractsWith = "InteractsWith",
  SubCapability = "SubCapability",
}

type FlowContextType = {
  edgeName: EdgeName;
  setEdgeName: (EdgeName: EdgeName) => void;
  isDownloadActive: boolean;
  setdownloadClicked: (isDownloadActive: boolean) => void;
  reactFlowInstance: any;
  setReactFlowInstance: (reactFlowInstance: any) => void;
};

const FlowContext = React.createContext<FlowContextType | null>({
  edgeName: EdgeName.Implements,
  setEdgeName: (edgeName) => console.warn("no theme provider"),
  isDownloadActive: false,
  setdownloadClicked: (isDownloadActive: boolean) =>
    console.warn("no theme provider"),
  reactFlowInstance: null,
  setReactFlowInstance: () => console.log("setReactFlowInstance"),
});
export { FlowContext };
export const useEdgeNames = () => useContext(FlowContext);

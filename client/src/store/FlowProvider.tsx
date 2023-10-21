import React from "react";
import { EdgeName, FlowContext } from "./flow-context";

const FlowProvider = (props: any) => {
  const [edgeName, setEdgeName] = React.useState(EdgeName.Implements);
  const [isDownloadActive, setdownloadClicked] = React.useState(false);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
  const [nodeName, setNodeName] = React.useState(null);
  const [nodeSubtitle, setNodeSubtitle] = React.useState(null);

  const flwContext = {
    edgeName: edgeName,
    setEdgeName: setEdgeName,
    isDownloadActive: isDownloadActive,
    setdownloadClicked: setdownloadClicked,
    reactFlowInstance: reactFlowInstance,
    setReactFlowInstance: setReactFlowInstance,
    nodeName: nodeName,
    nodeSubtitle: nodeSubtitle,
    setNodeName: setNodeName,
    setNodeSubtitle: setNodeSubtitle,
  };

  return (
    <FlowContext.Provider value={flwContext}>
      {props.children}
    </FlowContext.Provider>
  );
};

export default FlowProvider;

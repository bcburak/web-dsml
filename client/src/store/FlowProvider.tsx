import React from "react";
import { EdgeName, FlowContext } from "./flow-context";

const FlowProvider = (props: any) => {
  const [edgeName, setEdgeName] = React.useState(EdgeName.Implements);
  const [isDownloadActive, setdownloadClicked] = React.useState(false);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
  const [nodeName, setNodeName] = React.useState(null);
  const [tabIndex, setTabIndex] = React.useState(0);

  const flwContext = {
    edgeName: edgeName,
    setEdgeName: setEdgeName,
    isDownloadActive: isDownloadActive,
    setdownloadClicked: setdownloadClicked,
    reactFlowInstance: reactFlowInstance,
    setReactFlowInstance: setReactFlowInstance,
    nodeName: nodeName,
    setNodeName: setNodeName,
    tabIndex: tabIndex,
    setTabIndex: setTabIndex,
  };

  return (
    <FlowContext.Provider value={flwContext}>
      {props.children}
    </FlowContext.Provider>
  );
};

export default FlowProvider;

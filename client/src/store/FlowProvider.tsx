import React from "react";
import { EdgeName, FlowContext } from "./flow-context";

const FlowProvider = (props: any) => {
  const [edgeName, setEdgeName] = React.useState(EdgeName.Implements);
  const [isDownloadActive, setdownloadClicked] = React.useState(false);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);

  const flwContext = {
    edgeName: edgeName,
    setEdgeName: setEdgeName,
    isDownloadActive: isDownloadActive,
    setdownloadClicked: setdownloadClicked,
    reactFlowInstance: reactFlowInstance,
    setReactFlowInstance: setReactFlowInstance,
  };

  return (
    <FlowContext.Provider value={flwContext}>
      {props.children}
    </FlowContext.Provider>
  );
};

export default FlowProvider;

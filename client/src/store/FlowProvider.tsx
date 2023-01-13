import React, { Dispatch, SetStateAction } from "react";
import { useReducer } from "react";
import { EdgeName, FlowContext } from "./flow-context";

const FlowProvider = (props: any) => {
  const [edgeName, setEdgeName] = React.useState(EdgeName.Implements);
  const [isDownloadActive, setdownloadClicked] = React.useState(false);

  const flwContext = {
    edgeName: edgeName,
    setEdgeName: setEdgeName,
    isDownloadActive: isDownloadActive,
    setdownloadClicked: setdownloadClicked,
  };

  return (
    <FlowContext.Provider value={flwContext}>
      {props.children}
    </FlowContext.Provider>
  );
};

export default FlowProvider;

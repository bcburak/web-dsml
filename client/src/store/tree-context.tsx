import React from "react";

type TreeContextType = {
  dispatch: any;
  state: any;
  isImparative: boolean;
  // activeTabIndex: any;
  onNodeClick: (node: any) => void;
};

const TreeContext = React.createContext<TreeContextType | null>({
  dispatch: null,
  state: null,
  isImparative: null,
  // activeTabIndex: 0,
  onNodeClick: (node: any) => {},
});

const useTreeContext = () => React.useContext(TreeContext);

export { TreeContext, useTreeContext };

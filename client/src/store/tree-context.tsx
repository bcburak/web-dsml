import React from "react";

type TreeContextType = {
  dispatch: any;
  state: any;
  isImparative: boolean;
  onNodeClick: (node: any) => void;
};

const TreeContext = React.createContext<TreeContextType | null>({
  dispatch: null,
  state: null,
  isImparative: null,
  onNodeClick: (node: any) => {},
});

const useTreeContext = () => React.useContext(TreeContext);

export { TreeContext, useTreeContext };

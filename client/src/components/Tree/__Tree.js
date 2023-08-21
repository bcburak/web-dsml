import React, { useReducer, useLayoutEffect } from "react";
import { v4 } from "uuid";
import { ThemeProvider } from "styled-components";

import { useDidMountEffect } from "../../utils/utils.js"
import { reducer, TreeContext } from "./state/index.js";
// import { TreeContext } from "../../store/tree-context";

import { StyledTree } from "./Tree.style.js";
import { Folder } from "./Folder/TreeFolder.js";
import { File } from "./File/TreeFile.js";

const Tree = ({ children, data, onNodeClick, onUpdate }) => {
  const [state, dispatch] = useReducer(reducer, data);

  useLayoutEffect(() => {
    dispatch({ type: "SET_DATA", payload: data });
  }, [data]);

  useDidMountEffect(() => {
    onUpdate && onUpdate(state);
  }, [state]);

  // eslint-disable-next-line no-undef
  const isImparative = true;//data && !children;

  const treeContext = {
    isImparative,
    state,
    dispatch,
    onNodeClick: (node) => {
      onNodeClick && onNodeClick(node);
    },
  };

  return (
    <ThemeProvider theme={{ indent: 20 }}>
      <TreeContext.Provider
        value={treeContext}
      >
        <StyledTree>
          {isImparative ? (
            <TreeRecusive data={state} parentNode={state} />
          ) : (
            children
          )}
        </StyledTree>
      </TreeContext.Provider>
    </ThemeProvider>
  );
};

const TreeRecusive = ({ data, parentNode }) => {
  return data.map((item) => {
    item.parentNode = parentNode;
    if (!parentNode) {
      item.parentNode = data;
    }
    if (!item.id) item.id = v4();

    if (item.type === "file") {
      return <File key={item.id} id={item.id} name={item.name} node={item} />;
    }
    if (item.type === "folder") {
      return (
        <Folder key={item.id} id={item.id} name={item.name} node={item}>
          <TreeRecusive parentNode={item} data={item.files} />
        </Folder>
      );
    }
  });
};

Tree.File = File;
Tree.Folder = Folder;

export default Tree;

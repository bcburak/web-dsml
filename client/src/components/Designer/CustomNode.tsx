import { createElement, useCallback } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import * as MUIcon from "@mui/icons-material";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }: NodeProps) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  // if (data?.icon === "undefined") {
  //   data.icon = "AccessibilityNew";
  // }

  let icons: keyof typeof MUIcon = data?.icon;
  if (icons === undefined) {
    icons = "AccessibilityNew";
  }

  const Icon = MUIcon[icons];

  console.log("background", data.colorCode);
  console.log("dataicon", data.icon);
  return (
    <>
      {/* <NodeResizer minWidth={100} minHeight={30} /> */}
      <div className="custom-node" style={{ background: data?.colorCode }}>
        {" "}
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
        <div className="left-content">
          <div className="icon">{<Icon />}</div>
          {/* <div className="icon">{data?.icon !== "undefined" || <Icon />}</div> */}
          <div className="subtitle">{data?.subtitle}</div>
        </div>
        <div className="title">{data?.label}</div>
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          style={handleStyle}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id="b"
          isConnectable={isConnectable}
        />
      </div>
    </>
    // <div className="text-updater-node" style={{ background: data?.colorCode }}>
    //   <Handle
    //     type="target"
    //     position={Position.Top}
    //     isConnectable={isConnectable}
    //   />
    //   <div className="body">
    //     <div className="icon">{data?.icon}</div>
    //     <div>
    //       <div className="title">{data?.name}</div>
    //       <div className="subline">asdasd</div>
    //     </div>
    //   </div>
    //   {/* <div>
    //     <label htmlFor="text">{data?.name}</label>
    //   </div> */}
    //   <Handle
    //     type="source"
    //     position={Position.Bottom}
    //     id="a"
    //     style={handleStyle}
    //     isConnectable={isConnectable}
    //   />
    //   <Handle
    //     type="source"
    //     position={Position.Bottom}
    //     id="b"
    //     isConnectable={isConnectable}
    //   />
    //   <div>{data?.label}</div>
    // </div>
  );
}

export default TextUpdaterNode;

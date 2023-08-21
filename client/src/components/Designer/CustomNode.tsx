import { useCallback } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }: NodeProps) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);
  console.log("background", data.colorCode);
  return (
    <div className="text-updater-node" style={{ background: data?.colorCode }}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">{data?.name}</label>
      </div>
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
      <div>{data?.label}</div>
    </div>
  );
}

export default TextUpdaterNode;

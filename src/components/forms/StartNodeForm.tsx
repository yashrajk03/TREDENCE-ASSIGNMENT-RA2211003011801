import { useState } from "react";
import { useWorkflowStore } from "../../hooks/useWorkflowStore";
import type { Node } from "reactflow";

interface Props {
  node: Node;
}

export default function StartNodeForm({ node }: Props) {
  const { nodes, setSelectedNode } = useWorkflowStore();

  const [title, setTitle] = useState(node.data.title || "Start");
  const [metadata, setMetadata] = useState(
    node.data.metadata || [{ key: "", value: "" }]
  );

  const updateNodeData = (updatedData: any) => {
    const newNodes = nodes.map((n) =>
      n.id === node.id ? { ...n, data: { ...n.data, ...updatedData } } : n
    );
    useWorkflowStore.setState({ nodes: newNodes });
    setSelectedNode({ ...node, data: { ...node.data, ...updatedData } });
  };

  const updateMetadataField = (index: number, field: string, value: string) => {
    const updated = [...metadata];
    updated[index][field] = value;
    setMetadata(updated);
    updateNodeData({ metadata: updated });
  };

  const addMetadata = () => {
    const updated = [...metadata, { key: "", value: "" }];
    setMetadata(updated);
    updateNodeData({ metadata: updated });
  };

  const removeMetadata = (index: number) => {
    const updated = metadata.filter((_, i) => i !== index);
    setMetadata(updated);
    updateNodeData({ metadata: updated });
  };

  return (
    <div className="space-y-6">

      {/* Title Section */}
      <div>
        <h3 className="text-md font-semibold mb-2">Start Node Title</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateNodeData({ title: e.target.value, label: e.target.value });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:border-blue-400 focus:outline-none"
          placeholder="Enter start node title"
        />
      </div>

      {/* Metadata Section */}
      <div>
        <h3 className="text-md font-semibold mb-2">Metadata</h3>

        <div className="space-y-3">
          {metadata.map((meta, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-700 rounded-md border border-slate-600"
            >
              <div className="flex gap-2">
                <input
                  placeholder="Key"
                  value={meta.key}
                  onChange={(e) =>
                    updateMetadataField(idx, "key", e.target.value)
                  }
                  className="w-1/2 p-2 rounded bg-slate-800 border border-slate-600 focus:border-blue-400 focus:outline-none"
                />
                <input
                  placeholder="Value"
                  value={meta.value}
                  onChange={(e) =>
                    updateMetadataField(idx, "value", e.target.value)
                  }
                  className="w-1/2 p-2 rounded bg-slate-800 border border-slate-600 focus:border-blue-400 focus:outline-none"
                />
              </div>

              <button
                onClick={() => removeMetadata(idx)}
                className="mt-2 px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addMetadata}
          className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          + Add Metadata
        </button>
      </div>

    </div>
  );
}

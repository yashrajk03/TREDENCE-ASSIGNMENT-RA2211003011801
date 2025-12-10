import { useState } from "react";
import type { Node } from "reactflow";
import { useWorkflowStore } from "../../hooks/useWorkflowStore";

interface Props {
  node: Node;
}

export default function EndNodeForm({ node }: Props) {
  const { nodes, setSelectedNode } = useWorkflowStore();

  const [message, setMessage] = useState(node.data.message || "Workflow Completed");
  const [summary, setSummary] = useState(node.data.summary || false);

  const updateNodeData = (updated: any) => {
    const updatedNodes = nodes.map((n) =>
      n.id === node.id ? { ...n, data: { ...n.data, ...updated } } : n
    );
    useWorkflowStore.setState({ nodes: updatedNodes });

    setSelectedNode({
      ...node,
      data: { ...node.data, ...updated },
    });
  };

  return (
    <div className="space-y-6">

      {/* End Message */}
      <div>
        <h3 className="text-md font-semibold mb-2">End Message</h3>
        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            updateNodeData({ message: e.target.value });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Summary Flag */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={summary}
          onChange={(e) => {
            setSummary(e.target.checked);
            updateNodeData({ summary: e.target.checked });
          }}
          className="w-5 h-5"
        />
        <span>Include workflow summary</span>
      </div>
    </div>
  );
}

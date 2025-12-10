import { useState } from "react";
import type { Node } from "reactflow";
import { useWorkflowStore } from "../../hooks/useWorkflowStore";

interface Props {
  node: Node;
}

export default function ApprovalNodeForm({ node }: Props) {
  const { nodes, setSelectedNode } = useWorkflowStore();

  const [title, setTitle] = useState(node.data.title || "Approval");
  const [role, setRole] = useState(node.data.role || "Manager");
  const [threshold, setThreshold] = useState(node.data.threshold || 0);

  const updateNodeData = (updatedData: any) => {
    const newNodes = nodes.map((n) =>
      n.id === node.id ? { ...n, data: { ...n.data, ...updatedData } } : n
    );
    useWorkflowStore.setState({ nodes: newNodes });

    setSelectedNode({
      ...node,
      data: { ...node.data, ...updatedData },
    });
  };

  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <h3 className="text-md font-semibold mb-2">Approval Step Title</h3>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateNodeData({ title: e.target.value, label: e.target.value });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                     focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Approver Role */}
      <div>
        <h3 className="text-md font-semibold mb-2">Approver Role</h3>
        <select
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
            updateNodeData({ role: e.target.value });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                     focus:outline-none focus:border-blue-400"
        >
          <option>Manager</option>
          <option>HRBP</option>
          <option>Director</option>
          <option>HR Admin</option>
        </select>
      </div>

      {/* Auto Approve Threshold */}
      <div>
        <h3 className="text-md font-semibold mb-2">Auto-Approve Threshold</h3>
        <input
          type="number"
          value={threshold}
          onChange={(e) => {
            const v = Number(e.target.value);
            setThreshold(v);
            updateNodeData({ threshold: v });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                     focus:outline-none focus:border-blue-400"
        />
      </div>

    </div>
  );
}

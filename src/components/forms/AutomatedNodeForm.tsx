import { useEffect, useState } from "react";
import type { Node } from "reactflow";
import { useWorkflowStore } from "../../hooks/useWorkflowStore";
import { mockAutomations } from "../../api/mockAutomations";

interface Props {
  node: Node;
}

export default function AutomatedNodeForm({ node }: Props) {
  const { nodes, setSelectedNode } = useWorkflowStore();

  const [title, setTitle] = useState(node.data.title || "Automation");
  const [actionId, setActionId] = useState(node.data.actionId || "");
  const [paramValues, setParamValues] = useState(node.data.paramValues || {});

  const selectedAction = mockAutomations.find((a) => a.id === actionId);

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

  useEffect(() => {
    if (selectedAction) {
      const defaults: any = {};
      selectedAction.params.forEach((p) => {
        defaults[p] = paramValues[p] || "";
      });
      setParamValues(defaults);
      updateNodeData({ paramValues: defaults });
    }
  }, [actionId]);

  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <h3 className="text-md font-semibold mb-2">Automation Title</h3>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateNodeData({ title: e.target.value, label: e.target.value });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Action Select */}
      <div>
        <h3 className="text-md font-semibold mb-2">Select Action</h3>
        <select
          value={actionId}
          onChange={(e) => {
            setActionId(e.target.value);
            updateNodeData({ actionId: e.target.value });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-400"
        >
          <option value="">Choose an action...</option>
          {mockAutomations.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </div>

      {/* Dynamic Params */}
      {selectedAction && (
        <div className="space-y-4">
          <h3 className="text-md font-semibold">Action Parameters</h3>

          {selectedAction.params.map((param) => (
            <div key={param}>
              <label className="text-sm opacity-80">{param}</label>
              <input
                value={paramValues[param] || ""}
                onChange={(e) => {
                  const updated = {
                    ...paramValues,
                    [param]: e.target.value,
                  };
                  setParamValues(updated);
                  updateNodeData({ paramValues: updated });
                }}
                className="w-full mt-1 p-2 rounded bg-slate-700 border border-slate-600 focus:outline-none focus:border-blue-400"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import type { Node } from "reactflow";
import { useWorkflowStore } from "../../hooks/useWorkflowStore";

interface Props {
  node: Node;
}

export default function TaskNodeForm({ node }: Props) {
  const { nodes, setSelectedNode } = useWorkflowStore();

  const [title, setTitle] = useState(node.data.title || "Task");
  const [description, setDescription] = useState(node.data.description || "");
  const [assignee, setAssignee] = useState(node.data.assignee || "");
  const [dueDate, setDueDate] = useState(node.data.dueDate || "");
  const [customFields, setCustomFields] = useState(
    node.data.customFields || [{ key: "", value: "" }]
  );

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

  const updateCustomField = (index: number, field: string, value: string) => {
    const updated = [...customFields];
    updated[index][field] = value;
    setCustomFields(updated);
    updateNodeData({ customFields: updated });
  };

  const addCustomField = () => {
    const updated = [...customFields, { key: "", value: "" }];
    setCustomFields(updated);
    updateNodeData({ customFields: updated });
  };

  const removeCustomField = (index: number) => {
    const updated = customFields.filter((_, i) => i !== index);
    setCustomFields(updated);
    updateNodeData({ customFields: updated });
  };

  return (
    <div className="space-y-6">

      {/* Title */}
      <div>
        <h3 className="text-md font-semibold mb-2">Task Title</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateNodeData({ title: e.target.value, label: e.target.value });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                     focus:outline-none focus:border-blue-400"
          placeholder="Enter task title"
        />
      </div>

      {/* Description */}
      <div>
        <h3 className="text-md font-semibold mb-2">Description</h3>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            updateNodeData({ description: e.target.value });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                     focus:outline-none focus:border-blue-400 h-24 resize-none"
          placeholder="Describe the task"
        />
      </div>

      {/* Assignee */}
      <div>
        <h3 className="text-md font-semibold mb-2">Assignee</h3>
        <input
          type="text"
          value={assignee}
          onChange={(e) => {
            setAssignee(e.target.value);
            updateNodeData({ assignee: e.target.value });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                     focus:outline-none focus:border-blue-400"
          placeholder="Enter assignee name"
        />
      </div>

      {/* Due Date */}
      <div>
        <h3 className="text-md font-semibold mb-2">Due Date</h3>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
            updateNodeData({ dueDate: e.target.value });
          }}
          className="w-full p-2 rounded bg-slate-700 border border-slate-600 
                     focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* Custom Fields Section */}
      <div>
        <h3 className="text-md font-semibold mb-2">Custom Fields</h3>

        <div className="space-y-3">
          {customFields.map((field, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-700 rounded-md border border-slate-600"
            >
              <div className="flex gap-2">
                <input
                  placeholder="Key"
                  value={field.key}
                  onChange={(e) =>
                    updateCustomField(idx, "key", e.target.value)
                  }
                  className="w-1/2 p-2 rounded bg-slate-800 border border-slate-600 
                             focus:outline-none focus:border-blue-400"
                />

                <input
                  placeholder="Value"
                  value={field.value}
                  onChange={(e) =>
                    updateCustomField(idx, "value", e.target.value)
                  }
                  className="w-1/2 p-2 rounded bg-slate-800 border border-slate-600 
                             focus:outline-none focus:border-blue-400"
                />
              </div>

              <button
                onClick={() => removeCustomField(idx)}
                className="mt-2 px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add Field Button */}
        <button
          onClick={addCustomField}
          className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          + Add Custom Field
        </button>
      </div>

    </div>
  );
}

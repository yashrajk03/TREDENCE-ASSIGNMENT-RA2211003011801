import { useWorkflowStore } from "../../hooks/useWorkflowStore";

export default function StartNode({ data, id }) {
  const { activeNodeId } = useWorkflowStore();
  const isActive = activeNodeId === id;

  return (
    <div
      className={`p-3 rounded-md shadow text-white bg-green-600 
      transition-all duration-300
      ${isActive ? "ring-4 ring-yellow-300 scale-105" : ""}`}
    >
      <strong>{data.title || "Start"}</strong>
      <div className="text-sm opacity-80">{data.label}</div>
    </div>
  );
}

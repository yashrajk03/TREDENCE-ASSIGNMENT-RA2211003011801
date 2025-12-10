import { useWorkflowStore } from "../../hooks/useWorkflowStore";
import StartNodeForm from "./StartNodeForm";
import TaskNodeForm from "./TaskNodeForm";
import ApprovalNodeForm from "./ApprovalNodeForm";
import AutomatedNodeForm from "./AutomatedNodeForm";
import EndNodeForm from "./EndNodeForm";

export default function NodeFormContainer() {
  const { selectedNode } = useWorkflowStore();

  if (!selectedNode) {
    return <p className="text-slate-400">Select a node to edit its configuration.</p>;
  }

  switch (selectedNode.type) {
    case "start":
      return <StartNodeForm node={selectedNode} />;
    case "task":
      return <TaskNodeForm node={selectedNode} />;
    case "approval":
      return <ApprovalNodeForm node={selectedNode} />;
    case "automated":
      return <AutomatedNodeForm node={selectedNode} />;
    case "end":
      return <EndNodeForm node={selectedNode} />;
    default:
      return <p>Unsupported node type.</p>;
  }
}

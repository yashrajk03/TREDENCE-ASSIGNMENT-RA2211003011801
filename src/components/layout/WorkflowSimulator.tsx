import { useWorkflowStore } from "../../hooks/useWorkflowStore";
import { useState } from "react";

export default function WorkflowSimulator() {
  const {
    simulatorOpen,
    setSimulatorOpen,
    nodes,
    edges,
    setActiveNodeId,
  } = useWorkflowStore();

  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Validation Before Simulation
  const validateWorkflow = () => {
    const startNodes = nodes.filter((n) => n.type === "start");
    const endNodes = nodes.filter((n) => n.type === "end");

    if (startNodes.length === 0) return "❌ No Start Node found.";
    if (startNodes.length > 1) return "❌ Multiple Start Nodes detected.";
    if (endNodes.length === 0) return "❌ No End Node found.";

    // Check for unconnected nodes
    const connected = new Set<string>();
    edges.forEach((e) => {
      connected.add(e.source);
      connected.add(e.target);
    });

    const orphan = nodes.find((n) => !connected.has(n.id));
    if (orphan) return `❌ Node "${orphan.data.label || orphan.id}" is not connected.`;

    return null;
  };

  const getNextNodes = (nodeId: string) => {
    const outgoing = edges.filter((e) => e.source === nodeId);
    return outgoing.map((e) => nodes.find((n) => n.id === e.target));
  };

  const runSimulation = async () => {
    setLoading(true);
    setLogs([]);

    const error = validateWorkflow();
    if (error) {
      setLogs([error]);
      setLoading(false);
      return;
    }

    const newLogs: string[] = [];

    const startNode = nodes.find((n) => n.type === "start");
    if (!startNode) return;

    newLogs.push(`▶ Starting workflow at: ${startNode.data.title || "Start"}`);

    const visited = new Set<string>();
    const queue = [startNode];

    while (queue.length > 0) {
      const current = queue.shift();
      if (!current || visited.has(current.id)) continue;

      visited.add(current.id);

      // Highlight active node
      setActiveNodeId(current.id);
      await new Promise((r) => setTimeout(r, 300));

      switch (current.type) {
        case "start":
          newLogs.push(`🟢 Start → ${current.data.title || "Start"}`);
          break;
        case "task":
          newLogs.push(
            `📌 Task → ${current.data.title || "Task"} | Assignee: ${
              current.data.assignee || "Unknown"
            }`
          );
          break;
        case "approval":
          newLogs.push(
            `📝 Approval → ${current.data.title || "Approval"} | Role: ${
              current.data.role || "Manager"
            }`
          );
          break;
        case "automated":
          newLogs.push(
            `⚙ Automation → Action: ${current.data.actionId || "None"}`
          );
          break;
        case "end":
          newLogs.push(
            `🏁 End → ${current.data.message || "Workflow Complete"}`
          );
          break;
      }

      const next = getNextNodes(current.id);
      next.forEach((n) => {
        if (n && !visited.has(n.id)) queue.push(n);
      });
    }

    newLogs.push("✔ Workflow Simulation Complete");

    setActiveNodeId(null);
    setLogs(newLogs);
    setLoading(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-slate-800 text-white shadow-xl 
      border-l border-slate-700 transform transition-transform duration-300 z-50
      ${simulatorOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="p-4 flex justify-between items-center border-b border-slate-700">
        <h2 className="text-xl font-semibold">Workflow Simulator</h2>
        <button
          onClick={() => setSimulatorOpen(false)}
          className="text-slate-300 hover:text-white text-xl"
        >
          ✕
        </button>
      </div>

      <div className="p-4 overflow-auto h-[calc(100%-60px)]">
        <button
          onClick={runSimulation}
          disabled={loading}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md"
        >
          {loading ? "Running..." : "Run Simulation"}
        </button>

        <div className="mt-6 space-y-3">
          {logs.map((log, i) => (
            <div
              key={i}
              className="p-3 bg-slate-700 rounded border border-slate-600"
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

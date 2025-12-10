export default function Sidebar() {
  const nodes = [
    { type: "start", label: "Start Node" },
    { type: "task", label: "Task Node" },
    { type: "approval", label: "Approval Node" },
    { type: "automated", label: "Automated Step" },
    { type: "end", label: "End Node" },
  ];

  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 bg-slate-800 text-white p-4 border-r border-slate-700">
      <h2 className="font-semibold text-lg mb-4">Nodes</h2>

      <div className="space-y-3">
        {nodes.map((n) => (
          <div
            key={n.type}
            draggable
            onDragStart={(e) => onDragStart(e, n.type)}
            className="cursor-pointer p-3 bg-slate-700 rounded shadow hover:bg-slate-600 transition"
          >
            {n.label}
          </div>
        ))}
      </div>
    </div>
  );
}

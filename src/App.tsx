import Sidebar from "./components/layout/Sidebar";
import WorkflowCanvas from "./components/layout/WorkflowCanvas";
import NodeConfigPanel from "./components/layout/NodeConfigPanel";
import WorkflowSimulator from "./components/layout/WorkflowSimulator";

function App() {
  return (
    <div className="flex min-h-screen bg-slate-900 text-white">
      <Sidebar />
      <WorkflowCanvas />
      <NodeConfigPanel />
      <WorkflowSimulator />   {/* ADDED */}
    </div>
  );
}

export default App;

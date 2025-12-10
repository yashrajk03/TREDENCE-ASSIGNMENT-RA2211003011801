import NodeFormContainer from "../forms/NodeFormContainer";

export default function NodeConfigPanel() {
  return (
    <div className="w-80 bg-slate-800 text-white p-4 border-l border-slate-700 overflow-auto">
      <h2 className="font-semibold text-lg mb-4">Node Config</h2>
      <NodeFormContainer />
    </div>
  );
}

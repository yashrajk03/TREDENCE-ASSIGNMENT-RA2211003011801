import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  type Connection,
} from "reactflow";

import "reactflow/dist/style.css";

import { nodeTypes } from "../nodes";
import { useWorkflowStore } from "../../hooks/useWorkflowStore";

export default function WorkflowCanvas() {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addNode,
    setSelectedNode,
    setSimulatorOpen,
  } = useWorkflowStore();

  const onConnect = useCallback(
    (connection: Connection) => {
      useWorkflowStore.setState({
        edges: addEdge(connection, edges),
      });
    },
    [edges]
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const bounds = event.target.getBoundingClientRect();

      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      addNode({
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: `${type} node` },
      });
    },
    [addNode]
  );

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  return (
    <div className="flex-1 bg-slate-900 relative">
      
      {/* Test Workflow Button */}
      <div className="absolute right-6 top-6 z-50">
        <button
          onClick={() => setSimulatorOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 
                     text-white rounded-lg shadow-md"
        >
          Test Workflow
        </button>
      </div>

      {/* ReactFlow Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(e, node) => setSelectedNode(node)}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

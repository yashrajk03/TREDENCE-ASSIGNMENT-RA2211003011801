import { create } from "zustand";
import {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
} from "reactflow";

interface WorkflowStore {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;

  simulatorOpen: boolean;
  setSimulatorOpen: (v: boolean) => void;

  activeNodeId: string | null;
  setActiveNodeId: (id: string | null) => void;

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;

  addNode: (node: Node) => void;
  setSelectedNode: (node: Node | null) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,

  simulatorOpen: false,
  setSimulatorOpen: (v) => set({ simulatorOpen: v }),

  activeNodeId: null,
  setActiveNodeId: (id) => set({ activeNodeId: id }),

  onNodesChange: (changes) =>
    set({ nodes: applyNodeChanges(changes, get().nodes) }),

  onEdgesChange: (changes) =>
    set({ edges: applyEdgeChanges(changes, get().edges) }),

  addNode: (node) => set({ nodes: [...get().nodes, node] }),

  setSelectedNode: (node) => set({ selectedNode: node }),
}));

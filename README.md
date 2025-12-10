🚀 Workflow Builder (Tredence Internship Assignment)

A React + TypeScript + Tailwind + React Flow based Workflow Builder, built as part of the Tredence Frontend Internship Assignment.
This project allows users to design HR workflows visually, configure each step, and test the workflow using a built-in simulation engine — closely mirroring real SaaS workflow tools (Zapier, n8n, UiPath).

✨ Features
🧱 1. Drag-and-Drop Workflow Builder

Drag nodes from sidebar

Drop onto canvas

Move nodes freely

Create connections visually

Built with React Flow v12

🗂️ 2. Five Fully Functional Node Types

Start Node

Task Node

Approval Node

Automated Action Node

End Node

Each node has a dedicated config panel with polished UI.

⚙️ 3. Polished Node Configuration Forms

Every node type includes editable fields such as:

Title

Description

Assignee

Due Date

Metadata key–value pairs

Approval role & threshold

Automated step actions & params

End message

🧠 4. Zustand-Powered State Management

A clean, global, reactive store:

Nodes

Edges

Selected node

Simulator state

Active node highlight

🧪 5. Workflow Simulation Engine

A beautifully designed, slide-in simulator panel:

Runs workflow in BFS connection order

Highlights active node on canvas

Shows step-by-step execution logs

Basic validation:

Start node required

End node required

No multiple start nodes

No disconnected nodes

📈 6. Enhanced Logs

Readable, colorized logs:

▶ Starting workflow at: Employee Onboarding
🟢 Start → Start Employee Onboarding
📌 Task → Collect Documents | Assignee: HR
📝 Approval → Manager Review | Role: Manager
⚙ Automation → Action: send_email
🏁 End → Workflow Complete
✔ Workflow Simulation Complete

🎨 7. Tailwind-Styled Professional UI

Dark theme

Smooth animations

Highlight effects

Clean layout

Modern SaaS feel

🛠️ Tech Stack
Technology	Purpose
React + TypeScript	Core framework
React Flow v12	Graph, edges, nodes
Zustand	Global store
Vite	Fast dev environment
TailwindCSS	UI styling
MSW / mock APIs (optional)	Automation actions
📂 Folder Structure
src/
│── api/
│    └── mockAutomations.ts
│
│── components/
│    ├── layout/
│    │     ├── Sidebar.tsx
│    │     ├── WorkflowCanvas.tsx
│    │     ├── WorkflowSimulator.tsx
│    │     └── NodeConfigPanel.tsx
│    │
│    ├── nodes/
│    │     ├── StartNode.tsx
│    │     ├── TaskNode.tsx
│    │     ├── ApprovalNode.tsx
│    │     ├── AutomatedNode.tsx
│    │     └── EndNode.tsx
│    │
│    └── forms/
│          ├── StartNodeForm.tsx
│          ├── TaskNodeForm.tsx
│          ├── ApprovalNodeForm.tsx
│          ├── AutomatedNodeForm.tsx
│          └── EndNodeForm.tsx
│
│── hooks/
│     └── useWorkflowStore.ts
│
└── App.tsx

▶️ Getting Started
1. Clone the Repository
git clone https://github.com/your-username/workflow-builder.git
cd workflow-builder

2. Install Dependencies
npm install

3. Start the Development Server
npm run dev


App runs at:

http://localhost:5173/

🧩 How to Use
🟦 1. Drag Nodes

Drag nodes from the sidebar into the canvas.

🟧 2. Connect Nodes

Drag connectors between nodes to define workflow order.

🟥 3. Configure Nodes

Click any node → edit properties in the right panel.

🟩 4. Simulate Workflow

Click Test Workflow → Run simulation → Watch logs appear.

📸 Screenshots (Add these after taking screenshots)

Replace these with actual images from your app.

📷 Workflow Canvas
📷 Node Config Panel
📷 Simulator Panel
📷 Active Node Highlighting

🧠 Future Enhancements (Optional)

Export/Import workflow JSON

Auto-layout (Dagre integration)

Cycle detection & advanced validation

Cloud save with backend

Node icons & advanced UI cards

Full API-backed automation engine

💼 About This Project

This project was built as part of the
Tredence Frontend Internship Practical Assignment, demonstrating:

React Flow proficiency

State management

UI/UX design

Problem solving

Workflow logic implementation

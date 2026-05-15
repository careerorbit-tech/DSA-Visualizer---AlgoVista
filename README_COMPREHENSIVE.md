# DSA Visualizer - AlgoVista

## Algorithm Visualization Studio

A comprehensive, interactive web-based platform for visualizing Data Structures and Algorithms (DSA) with real-time execution, step-by-step playback, and detailed pseudocode documentation.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Algorithms Included](#algorithms-included)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Architecture](#project-architecture)
- [Available Routes & Pages](#available-routes--pages)
- [Components Overview](#components-overview)
- [Key Technologies & Dependencies](#key-technologies--dependencies)
- [Development Workflow](#development-workflow)
- [Docker Deployment](#docker-deployment)
- [File Structure Breakdown](#file-structure-breakdown)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Project Overview

**AlgoVista** is an educational platform designed to help students, developers, and educators understand complex Data Structures and Algorithms through interactive visualizations. The platform provides real-time visual feedback as algorithms execute, step-by-step playback controls, performance metrics, and detailed pseudocode explanations for each algorithm.

The project is built with a **React.js frontend** and **Express.js backend**, containerized with Docker for easy deployment and scalability.

### Vision

To make learning DSA intuitive and engaging by providing a visual representation of algorithm execution, helping users understand:

- How data structures organize information
- How algorithms manipulate data
- Performance characteristics (time complexity, comparisons, swaps)
- Different problem-solving strategies

---

## ✨ Key Features

### Interactive Visualization

- **Real-time Animation**: Watch algorithms execute step-by-step with smooth animations
- **Color-coded Elements**: Different colors represent different states (active, compared, swapped, sorted)
- **Multiple Visualizations**: Bars for arrays, nodes for trees and graphs, matrices for grids

### Algorithm Controls

- **Play/Pause**: Control execution speed and pause at any step
- **Step Forward/Backward**: Navigate through execution steps manually
- **Speed Adjustment**: Control animation speed from 0.25x to 2x
- **Reset**: Restart algorithm with same or new data

### Performance Metrics

- **Comparisons Counter**: Track number of comparisons made
- **Swaps Counter**: Monitor memory write operations
- **Time Complexity Info**: Display theoretical and actual complexity
- **Space Complexity**: Show memory usage information

### Educational Content

- **Pseudocode Display**: Line-by-line pseudocode with current execution pointer
- **Algorithm Explanation**: Detailed description of each algorithm
- **Best/Average/Worst Case**: Show complexity analysis
- **Use Cases**: Practical applications of each algorithm

### Learning Resources

- **DSA Lessons**: Structured learning paths
- **Study Guide**: Comprehensive guide to DSA concepts
- **Learning Hub**: Interactive learning modules
- **Algorithm Library**: Searchable database of all algorithms

### Multiple Algorithm Categories

1. **Sorting Algorithms**: 9 different sorting techniques
2. **Searching Algorithms**: 5 search methods
3. **Tree Structures**: Binary Search Trees, AVL Trees, Heaps, Tries
4. **Graph Algorithms**: BFS, DFS, Dijkstra, A\*, Prim's, Kruskal's
5. **Dynamic Programming**: Classic DP problems (coming soon)
6. **Greedy Algorithms**: Optimization techniques (coming soon)
7. **Backtracking**: Constraint satisfaction (coming soon)
8. **String Algorithms**: Pattern matching (coming soon)

---

## 🛠️ Tech Stack

### Frontend Stack

```
Framework:        React 18.2.0
Build Tool:       Vite 4.3.9
Routing:          React Router DOM 6.8.1
Styling:          CSS3 (with animations)
Visualization:    HTML5 Canvas
Language:         JavaScript (ES6+)
Package Manager:  npm
Dev Tools:        ESLint 8.38.0
```

### Backend Stack

```
Runtime:          Node.js
Framework:        Express.js 4.18.2
Database:         MongoDB 6.9.2 (Mongoose)
Authentication:   JWT (jsonwebtoken 9.0.0)
Security:         bcryptjs 2.4.3
CORS:             cors 2.8.5
Dev Tool:         Nodemon 2.0.20
```

### DevOps & Deployment

```
Containerization: Docker
Orchestration:    Docker Compose
Environment:      Node.js
Port Config:      Frontend (5173), Backend (5000)
```

### Development Tools

```
Version Control:  Git
IDE:              VS Code
Linting:          ESLint with React plugins
Code Formatting:  Vite default (can use Prettier)
```

---

## 📁 Project Structure

```
dsa-visualizer/
├── client/                          # React Frontend Application
│   ├── index.html                   # Main HTML entry point
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js               # Vite configuration
│   ├── eslint.config.js             # ESLint configuration
│   ├── public/                      # Static assets
│   └── src/                         # Source code
│       ├── main.jsx                 # React entry point
│       ├── App.jsx                  # Root component with routing
│       ├── App.css                  # Root styling
│       ├── index.css                # Global styles
│       ├── components/              # Reusable UI components
│       │   ├── Navbar.jsx           # Navigation bar
│       │   ├── Navbar.css           # Navbar styling
│       │   ├── Footer.jsx           # Footer component
│       │   ├── Footer.css           # Footer styling
│       │   ├── Controls.jsx         # Playback controls (Play, Pause, Step, Reset)
│       │   ├── Controls.css         # Controls styling
│       │   ├── VisualizationCanvas.jsx    # Canvas-based rendering
│       │   ├── VisualizationCanvas.css    # Canvas styling
│       │   ├── PseudocodeBox.jsx    # Shows pseudocode with highlights
│       │   ├── PseudocodeBox.css    # Pseudocode styling
│       │   ├── PseudocodeContainer.jsx    # Pseudocode wrapper
│       │   ├── TreePseudocodeBox.jsx      # Tree-specific pseudocode
│       │   ├── GraphVisualization.jsx     # Graph rendering component
│       │   ├── GraphVisualization.css     # Graph styling
│       │   ├── TreeVisualization.jsx      # Tree rendering component
│       │   ├── TreeVisualization.css      # Tree styling
│       │   ├── TrieVisualization.jsx      # Trie rendering component
│       │   └── TrieVisualization.css      # Trie styling
│       ├── pages/                   # Page components (routes)
│       │   ├── Home.jsx             # Landing page with algorithm categories
│       │   ├── Home.css             # Home page styling
│       │   ├── Library.jsx          # Algorithm library/search page
│       │   ├── Library.css          # Library styling
│       │   ├── DsaLessons.jsx       # Structured DSA lessons
│       │   ├── LearningHub.jsx      # Learning resources
│       │   ├── LearningPages.css    # Learning pages styling
│       │   ├── AboutUs.jsx          # About page
│       │   ├── Sorting.jsx          # Sorting algorithms page
│       │   ├── Sorting.css          # Sorting page styling
│       │   ├── Searching.jsx        # Searching algorithms page
│       │   ├── Trees.jsx            # Tree algorithms page
│       │   ├── Trees.css            # Trees page styling
│       │   ├── Graphs.jsx           # Graph algorithms page
│       │   ├── AlgorithmView.jsx    # Generic algorithm viewer
│       │   ├── AlgorithmView.css    # Algorithm view styling
│       │   ├── TreeAlgorithmView.jsx        # Tree algorithm viewer
│       │   ├── TreeAlgorithmView.css        # Tree view styling
│       │   ├── GraphAlgorithmView.jsx       # Graph algorithm viewer
│       │   ├── GraphAlgorithmView.css       # Graph view styling
│       │   ├── RoadmapCategory.jsx  # Categories (DP, Greedy, etc.)
│       │   └── RoadmapCategory.css  # Category page styling
│       ├── algorithms/              # Algorithm implementations
│       │   ├── sorting/             # Sorting algorithms
│       │   │   ├── index.js         # Sorting algorithms export
│       │   │   ├── bubbleSort.js    # Bubble Sort (generator function)
│       │   │   ├── quickSort.js     # Quick Sort (generator function)
│       │   │   ├── mergeSort.js     # Merge Sort (generator function)
│       │   │   ├── insertionSort.js # Insertion Sort (generator function)
│       │   │   ├── selectionSort.js # Selection Sort (generator function)
│       │   │   ├── shellSort.js     # Shell Sort (generator function)
│       │   │   ├── countingSort.js  # Counting Sort (generator function)
│       │   │   └── radixSort.js     # Radix Sort (generator function)
│       │   ├── searching/           # Searching algorithms
│       │   │   ├── linearSearch.js  # Linear Search (generator function)
│       │   │   ├── binarySearch.js  # Binary Search (generator function)
│       │   │   ├── jumpSearch.js    # Jump Search (generator function)
│       │   │   ├── interpolationSearch.js  # Interpolation Search
│       │   │   └── exponentialSearch.js    # Exponential Search
│       │   ├── trees/               # Tree algorithms
│       │   │   ├── bst.js           # Binary Search Tree operations
│       │   │   └── advancedStructures.js  # AVL, Heaps, Tries
│       │   └── graphs/              # Graph algorithms
│       │       └── index.js         # Graph algorithms (BFS, DFS, Dijkstra, etc.)
│       └── assets/                  # Images, icons, fonts
│
├── server/                          # Express.js Backend
│   ├── package.json                 # Backend dependencies
│   ├── src/
│   │   ├── index.js                 # Express server setup
│   │   ├── controllers/             # Request handlers
│   │   ├── middleware/              # Custom middleware (auth, etc.)
│   │   ├── models/                  # Database models (User, Lesson, etc.)
│   │   └── routes/                  # API endpoints
│   └── node_modules/                # Backend dependencies
│
├── docker-compose.yml               # Docker Compose configuration
├── README.md                        # Original project README
└── docs/                            # Documentation files

```

---

## 🔄 Algorithms Included

### 1. Sorting Algorithms (9 algorithms)

| Algorithm          | Best Case  | Average Case | Worst Case | Space    | Stable |
| ------------------ | ---------- | ------------ | ---------- | -------- | ------ |
| **Bubble Sort**    | O(n)       | O(n²)        | O(n²)      | O(1)     | ✅ Yes |
| **Selection Sort** | O(n²)      | O(n²)        | O(n²)      | O(1)     | ❌ No  |
| **Insertion Sort** | O(n)       | O(n²)        | O(n²)      | O(1)     | ✅ Yes |
| **Merge Sort**     | O(n log n) | O(n log n)   | O(n log n) | O(n)     | ✅ Yes |
| **Quick Sort**     | O(n log n) | O(n log n)   | O(n²)      | O(log n) | ❌ No  |
| **Shell Sort**     | O(n log n) | O(n log²n)   | O(n²)      | O(1)     | ❌ No  |
| **Counting Sort**  | O(n + k)   | O(n + k)     | O(n + k)   | O(k)     | ✅ Yes |
| **Radix Sort**     | O(nk)      | O(nk)        | O(nk)      | O(n + k) | ✅ Yes |
| **Selection Sort** | O(n²)      | O(n²)        | O(n²)      | O(1)     | ❌ No  |

**Features**:

- Real-time swap and comparison counters
- Step-by-step pseudocode highlighting
- Customizable array size and speed
- Best/Average/Worst case analysis

### 2. Searching Algorithms (5 algorithms)

| Algorithm                | Best Case | Average Case | Worst Case | Prerequisite         |
| ------------------------ | --------- | ------------ | ---------- | -------------------- |
| **Linear Search**        | O(1)      | O(n/2)       | O(n)       | None                 |
| **Binary Search**        | O(1)      | O(log n)     | O(log n)   | Sorted Array         |
| **Jump Search**          | O(1)      | O(√n)        | O(√n)      | Sorted Array         |
| **Interpolation Search** | O(1)      | O(log log n) | O(n)       | Uniform Distribution |
| **Exponential Search**   | O(1)      | O(log n)     | O(log n)   | Sorted Array         |

**Features**:

- Highlight target element found/not found
- Show search range at each step
- Comparison counter
- Works on both sorted and unsorted data

### 3. Tree Algorithms (In Development)

**Data Structures**:

- Binary Search Tree (BST)
  - Insertion
  - Deletion
  - Search
  - Traversal (InOrder, PreOrder, PostOrder, Level-Order)
- Advanced Structures:
  - AVL Tree (Self-balancing BST)
  - Heap (Min/Max)
  - Trie (Prefix Tree)

**Features**:

- Interactive tree node visualization
- Show balance factors (for AVL)
- Display heap property violations
- Trie prefix visualization

### 4. Graph Algorithms (In Development)

**Algorithms**:

- Breadth-First Search (BFS)
- Depth-First Search (DFS)
- Dijkstra's Algorithm
- A\* Pathfinding
- Prim's Minimum Spanning Tree
- Kruskal's Minimum Spanning Tree

**Features**:

- Interactive graph editor
- Show visited nodes and edges
- Distance/weight visualization
- Shortest path highlighting

### 5. Additional Categories (Planned)

- **Dynamic Programming**: Knapsack, LCS, Coin Change, LIS, Edit Distance, Grid DP
- **Greedy Algorithms**: Activity Selection, Fractional Knapsack, Huffman Coding, Job Sequencing
- **Backtracking**: N-Queens, Sudoku Solver, Subset Sum, Permutations, Maze Search
- **String Algorithms**: Pattern Matching, KMP, Z-Algorithm, Rabin-Karp

---

## 📦 Installation & Setup

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Docker** (optional, for containerized deployment)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/dsa-visualizer.git
cd dsa-visualizer
```

### Step 2: Install Frontend Dependencies

```bash
cd client
npm install
```

**Installed Dependencies**:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.38.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.4",
    "vite": "^4.3.9"
  }
}
```

### Step 3: Install Backend Dependencies

```bash
cd ../server
npm install
```

**Installed Dependencies**:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "mongoose": "^6.9.2",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

---

## 🚀 Running the Application

### Development Mode (Without Docker)

#### Terminal 1: Start Backend Server

```bash
cd server
npm run dev
```

**Output**:

```
[nodemon] 2.0.20
[nodemon] to restart at any time, type `rs`
[nodemon] watching path(s): src/**/*
[nodemon] watching extensions: js,json
Server running on port 5000
```

**Backend runs on**: `http://localhost:5000`

#### Terminal 2: Start Frontend Development Server

```bash
cd client
npm run dev
```

**Output**:

```
  VITE v4.3.9  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**Frontend runs on**: `http://localhost:5173`

### Access the Application

Open your browser and navigate to: **`http://localhost:5173`**

### Available NPM Scripts

**Frontend (client/package.json)**:

```bash
npm run dev        # Start development server with HMR
npm run build      # Build for production
npm run lint       # Run ESLint checks
npm run preview    # Preview production build
```

**Backend (server/package.json)**:

```bash
npm start          # Start server (production mode)
npm run dev        # Start with nodemon (development mode)
```

---

## 🏗️ Project Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Client (React)                           │
│                    Port: 5173                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Routing Layer (React Router)            │   │
│  │  - Home Page                                         │   │
│  │  - Algorithm Pages (Sorting, Searching, etc.)       │   │
│  │  - Learning Hub                                     │   │
│  │  - Library                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Component Layer                         │   │
│  │  - Navbar, Footer, Controls                         │   │
│  │  - Visualization Canvas (HTML5 Canvas)             │   │
│  │  - Pseudocode Box                                  │   │
│  │  - Tree/Graph/Trie Visualizations                  │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           Algorithm Layer (Generators)              │   │
│  │  - Sorting: BubbleSort, QuickSort, MergeSort, etc. │   │
│  │  - Searching: Binary, Linear, Jump, etc.           │   │
│  │  - Trees: BST, AVL, Heap, Trie                     │   │
│  │  - Graphs: BFS, DFS, Dijkstra, A*, etc.            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↕ HTTP/CORS
┌─────────────────────────────────────────────────────────────┐
│                  Server (Express.js)                        │
│                    Port: 5000                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         API Routes & Controllers                    │   │
│  │  - GET  /api/health                                │   │
│  │  - GET  /api/algorithms                            │   │
│  │  - POST /api/users/register                        │   │
│  │  - POST /api/users/login                           │   │
│  │  - GET  /api/lessons                               │   │
│  │  - POST /api/progress                              │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Middleware Layer                            │   │
│  │  - CORS Configuration                              │   │
│  │  - Authentication (JWT)                            │   │
│  │  - Error Handling                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Database Models (Mongoose)                  │   │
│  │  - User Model (Authentication)                     │   │
│  │  - Algorithm Model                                 │   │
│  │  - Progress Model                                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────────┐
│               Database Layer (MongoDB)                      │
│  - Users Collection                                        │
│  - Algorithms Collection                                   │
│  - Progress Tracking Collection                            │
│  - Lessons Collection                                      │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Interaction (UI)
        ↓
Component State Update
        ↓
Algorithm Generator Called
        ↓
Yield Next Step
        ↓
Update Canvas/Tree/Graph Rendering
        ↓
Display Metrics & Pseudocode
        ↓
Ready for Next Step/Play
```

### Algorithm Implementation Pattern

All algorithms use **JavaScript Generators** for step-by-step execution:

```javascript
export const bubbleSort = function* (arr) {
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Yield state at each comparison
      yield {
        array: [...arr],
        i: i,
        j: j,
        comparisons: ++comparisons,
        swaps: swaps,
        currentStep: "comparing",
      };

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
      }
    }
  }
};
```

---

## 🧩 Available Routes & Pages

### Navigation Routes

| Route                        | Page Component           | Purpose                          | Features                              |
| ---------------------------- | ------------------------ | -------------------------------- | ------------------------------------- |
| `/`                          | `Home.jsx`               | Landing page                     | Algorithm categories, quick links     |
| `/library`                   | `Library.jsx`            | Algorithm library                | Search, filter, browse all algorithms |
| `/lessons`                   | `DsaLessons.jsx`         | Educational lessons              | Structured learning path              |
| `/study-guide`               | `LearningHub.jsx`        | Comprehensive study material     | Concepts, definitions, resources      |
| `/about`                     | `AboutUs.jsx`            | About the project                | Team, mission, contact                |
| `/sorting`                   | `Sorting.jsx`            | Sorting algorithms               | List of all sorting algorithms        |
| `/searching`                 | `Searching.jsx`          | Searching algorithms             | Linear, binary, and other searches    |
| `/trees`                     | `Trees.jsx`              | Tree data structures             | BST, AVL, Heap, Trie                  |
| `/graphs`                    | `Graphs.jsx`             | Graph algorithms                 | BFS, DFS, Dijkstra, A\*, MST          |
| `/dynamic-programming`       | `RoadmapCategory.jsx`    | DP problems                      | Knapsack, LCS, coin change            |
| `/greedy`                    | `RoadmapCategory.jsx`    | Greedy algorithms                | Activity selection, Huffman           |
| `/backtracking`              | `RoadmapCategory.jsx`    | Backtracking problems            | N-Queens, Sudoku, maze                |
| `/string-algorithms`         | `RoadmapCategory.jsx`    | String matching                  | KMP, Z-algorithm, Rabin-Karp          |
| `/algorithm/:category/:name` | `AlgorithmView.jsx`      | Algorithm detail & visualization | Step-by-step execution                |
| `/algorithm/trees/:name`     | `TreeAlgorithmView.jsx`  | Tree algorithm viewer            | Tree-specific visualization           |
| `/algorithm/graphs/:name`    | `GraphAlgorithmView.jsx` | Graph algorithm viewer           | Graph-specific visualization          |

---

## 🎨 Components Overview

### Layout Components

#### **Navbar.jsx**

- Responsive navigation bar
- Active route highlighting
- Links to all major sections
- Logo and branding
- About Us CTA button

#### **Footer.jsx**

- Footer information
- Copyright notice
- Links to resources
- Contact information

### Visualization Components

#### **VisualizationCanvas.jsx**

- HTML5 Canvas rendering
- Bar chart visualization for arrays
- Color-coded bars (active, compared, sorted, current)
- Metrics display (comparisons, swaps)
- Index and value labels

**Color Legend**:

- `#3f7cff` - Default bar
- `#f97316` - Active element
- `#ef4444` - Currently processing
- `#22c55e` - Successfully sorted/found
- `#a5b4fc` - Range indicator
- `#dbe4ff` - Muted/inactive

#### **TreeVisualization.jsx**

- Renders binary trees
- Node connections with edges
- Level-based layout
- Interactive node highlighting
- Balance factor display

#### **GraphVisualization.jsx**

- Graph node and edge rendering
- Weighted edge display
- Node distance metrics
- Visited/unvisited states
- Shortest path highlighting

#### **TrieVisualization.jsx**

- Character-based tree nodes
- Edge label display
- End-of-word markers
- Traversal visualization

### Control & Info Components

#### **Controls.jsx**

- Play/Pause buttons
- Next/Previous step buttons
- Reset button
- Speed slider (0.25x - 2x)
- Current step display

#### **PseudocodeBox.jsx**

- Displays algorithm pseudocode
- Line-by-line highlighting
- Current execution line pointer
- Syntax highlighting
- Scrollable code view

#### **PseudocodeContainer.jsx**

- Wrapper for pseudocode display
- Manages pseudocode state
- Synchronizes with algorithm execution

---

## 🔧 Key Technologies & Dependencies

### Frontend Technologies

**React 18.2.0**

- Component-based UI architecture
- Hooks for state management (useState, useEffect, useRef)
- Virtual DOM for efficient rendering
- Fast refresh during development

**Vite 4.3.9**

- Lightning-fast build tool
- ES modules support
- Hot Module Replacement (HMR)
- Optimized production builds
- Configuration: `vite.config.js`

**React Router DOM 6.8.1**

- Client-side routing
- Nested route support
- Dynamic route parameters
- Navigation without page reload

**HTML5 Canvas API**

- 2D drawing context
- Performance optimizations
- Smooth animations
- Real-time rendering

**CSS3**

- Flexbox layouts
- Grid layouts
- CSS animations
- Responsive design
- CSS variables for theming

### Backend Technologies

**Express.js 4.18.2**

- Lightweight web framework
- RESTful API endpoints
- Middleware support
- Error handling
- Static file serving

**MongoDB with Mongoose 6.9.2**

- NoSQL database
- Schema-based models
- Query optimization
- Indexing support

**JWT (jsonwebtoken 9.0.0)**

- Token-based authentication
- Stateless sessions
- Secure endpoints
- Token expiration

**bcryptjs 2.4.3**

- Password hashing
- Security best practices
- Salt generation

**CORS 2.8.5**

- Cross-Origin Resource Sharing
- Development flexibility
- Production-ready configuration

### Development Tools

**Nodemon 2.0.20**

- Automatic server restart
- File watching
- Development productivity

**ESLint 8.38.0**

- Code quality checks
- React-specific rules
- React Hooks linting
- Consistent code style

---

## 💻 Development Workflow

### Setting Up Development Environment

#### 1. Install Dependencies

```bash
# Frontend setup
cd client && npm install

# Backend setup
cd ../server && npm install
```

#### 2. Start Development Servers

**Terminal 1 - Backend**:

```bash
cd server
npm run dev
```

**Terminal 2 - Frontend**:

```bash
cd client
npm run dev
```

#### 3. Access Application

```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

### Code Quality Checks

**Run ESLint**:

```bash
cd client
npm run lint
```

**Fix ESLint Issues**:

```bash
npx eslint . --fix
```

### Building for Production

**Frontend Production Build**:

```bash
cd client
npm run build
```

Output: `client/dist/` directory

**Preview Production Build**:

```bash
npm run preview
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/algorithm-name

# Make changes and commit
git add .
git commit -m "Add algorithm: name"

# Push to repository
git push origin feature/algorithm-name

# Create Pull Request on GitHub
```

---

## 🐳 Docker Deployment

### Docker Setup

#### Prerequisites

- Docker installed
- Docker Compose installed

#### Building and Running with Docker

```bash
# Build and start containers
docker-compose up --build

# Run in background
docker-compose up -d

# Stop containers
docker-compose down

# View logs
docker-compose logs -f
```

#### Docker Compose Configuration

```yaml
version: "3"
services:
  # Frontend service
  client:
    build: ./client
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://backend:5000
    depends_on:
      - backend

  # Backend service
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongodb:27017/dsa-visualizer
    depends_on:
      - mongodb

  # MongoDB database
  mongodb:
    image: mongo:6.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

#### Accessing Docker Application

After running `docker-compose up`:

- **Frontend**: `http://localhost:5173`
- **Backend**: `http://localhost:5000`
- **MongoDB**: `mongodb://localhost:27017`

---

## 📂 File Structure Breakdown

### Frontend Structure Details

```
src/
├── algorithms/
│   ├── sorting/
│   │   ├── bubbleSort.js    → Bubble Sort generator function
│   │   ├── quickSort.js     → Quick Sort (recursive, generator)
│   │   ├── mergeSort.js     → Merge Sort (divide & conquer)
│   │   ├── insertionSort.js → Insertion Sort (incremental)
│   │   ├── selectionSort.js → Selection Sort (find min)
│   │   ├── shellSort.js     → Shell Sort (gap-based)
│   │   ├── countingSort.js  → Counting Sort (non-comparative)
│   │   ├── radixSort.js     → Radix Sort (digit-by-digit)
│   │   └── index.js         → Export all sorting algorithms
│   ├── searching/
│   │   ├── linearSearch.js      → Linear scan search
│   │   ├── binarySearch.js      → Divide-and-conquer search
│   │   ├── jumpSearch.js        → Jump to block, then search
│   │   ├── interpolationSearch.js → Estimate position search
│   │   └── exponentialSearch.js  → Doubling range search
│   ├── trees/
│   │   ├── bst.js                → BST insert, delete, search
│   │   └── advancedStructures.js → AVL, Heap, Trie operations
│   └── graphs/
│       └── index.js              → BFS, DFS, Dijkstra, A*, Prim's, Kruskal's

├── components/
│   ├── Navbar.jsx          → Navigation bar (header)
│   ├── Footer.jsx          → Footer information
│   ├── Controls.jsx        → Play, pause, step, reset, speed
│   ├── VisualizationCanvas.jsx → Array/bar chart rendering
│   ├── PseudocodeBox.jsx   → Code display with highlights
│   ├── TreeVisualization.jsx   → Binary tree rendering
│   ├── GraphVisualization.jsx  → Graph rendering
│   └── TrieVisualization.jsx   → Trie rendering

├── pages/
│   ├── Home.jsx            → Landing page (8 categories)
│   ├── Library.jsx         → Search & browse algorithms
│   ├── DsaLessons.jsx      → Structured learning paths
│   ├── LearningHub.jsx     → Study materials & resources
│   ├── AboutUs.jsx         → Project information
│   ├── Sorting.jsx         → Sorting algorithms list
│   ├── Searching.jsx       → Searching algorithms list
│   ├── Trees.jsx           → Tree data structures
│   ├── Graphs.jsx          → Graph algorithms
│   ├── AlgorithmView.jsx   → Generic algorithm viewer
│   ├── TreeAlgorithmView.jsx   → Tree-specific viewer
│   ├── GraphAlgorithmView.jsx  → Graph-specific viewer
│   └── RoadmapCategory.jsx → Category pages (DP, Greedy, etc.)

├── App.jsx                 → Root component with routing
├── main.jsx                → React entry point
├── App.css                 → Global app styles
└── index.css               → Global styles
```

### Backend Structure Details

```
server/src/
├── index.js
│   ├── Express app initialization
│   ├── CORS middleware setup
│   ├── JSON parsing middleware
│   ├── API routes registration
│   ├── Static file serving (production)
│   └── Server listen on port 5000

├── routes/
│   ├── users.js        → User registration, login, profile
│   ├── algorithms.js   → Get algorithms, details, resources
│   └── progress.js     → Track user progress & bookmarks

├── controllers/
│   ├── userController.js        → User business logic
│   ├── algorithmController.js   → Algorithm data logic
│   └── progressController.js    → Progress tracking logic

├── models/
│   ├── User.js         → User schema (email, password, progress)
│   ├── Algorithm.js    → Algorithm metadata schema
│   └── Progress.js     → User progress tracking schema

└── middleware/
    ├── auth.js         → JWT verification
    ├── errorHandler.js → Global error handling
    └── validation.js   → Input validation
```

---

## 🚀 Features Overview

### Current Features (Implemented)

✅ 9 Sorting Algorithms with visualization  
✅ 5 Searching Algorithms with visualization  
✅ Algorithm step-by-step playback  
✅ Pseudocode display with highlighting  
✅ Performance metrics (comparisons, swaps)  
✅ Customizable input size and speed  
✅ Responsive UI design  
✅ React Router-based navigation  
✅ Express.js backend API  
✅ Docker deployment support

### In-Progress Features

🔄 Tree data structures (BST, AVL, Heap, Trie)  
🔄 Graph algorithms (BFS, DFS, Dijkstra, A\*)  
🔄 User authentication and progress tracking  
🔄 Saved preferences and bookmarks

### Planned Features (Future)

⏳ Dynamic Programming algorithms  
⏳ Greedy algorithms  
⏳ Backtracking algorithms  
⏳ String matching algorithms  
⏳ Advanced visualization features  
⏳ Interactive algorithm code editor  
⏳ Algorithm complexity comparison  
⏳ Mobile app version  
⏳ Collaborative learning features  
⏳ Algorithm quiz & assessment

---

## 📊 Component Interaction Flow

### Sorting Algorithm Execution Flow

```
User selects algorithm
        ↓
User sets array size
        ↓
User clicks "Generate Array"
        ↓
Array rendered in Canvas
        ↓
User clicks "Play"
        ↓
Algorithm generator called
        ↓
First state yielded
        ↓
Canvas re-renders with highlighted indices
        ↓
Pseudocode pointer updates
        ↓
Metrics displayed (comparisons, swaps)
        ↓
Timer waits based on speed setting
        ↓
Next state yielded
        ↓
[Process repeats until array sorted]
        ↓
Completion message shown
        ↓
User can replay, adjust settings, try another algorithm
```

---

## 🎓 Learning Path

### Beginner Path

1. **Introduction to Sorting**
   - Understand bubble sort mechanics
   - Learn comparison-based sorting

2. **Introduction to Searching**
   - Linear search basics
   - When to use linear search

3. **Complexity Analysis**
   - Big O notation
   - Time and space complexity

### Intermediate Path

1. **Efficient Sorting**
   - Merge sort (divide & conquer)
   - Quick sort (partitioning)

2. **Advanced Searching**
   - Binary search (logarithmic)
   - Jump search optimization

3. **Data Structures**
   - Binary trees
   - Tree traversals

### Advanced Path

1. **Graph Theory**
   - Graph representations
   - Traversal algorithms

2. **Optimization Techniques**
   - Dynamic programming
   - Greedy algorithms

3. **Complex Problems**
   - Backtracking
   - String algorithms

---

## 🐛 Troubleshooting

### Frontend Issues

**Port 5173 already in use**

```bash
# Kill process using port 5173
npx kill-port 5173
npm run dev
```

**Module not found errors**

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Canvas rendering issues**

```bash
# Clear browser cache
Ctrl+Shift+Delete (Chrome)
⌘+Shift+Delete (Mac)
```

### Backend Issues

**Port 5000 already in use**

```bash
# Kill process using port 5000
npx kill-port 5000
npm run dev
```

**MongoDB connection error**

```bash
# Ensure MongoDB is running
# Update MONGODB_URI in .env if needed
```

### Docker Issues

**Container won't start**

```bash
docker-compose down
docker-compose up --build
```

**Port conflicts**

```bash
# Check running containers
docker ps

# Stop all containers
docker-compose down
```

---

## 🤝 Contributing

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-algorithm`
3. **Make your changes**
4. **Commit with clear messages**: `git commit -m "Add: New Algorithm"`
5. **Push to branch**: `git push origin feature/new-algorithm`
6. **Create Pull Request**

### Adding a New Algorithm

1. **Create algorithm file** in appropriate folder (e.g., `src/algorithms/sorting/newSort.js`)

2. **Implement as generator**:

```javascript
export const newSort = function* (arr) {
  // Algorithm implementation
  yield {
    /* state */
  };
};
```

3. **Export from index.js**:

```javascript
export { newSort } from "./newSort.js";
```

4. **Create visualization component** if needed

5. **Add route** in App.jsx

6. **Test thoroughly**

7. **Submit Pull Request**

### Code Style Guidelines

- Use ES6+ syntax
- Follow ESLint rules
- Add comments for complex logic
- Use meaningful variable names
- Keep functions small and focused

---

## 📈 Performance Optimization

### Frontend Optimization

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Compress assets
- **Caching**: Browser cache strategy
- **Minification**: Vite automatic minification
- **Tree Shaking**: Unused code removal

### Algorithm Optimization

- **Generator Functions**: Memory efficient step-by-step execution
- **Canvas Rendering**: Single canvas element for all visualizations
- **Ref Caching**: Avoid unnecessary re-renders
- **Debouncing**: Input handling optimization

### Backend Optimization

- **Connection Pooling**: MongoDB connection reuse
- **Response Compression**: gzip compression
- **Caching Headers**: Browser cache control
- **Rate Limiting**: API protection

---

## 📝 API Documentation

### Health Check

```
GET /api/health
Response: { status: 'ok', service: 'dsa-visualizer-server' }
```

### User Endpoints (Planned)

```
POST   /api/users/register
POST   /api/users/login
GET    /api/users/profile
PATCH  /api/users/profile
```

### Algorithm Endpoints (Planned)

```
GET    /api/algorithms
GET    /api/algorithms/:id
POST   /api/algorithms/search
```

### Progress Endpoints (Planned)

```
POST   /api/progress/save
GET    /api/progress/:userId
PATCH  /api/progress/:id
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Abhay Ayare**

- Project: DSA Visualizer / AlgoVista
- GitHub: [Profile Link]
- Email: [Contact Email]

---

## 🙏 Acknowledgments

- React.js and Vite communities
- Express.js documentation
- Algorithm visualization inspiration from popular platforms
- Contributors and testers

---

## 📞 Contact & Support

For questions, suggestions, or bug reports:

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/dsa-visualizer/issues)
- **Email**: your.email@example.com
- **Discord**: [Join community server]

---

## 🗺️ Project Roadmap

### Phase 1 (Current)

- ✅ Sorting algorithms
- ✅ Searching algorithms
- ✅ Basic UI and visualization

### Phase 2 (In Progress)

- 🔄 Tree data structures
- 🔄 Graph algorithms
- 🔄 User authentication

### Phase 3 (Planned)

- ⏳ Dynamic programming
- ⏳ Greedy algorithms
- ⏳ Backtracking problems
- ⏳ String algorithms

### Phase 4 (Future)

- ⏳ Mobile app
- ⏳ Advanced visualizations
- ⏳ Interactive coding
- ⏳ Collaborative features

---

## 📚 Resources & References

- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)
- [Visualgo.net](https://visualgo.net/) - Algorithm visualization reference
- [GeeksforGeeks DSA](https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa/)
- [LeetCode](https://leetcode.com/) - Practice problems
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)

---

## ⭐ Support

If you find this project helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting issues
- 💡 Suggesting improvements
- 🤝 Contributing code

---

**Happy Learning! 🚀**

---

_Last Updated: 2026_
_Version: 1.0.0_

// client/src/pages/Graphs.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sorting.css';

const Graphs = () => {
  const graphAlgorithms = [
    { name: 'Breadth-First Search', path: 'bfs', complexity: 'O(V + E)' },
    { name: 'Depth-First Search', path: 'dfs', complexity: 'O(V + E)' },
    { name: "Dijkstra's Algorithm", path: 'dijkstra', complexity: 'O(E log V)' },
    { name: "A* Search", path: 'aStar', complexity: 'Heuristic-guided' },
    { name: "Prim's Algorithm", path: 'prim', complexity: 'O(E log V)' },
    { name: "Kruskal's Algorithm", path: 'kruskal', complexity: 'O(E log E)' },
  ];

  return (
    <div className="sorting-page">
      <h1>Graph Algorithms</h1>
      <p>Compare traversals, shortest-path algorithms, and minimum-spanning-tree strategies on the same weighted graph.</p>
      
      <div className="algorithm-grid">
        {graphAlgorithms.map((algo) => (
          <Link
            key={algo.path}
            to={`/algorithm/graphs/${algo.path}`}
            className="algorithm-card"
          >
            <h3>{algo.name}</h3>
            <p>Time Complexity: {algo.complexity}</p>
            <span className="view-button">Open Live Visualization</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Graphs;

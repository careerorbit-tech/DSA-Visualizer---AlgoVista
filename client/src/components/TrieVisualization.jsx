import React from 'react';
import './TrieVisualization.css';

const collectNodes = (root) => {
  const nodes = [];
  const edges = [];
  const levels = new Map();

  const walk = (node, depth = 0, parent = null) => {
    if (!levels.has(depth)) levels.set(depth, []);
    levels.get(depth).push(node);
    nodes.push({ ...node, depth });
    if (parent) {
      edges.push({ from: parent.id, to: node.id, label: node.label });
    }
    Object.values(node.children).forEach((child) => walk(child, depth + 1, node));
  };

  walk(root);

  const positionedNodes = [];
  levels.forEach((levelNodes, depth) => {
    levelNodes.forEach((node, index) => {
      const width = 620;
      const spacing = width / (levelNodes.length + 1);
      positionedNodes.push({
        ...node,
        x: 30 + spacing * (index + 1),
        y: 60 + depth * 90
      });
    });
  });

  return { nodes: positionedNodes, edges };
};

const TrieVisualization = ({ trieState }) => {
  const { trie, currentNodeId, visitedNodeIds = [], operation } = trieState;

  if (!trie?.root) {
    return null;
  }

  const { nodes, edges } = collectNodes(trie.root);
  const nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]));
  const visited = new Set(visitedNodeIds);

  return (
    <div className="trie-visualization">
      <svg viewBox="0 0 680 520" className="trie-canvas" role="img" aria-label="Trie visualization">
        {edges.map((edge) => {
          const from = nodeMap[edge.from];
          const to = nodeMap[edge.to];
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="trie-edge" />
              <text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 8} className="trie-edge-label">
                {edge.label}
              </text>
            </g>
          );
        })}

        {nodes.map((node) => {
          let nodeClass = 'trie-node';
          if (node.id === currentNodeId) nodeClass += ' trie-node-active';
          else if (visited.has(node.id)) nodeClass += ' trie-node-visited';
          if (node.terminal) nodeClass += ' trie-node-terminal';

          return (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="24" className={nodeClass} />
              <text x={node.x} y={node.y + 5} className="trie-node-label">
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="trie-operation">{operation}</div>
    </div>
  );
};

export default TrieVisualization;

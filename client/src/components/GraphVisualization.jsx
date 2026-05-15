import React from 'react';
import './GraphVisualization.css';

const GraphVisualization = ({ graphState }) => {
  const { graph, activeNode, activeEdgeIds = [], visitedNodes = [], frontierNodes = [], pathNodes = [], pathEdgeIds = [], mstEdgeIds = [], distances = {}, heuristic = {}, queue = [], stack = [], operation = '' } = graphState;

  if (!graph) {
    return null;
  }

  const visitedSet = new Set(visitedNodes);
  const frontierSet = new Set(frontierNodes);
  const pathSet = new Set(pathNodes);
  const activeEdgeSet = new Set(activeEdgeIds);
  const pathEdgeSet = new Set(pathEdgeIds);
  const mstEdgeSet = new Set(mstEdgeIds);

  return (
    <div className="graph-visualization">
      <svg viewBox="0 0 680 470" className="graph-canvas" role="img" aria-label="Graph algorithm visualization">
        {graph.edges.map((edge) => {
          const source = graph.nodes.find((node) => node.id === edge.source);
          const target = graph.nodes.find((node) => node.id === edge.target);
          const midX = (source.x + target.x) / 2;
          const midY = (source.y + target.y) / 2;

          let edgeClass = 'graph-edge';
          if (mstEdgeSet.has(edge.id)) edgeClass += ' graph-edge-mst';
          if (pathEdgeSet.has(edge.id)) edgeClass += ' graph-edge-path';
          if (activeEdgeSet.has(edge.id)) edgeClass += ' graph-edge-active';

          return (
            <g key={edge.id}>
              <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} className={edgeClass} />
              <text x={midX} y={midY - 8} className="graph-weight">
                {edge.weight}
              </text>
            </g>
          );
        })}

        {graph.nodes.map((node) => {
          let nodeClass = 'graph-node';
          if (pathSet.has(node.id)) nodeClass += ' graph-node-path';
          else if (node.id === activeNode) nodeClass += ' graph-node-active';
          else if (frontierSet.has(node.id)) nodeClass += ' graph-node-frontier';
          else if (visitedSet.has(node.id)) nodeClass += ' graph-node-visited';

          return (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="26" className={nodeClass} />
              <text x={node.x} y={node.y + 5} className="graph-node-label">
                {node.id}
              </text>
              {Number.isFinite(distances[node.id]) && (
                <text x={node.x} y={node.y + 42} className="graph-node-meta">
                  d:{distances[node.id] === Infinity ? '∞' : distances[node.id]}
                </text>
              )}
              {Number.isFinite(heuristic[node.id]) && (
                <text x={node.x} y={node.y + 58} className="graph-node-meta">
                  h:{heuristic[node.id]}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="graph-status">
        <div className="graph-operation">{operation}</div>
        <div className="graph-lists">
          <span>Queue: {queue.length ? queue.join(' -> ') : 'empty'}</span>
          <span>Stack: {stack.length ? stack.join(' -> ') : 'empty'}</span>
          <span>Visited: {visitedNodes.length ? visitedNodes.join(', ') : 'none'}</span>
        </div>
      </div>
    </div>
  );
};

export default GraphVisualization;

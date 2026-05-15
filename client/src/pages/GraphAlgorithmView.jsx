import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import GraphVisualization from '../components/GraphVisualization';
import PseudocodeBox from '../components/PseudocodeBox';
import { aStar, bfs, dfs, dijkstra, graphPseudocode, kruskal, prim, sampleGraph } from '../algorithms/graphs';
import './AlgorithmView.css';

const GRAPH_ALGORITHMS = {
  bfs: {
    name: 'Breadth-First Search',
    generator: bfs,
    supportsTarget: true,
    supportsStart: true,
    description: 'BFS explores the graph level by level, making it ideal for shortest paths in unweighted graphs.',
    complexity: { worst: 'O(V + E)', average: 'O(V + E)', best: 'O(1)', space: 'O(V)' }
  },
  dfs: {
    name: 'Depth-First Search',
    generator: dfs,
    supportsTarget: true,
    supportsStart: true,
    description: 'DFS follows one branch as deep as possible before backtracking, which is useful for structure exploration.',
    complexity: { worst: 'O(V + E)', average: 'O(V + E)', best: 'O(1)', space: 'O(V)' }
  },
  dijkstra: {
    name: "Dijkstra's Algorithm",
    generator: dijkstra,
    supportsTarget: true,
    supportsStart: true,
    description: 'Dijkstra computes the shortest path from a source to every reachable node in a graph with non-negative weights.',
    complexity: { worst: 'O(E log V)', average: 'O(E log V)', best: 'O(V)', space: 'O(V)' }
  },
  aStar: {
    name: 'A* Search',
    generator: aStar,
    supportsTarget: true,
    supportsStart: true,
    description: 'A* combines shortest-path relaxation with a heuristic so it can focus the search toward the target.',
    complexity: { worst: 'O(E)', average: 'Depends on heuristic', best: 'O(path length)', space: 'O(V)' }
  },
  prim: {
    name: "Prim's Algorithm",
    generator: prim,
    supportsTarget: false,
    supportsStart: true,
    description: 'Prim grows a minimum spanning tree by repeatedly taking the cheapest edge that connects a new node.',
    complexity: { worst: 'O(E log V)', average: 'O(E log V)', best: 'O(E)', space: 'O(V)' }
  },
  kruskal: {
    name: "Kruskal's Algorithm",
    generator: kruskal,
    supportsTarget: false,
    supportsStart: false,
    description: 'Kruskal sorts all edges and adds them greedily while avoiding cycles to build a minimum spanning tree.',
    complexity: { worst: 'O(E log E)', average: 'O(E log E)', best: 'O(E)', space: 'O(V)' }
  }
};

const createBaseState = () => ({
  graph: sampleGraph,
  activeNode: null,
  activeEdgeIds: [],
  visitedNodes: [],
  frontierNodes: [],
  queue: [],
  stack: [],
  distances: {},
  heuristic: {},
  pathNodes: [],
  pathEdgeIds: [],
  mstEdgeIds: [],
  operation: 'Ready to explore the graph',
  currentStep: 0,
  completed: false
});

const GraphAlgorithmView = () => {
  const { name } = useParams();
  const currentAlgorithm = GRAPH_ALGORITHMS[name] || GRAPH_ALGORITHMS.bfs;
  const [graphState, setGraphState] = useState(createBaseState());
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(850);
  const [language, setLanguage] = useState('javascript');
  const [startNode, setStartNode] = useState('A');
  const [targetNode, setTargetNode] = useState('F');
  const algorithmRef = useRef(null);
  const intervalRef = useRef(null);

  const nodeIds = useMemo(() => sampleGraph.nodes.map((node) => node.id), []);

  const stopPlayback = () => {
    clearInterval(intervalRef.current);
    setIsPlaying(false);
  };

  const resetAlgorithm = () => {
    stopPlayback();
    algorithmRef.current = null;
    setGraphState(createBaseState());
  };

  const runGenerator = (generator, delay) => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = generator.next();
      if (next.done) {
        stopPlayback();
        algorithmRef.current = null;
        return;
      }

      setGraphState(next.value);
      if (next.value.completed) {
        stopPlayback();
        algorithmRef.current = null;
      }
    }, delay);
  };

  const startAlgorithm = () => {
    let generator;

    if (name === 'kruskal') {
      generator = currentAlgorithm.generator(sampleGraph);
    } else if (name === 'prim') {
      generator = currentAlgorithm.generator(sampleGraph, startNode);
    } else {
      generator = currentAlgorithm.generator(sampleGraph, startNode, targetNode);
    }

    algorithmRef.current = generator;
    setGraphState(createBaseState());
    setIsPlaying(true);
    runGenerator(generator, speed);
  };

  const handleSpeedChange = (value) => {
    setSpeed(value);
    if (isPlaying && algorithmRef.current) {
      runGenerator(algorithmRef.current, value);
    }
  };

  return (
    <div className="algorithm-view">
      <h1>{currentAlgorithm.name} Visualization</h1>
      <div className="algorithm-subtitle">The same weighted graph is reused across every graph algorithm so you can compare behavior directly.</div>

      <div className="main-container">
        <div className="visualization-container">
          <GraphVisualization graphState={graphState} />
        </div>

        <div className="pseudocode-container">
          <PseudocodeBox
            algorithm={{ pseudocode: graphPseudocode[name] || graphPseudocode.bfs }}
            currentStep={graphState.currentStep}
            language={language}
            algorithmName={name}
          />
        </div>
      </div>

      <div className="controls-container">
        <div className="tree-controls">
          {currentAlgorithm.supportsStart && (
            <div className="control-group">
              <label htmlFor="startNode">Start Node:</label>
              <select id="startNode" value={startNode} onChange={(e) => setStartNode(e.target.value)} disabled={isPlaying}>
                {nodeIds.map((nodeId) => <option key={nodeId} value={nodeId}>{nodeId}</option>)}
              </select>
            </div>
          )}

          {currentAlgorithm.supportsTarget && (
            <div className="control-group">
              <label htmlFor="targetNode">Target Node:</label>
              <select id="targetNode" value={targetNode} onChange={(e) => setTargetNode(e.target.value)} disabled={isPlaying}>
                {nodeIds.map((nodeId) => <option key={nodeId} value={nodeId}>{nodeId}</option>)}
              </select>
            </div>
          )}

          <div className="control-group">
            <label htmlFor="graphSpeed">Speed: {speed}ms</label>
            <input
              id="graphSpeed"
              type="range"
              min="150"
              max="2400"
              step="50"
              value={speed}
              onChange={(e) => handleSpeedChange(Number.parseInt(e.target.value, 10))}
            />
          </div>

          <div className="control-group">
            <label htmlFor="graphLanguage">Pseudocode Language:</label>
            <select id="graphLanguage" value={language} onChange={(e) => setLanguage(e.target.value)} disabled={isPlaying}>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>

          <div className="buttons">
            <button onClick={startAlgorithm} disabled={isPlaying}>{isPlaying ? 'Running...' : 'Start'}</button>
            <button onClick={stopPlayback} disabled={!isPlaying}>Pause</button>
            <button onClick={resetAlgorithm} disabled={isPlaying}>Reset</button>
          </div>
        </div>
      </div>

      <div className="info-container">
        <div className="algorithm-info">
          <h3>About {currentAlgorithm.name}</h3>
          <p>{currentAlgorithm.description}</p>
        </div>
        <div className="algorithm-info">
          <div className="complexity">
            <h4>Time Complexity:</h4>
            <ul>
              <li>Worst-case: {currentAlgorithm.complexity.worst}</li>
              <li>Average-case: {currentAlgorithm.complexity.average}</li>
              <li>Best-case: {currentAlgorithm.complexity.best}</li>
            </ul>
            <h4>Space Complexity: {currentAlgorithm.complexity.space}</h4>
            <h4>Category: Graph Algorithm</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphAlgorithmView;

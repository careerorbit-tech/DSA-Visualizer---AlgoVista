const cloneState = (state) => JSON.parse(JSON.stringify(state));

export const sampleGraph = {
  directed: false,
  nodes: [
    { id: 'A', x: 110, y: 110 },
    { id: 'B', x: 290, y: 70 },
    { id: 'C', x: 470, y: 120 },
    { id: 'D', x: 190, y: 260 },
    { id: 'E', x: 380, y: 250 },
    { id: 'F', x: 570, y: 230 },
    { id: 'G', x: 300, y: 390 }
  ],
  edges: [
    { id: 'AB', source: 'A', target: 'B', weight: 4 },
    { id: 'AD', source: 'A', target: 'D', weight: 3 },
    { id: 'BD', source: 'B', target: 'D', weight: 2 },
    { id: 'BC', source: 'B', target: 'C', weight: 5 },
    { id: 'BE', source: 'B', target: 'E', weight: 4 },
    { id: 'DE', source: 'D', target: 'E', weight: 6 },
    { id: 'DG', source: 'D', target: 'G', weight: 7 },
    { id: 'CE', source: 'C', target: 'E', weight: 1 },
    { id: 'CF', source: 'C', target: 'F', weight: 7 },
    { id: 'EF', source: 'E', target: 'F', weight: 2 },
    { id: 'EG', source: 'E', target: 'G', weight: 3 },
    { id: 'FG', source: 'F', target: 'G', weight: 5 }
  ]
};

const getNeighbors = (graph, nodeId) =>
  graph.edges
    .filter((edge) => edge.source === nodeId || edge.target === nodeId)
    .map((edge) => ({
      nodeId: edge.source === nodeId ? edge.target : edge.source,
      edgeId: edge.id,
      weight: edge.weight
    }));

const baseGraphState = (graph) => ({
  graph,
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

const euclidean = (a, b) => Math.round(Math.hypot(a.x - b.x, a.y - b.y) / 40);

const buildPath = (parents, start, target, graph) => {
  const pathNodes = [];
  const pathEdgeIds = [];
  let current = target;

  while (current) {
    pathNodes.unshift(current);
    if (current === start) {
      break;
    }
    const parent = parents[current];
    if (!parent) {
      return { pathNodes: [], pathEdgeIds: [] };
    }
    const edge = graph.edges.find(
      (candidate) =>
        (candidate.source === current && candidate.target === parent) ||
        (candidate.source === parent && candidate.target === current)
    );
    if (edge) {
      pathEdgeIds.unshift(edge.id);
    }
    current = parent;
  }

  return { pathNodes, pathEdgeIds };
};

export function* bfs(graph = sampleGraph, start = 'A', target = 'F') {
  const state = baseGraphState(graph);
  const queue = [start];
  const visited = new Set([start]);
  const parents = { [start]: null };
  let step = 0;

  yield { ...cloneState(state), queue: [...queue], frontierNodes: [...queue], operation: `Initialize BFS from ${start}`, currentStep: step++ };

  while (queue.length) {
    const node = queue.shift();
    state.activeNode = node;
    state.visitedNodes = [...visited];
    state.queue = [...queue];
    state.frontierNodes = [...queue];
    state.operation = `Visit ${node} and explore its neighbors`;
    state.currentStep = step++;
    yield cloneState(state);

    if (node === target) {
      const path = buildPath(parents, start, target, graph);
      yield {
        ...cloneState(state),
        pathNodes: path.pathNodes,
        pathEdgeIds: path.pathEdgeIds,
        operation: `Target ${target} reached with BFS`,
        currentStep: step++,
        completed: true
      };
      return;
    }

    for (const neighbor of getNeighbors(graph, node)) {
      state.activeEdgeIds = [neighbor.edgeId];
      state.operation = `Inspect edge ${neighbor.edgeId} toward ${neighbor.nodeId}`;
      state.currentStep = step++;
      yield cloneState(state);

      if (!visited.has(neighbor.nodeId)) {
        visited.add(neighbor.nodeId);
        parents[neighbor.nodeId] = node;
        queue.push(neighbor.nodeId);
        state.frontierNodes = [...queue];
        state.queue = [...queue];
        state.operation = `Discovered ${neighbor.nodeId}, add it to the BFS queue`;
        state.currentStep = step++;
        yield cloneState(state);
      }
    }
  }

  yield { ...cloneState(state), operation: `BFS finished without reaching ${target}`, currentStep: step++, completed: true };
}

export function* dfs(graph = sampleGraph, start = 'A', target = 'F') {
  const state = baseGraphState(graph);
  const stack = [start];
  const visited = new Set();
  const parents = { [start]: null };
  let step = 0;

  yield { ...cloneState(state), stack: [...stack], frontierNodes: [...stack], operation: `Initialize DFS from ${start}`, currentStep: step++ };

  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) {
      continue;
    }

    visited.add(node);
    state.activeNode = node;
    state.visitedNodes = [...visited];
    state.stack = [...stack];
    state.frontierNodes = [...stack];
    state.operation = `Visit ${node} from the top of the DFS stack`;
    state.currentStep = step++;
    yield cloneState(state);

    if (node === target) {
      const path = buildPath(parents, start, target, graph);
      yield {
        ...cloneState(state),
        pathNodes: path.pathNodes,
        pathEdgeIds: path.pathEdgeIds,
        operation: `Target ${target} reached with DFS`,
        currentStep: step++,
        completed: true
      };
      return;
    }

    const neighbors = getNeighbors(graph, node).reverse();
    for (const neighbor of neighbors) {
      state.activeEdgeIds = [neighbor.edgeId];
      state.operation = `Inspect edge ${neighbor.edgeId} toward ${neighbor.nodeId}`;
      state.currentStep = step++;
      yield cloneState(state);

      if (!visited.has(neighbor.nodeId)) {
        if (!(neighbor.nodeId in parents)) {
          parents[neighbor.nodeId] = node;
        }
        stack.push(neighbor.nodeId);
        state.stack = [...stack];
        state.frontierNodes = [...stack];
        state.operation = `Push ${neighbor.nodeId} onto the DFS stack`;
        state.currentStep = step++;
        yield cloneState(state);
      }
    }
  }

  yield { ...cloneState(state), operation: `DFS finished without reaching ${target}`, currentStep: step++, completed: true };
}

export function* dijkstra(graph = sampleGraph, start = 'A', target = 'F') {
  const state = baseGraphState(graph);
  const distances = Object.fromEntries(graph.nodes.map((node) => [node.id, Infinity]));
  const parents = {};
  const visited = new Set();
  distances[start] = 0;
  let step = 0;

  yield { ...cloneState(state), distances, operation: `Initialize Dijkstra from ${start}`, currentStep: step++ };

  while (visited.size < graph.nodes.length) {
    const current = graph.nodes
      .map((node) => node.id)
      .filter((nodeId) => !visited.has(nodeId))
      .reduce((best, nodeId) => (best === null || distances[nodeId] < distances[best] ? nodeId : best), null);

    if (current === null || distances[current] === Infinity) {
      break;
    }

    visited.add(current);
    state.activeNode = current;
    state.visitedNodes = [...visited];
    state.distances = { ...distances };
    state.operation = `Finalize shortest distance for ${current}`;
    state.currentStep = step++;
    yield cloneState(state);

    if (current === target) {
      const path = buildPath(parents, start, target, graph);
      yield {
        ...cloneState(state),
        pathNodes: path.pathNodes,
        pathEdgeIds: path.pathEdgeIds,
        operation: `Shortest path to ${target} found with cost ${distances[target]}`,
        currentStep: step++,
        completed: true
      };
      return;
    }

    for (const neighbor of getNeighbors(graph, current)) {
      if (visited.has(neighbor.nodeId)) {
        continue;
      }
      state.activeEdgeIds = [neighbor.edgeId];
      state.operation = `Relax edge ${neighbor.edgeId}`;
      state.currentStep = step++;
      yield cloneState(state);

      const candidate = distances[current] + neighbor.weight;
      if (candidate < distances[neighbor.nodeId]) {
        distances[neighbor.nodeId] = candidate;
        parents[neighbor.nodeId] = current;
        state.distances = { ...distances };
        state.operation = `Update distance of ${neighbor.nodeId} to ${candidate}`;
        state.currentStep = step++;
        yield cloneState(state);
      }
    }
  }

  yield { ...cloneState(state), distances: { ...distances }, operation: `No route from ${start} to ${target}`, currentStep: step++, completed: true };
}

export function* aStar(graph = sampleGraph, start = 'A', target = 'F') {
  const state = baseGraphState(graph);
  const nodeMap = Object.fromEntries(graph.nodes.map((node) => [node.id, node]));
  const heuristic = Object.fromEntries(graph.nodes.map((node) => [node.id, euclidean(node, nodeMap[target])]));
  const gScore = Object.fromEntries(graph.nodes.map((node) => [node.id, Infinity]));
  const fScore = Object.fromEntries(graph.nodes.map((node) => [node.id, Infinity]));
  const parents = { [start]: null };
  const open = new Set([start]);
  const closed = new Set();
  let step = 0;

  gScore[start] = 0;
  fScore[start] = heuristic[start];

  yield {
    ...cloneState(state),
    frontierNodes: [...open],
    distances: { ...gScore },
    heuristic,
    operation: `Initialize A* from ${start} to ${target}`,
    currentStep: step++
  };

  while (open.size) {
    const current = [...open].reduce((best, nodeId) => (best === null || fScore[nodeId] < fScore[best] ? nodeId : best), null);

    open.delete(current);
    closed.add(current);
    state.activeNode = current;
    state.visitedNodes = [...closed];
    state.frontierNodes = [...open];
    state.distances = { ...gScore };
    state.heuristic = heuristic;
    state.operation = `Select ${current} as the most promising node`;
    state.currentStep = step++;
    yield cloneState(state);

    if (current === target) {
      const path = buildPath(parents, start, target, graph);
      yield {
        ...cloneState(state),
        pathNodes: path.pathNodes,
        pathEdgeIds: path.pathEdgeIds,
        operation: `A* reached ${target} with path cost ${gScore[target]}`,
        currentStep: step++,
        completed: true
      };
      return;
    }

    for (const neighbor of getNeighbors(graph, current)) {
      if (closed.has(neighbor.nodeId)) {
        continue;
      }

      state.activeEdgeIds = [neighbor.edgeId];
      state.operation = `Evaluate edge ${neighbor.edgeId}`;
      state.currentStep = step++;
      yield cloneState(state);

      const tentative = gScore[current] + neighbor.weight;
      if (tentative < gScore[neighbor.nodeId]) {
        parents[neighbor.nodeId] = current;
        gScore[neighbor.nodeId] = tentative;
        fScore[neighbor.nodeId] = tentative + heuristic[neighbor.nodeId];
        open.add(neighbor.nodeId);
        state.frontierNodes = [...open];
        state.distances = { ...gScore };
        state.operation = `Improve route to ${neighbor.nodeId}; f = ${fScore[neighbor.nodeId]}`;
        state.currentStep = step++;
        yield cloneState(state);
      }
    }
  }

  yield { ...cloneState(state), distances: { ...gScore }, heuristic, operation: `A* could not reach ${target}`, currentStep: step++, completed: true };
}

export function* prim(graph = sampleGraph, start = 'A') {
  const state = baseGraphState(graph);
  const visited = new Set([start]);
  const mstEdgeIds = [];
  let step = 0;

  yield { ...cloneState(state), visitedNodes: [...visited], operation: `Start Prim from ${start}`, currentStep: step++ };

  while (visited.size < graph.nodes.length) {
    const candidates = graph.edges.filter(
      (edge) =>
        (visited.has(edge.source) && !visited.has(edge.target)) ||
        (visited.has(edge.target) && !visited.has(edge.source))
    );

    if (!candidates.length) {
      break;
    }

    const edge = candidates.reduce((best, candidate) => (candidate.weight < best.weight ? candidate : best), candidates[0]);
    const nextNode = visited.has(edge.source) ? edge.target : edge.source;

    state.activeEdgeIds = [edge.id];
    state.operation = `Choose the lightest crossing edge ${edge.id}`;
    state.currentStep = step++;
    yield cloneState(state);

    visited.add(nextNode);
    mstEdgeIds.push(edge.id);
    state.visitedNodes = [...visited];
    state.mstEdgeIds = [...mstEdgeIds];
    state.operation = `Add ${nextNode} to the minimum spanning tree`;
    state.currentStep = step++;
    yield cloneState(state);
  }

  yield {
    ...cloneState(state),
    mstEdgeIds: [...mstEdgeIds],
    visitedNodes: [...visited],
    operation: `Prim completed with ${mstEdgeIds.length} edges in the MST`,
    currentStep: step++,
    completed: true
  };
}

export function* kruskal(graph = sampleGraph) {
  const state = baseGraphState(graph);
  const parent = Object.fromEntries(graph.nodes.map((node) => [node.id, node.id]));
  const rank = Object.fromEntries(graph.nodes.map((node) => [node.id, 0]));
  const mstEdgeIds = [];
  const edges = [...graph.edges].sort((a, b) => a.weight - b.weight);
  let step = 0;

  const find = (value) => {
    if (parent[value] !== value) {
      parent[value] = find(parent[value]);
    }
    return parent[value];
  };

  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) {
      return false;
    }
    if (rank[rootA] < rank[rootB]) {
      parent[rootA] = rootB;
    } else if (rank[rootA] > rank[rootB]) {
      parent[rootB] = rootA;
    } else {
      parent[rootB] = rootA;
      rank[rootA] += 1;
    }
    return true;
  };

  yield { ...cloneState(state), operation: 'Sort all edges by weight', currentStep: step++ };

  for (const edge of edges) {
    state.activeEdgeIds = [edge.id];
    state.operation = `Check whether ${edge.id} creates a cycle`;
    state.currentStep = step++;
    yield cloneState(state);

    if (union(edge.source, edge.target)) {
      mstEdgeIds.push(edge.id);
      state.mstEdgeIds = [...mstEdgeIds];
      state.operation = `Accept edge ${edge.id} into the MST`;
      state.currentStep = step++;
      yield cloneState(state);
    } else {
      state.operation = `Skip ${edge.id} because it would form a cycle`;
      state.currentStep = step++;
      yield cloneState(state);
    }
  }

  yield {
    ...cloneState(state),
    mstEdgeIds: [...mstEdgeIds],
    operation: `Kruskal completed with ${mstEdgeIds.length} edges in the MST`,
    currentStep: step++,
    completed: true
  };
}

export const graphPseudocode = {
  bfs: {
    javascript: [
      'function bfs(graph, start) {',
      '  const queue = [start];',
      '  const visited = new Set([start]);',
      '  while (queue.length) {',
      '    const node = queue.shift();',
      '    for (const neighbor of graph[node]) {',
      '      if (!visited.has(neighbor)) {',
      '        visited.add(neighbor);',
      '        queue.push(neighbor);',
      '      }',
      '    }',
      '  }',
      '}'
    ],
    python: [
      'def bfs(graph, start):',
      '    queue = [start]',
      '    visited = {start}',
      '    while queue:',
      '        node = queue.pop(0)',
      '        for neighbor in graph[node]:',
      '            if neighbor not in visited:',
      '                visited.add(neighbor)',
      '                queue.append(neighbor)'
    ]
  },
  dfs: {
    javascript: [
      'function dfs(graph, start) {',
      '  const stack = [start];',
      '  const visited = new Set();',
      '  while (stack.length) {',
      '    const node = stack.pop();',
      '    if (visited.has(node)) continue;',
      '    visited.add(node);',
      '    for (const neighbor of graph[node]) {',
      '      stack.push(neighbor);',
      '    }',
      '  }',
      '}'
    ],
    python: [
      'def dfs(graph, start):',
      '    stack = [start]',
      '    visited = set()',
      '    while stack:',
      '        node = stack.pop()',
      '        if node in visited:',
      '            continue',
      '        visited.add(node)',
      '        for neighbor in graph[node]:',
      '            stack.append(neighbor)'
    ]
  },
  dijkstra: {
    javascript: [
      'function dijkstra(graph, start) {',
      '  const dist = initInfinity(graph);',
      '  dist[start] = 0;',
      '  while (hasUnvisitedNodes()) {',
      '    const node = smallestUnvisited(dist);',
      '    for (const edge of graph[node]) {',
      '      dist[edge.to] = Math.min(dist[edge.to], dist[node] + edge.weight);',
      '    }',
      '  }',
      '}'
    ],
    python: [
      'def dijkstra(graph, start):',
      '    dist = {node: float("inf") for node in graph}',
      '    dist[start] = 0',
      '    while has_unvisited_nodes():',
      '        node = smallest_unvisited(dist)',
      '        for edge in graph[node]:',
      '            dist[edge.to] = min(dist[edge.to], dist[node] + edge.weight)'
    ]
  },
  aStar: {
    javascript: [
      'function aStar(graph, start, goal) {',
      '  const open = new Set([start]);',
      '  while (open.size) {',
      '    const node = bestEstimatedNode(open);',
      '    if (node === goal) return reconstructPath();',
      '    for (const edge of graph[node]) {',
      '      relaxWithHeuristic(edge);',
      '    }',
      '  }',
      '}'
    ],
    python: [
      'def a_star(graph, start, goal):',
      '    open_set = {start}',
      '    while open_set:',
      '        node = best_estimated_node(open_set)',
      '        if node == goal:',
      '            return reconstruct_path()',
      '        for edge in graph[node]:',
      '            relax_with_heuristic(edge)'
    ]
  },
  prim: {
    javascript: [
      'function prim(graph, start) {',
      '  const visited = new Set([start]);',
      '  while (visited.size < graph.size) {',
      '    const edge = lightestCrossingEdge(visited);',
      '    addEdgeToMST(edge);',
      '    visited.add(nextNode(edge));',
      '  }',
      '}'
    ],
    python: [
      'def prim(graph, start):',
      '    visited = {start}',
      '    while len(visited) < len(graph):',
      '        edge = lightest_crossing_edge(visited)',
      '        add_edge_to_mst(edge)',
      '        visited.add(next_node(edge))'
    ]
  },
  kruskal: {
    javascript: [
      'function kruskal(edges) {',
      '  edges.sort((a, b) => a.weight - b.weight);',
      '  for (const edge of edges) {',
      '    if (!formsCycle(edge)) {',
      '      addEdgeToMST(edge);',
      '      union(edge.source, edge.target);',
      '    }',
      '  }',
      '}'
    ],
    python: [
      'def kruskal(edges):',
      '    edges.sort(key=lambda edge: edge.weight)',
      '    for edge in edges:',
      '        if not forms_cycle(edge):',
      '            add_edge_to_mst(edge)',
      '            union(edge.source, edge.target)'
    ]
  }
};

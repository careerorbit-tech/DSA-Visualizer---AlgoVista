import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './RoadmapCategory.css';

const roadmapCatalog = {
  '/dynamic-programming': {
    title: 'Dynamic Programming',
    intro: 'Optimization and counting problems that benefit from overlapping subproblems and stored partial results.',
    themes: [
      { name: 'Fibonacci DP', note: 'Memoization and tabulation comparison' },
      { name: '0/1 Knapsack', note: 'Capacity-state decision table' },
      { name: 'Longest Common Subsequence', note: 'Grid-based dependency visualization' },
      { name: 'Coin Change', note: 'Counting and minimum-coin variants' },
      { name: 'Longest Increasing Subsequence', note: 'Quadratic and binary-search optimized views' },
      { name: 'Edit Distance', note: 'Character-by-character transform cost matrix' },
    ]
  },
  '/greedy': {
    title: 'Greedy Algorithms',
    intro: 'Algorithms that make the best immediate choice at each step and rely on structural guarantees for correctness.',
    themes: [
      { name: 'Activity Selection', note: 'Earliest finishing interval strategy' },
      { name: 'Fractional Knapsack', note: 'Value density ordering' },
      { name: 'Huffman Coding', note: 'Greedy merging of least frequent nodes' },
      { name: 'Job Sequencing', note: 'Deadline-slot scheduling' },
      { name: 'Minimum Platforms', note: 'Arrival/departure timeline sweep' },
      { name: 'Cash Change Heuristics', note: 'When greedy works and when it breaks' },
    ]
  },
  '/backtracking': {
    title: 'Backtracking',
    intro: 'State-space exploration with branching, undo steps, and pruning to find valid combinations or optimal placements.',
    themes: [
      { name: 'N-Queens', note: 'Board state and diagonal conflicts' },
      { name: 'Sudoku Solver', note: 'Constraint propagation + search' },
      { name: 'Subset Sum', note: 'Include/exclude decision tree' },
      { name: 'Permutations', note: 'Swap and restore branching' },
      { name: 'Rat in a Maze', note: 'Path exploration with dead-end backtracking' },
    ]
  },
  '/string-algorithms': {
    title: 'String Algorithms',
    intro: 'Pattern matching and text-processing techniques built around prefixes, windows, hashes, and automata-style scans.',
    themes: [
      { name: 'KMP', note: 'LPS array and mismatch jumps' },
      { name: 'Z Algorithm', note: 'Prefix window reuse' },
      { name: 'Rabin-Karp', note: 'Rolling hash comparison' },
      { name: 'Trie-based Prefix Search', note: 'Autocomplete-oriented navigation' },
      { name: 'Manacher', note: 'Linear-time palindrome expansion' },
      { name: 'Suffix Array Overview', note: 'Ordered suffix indexing concept view' },
    ]
  }
};

const RoadmapCategory = () => {
  const location = useLocation();
  const current = roadmapCatalog[location.pathname];

  if (!current) {
    return null;
  }

  return (
    <div className="roadmap-page">
      <section className="roadmap-hero">
        <span className="roadmap-badge">Roadmap Category</span>
        <h1>{current.title}</h1>
        <p>{current.intro}</p>
        <Link to="/library" className="roadmap-link">Back to library</Link>
      </section>

      <section className="roadmap-grid">
        {current.themes.map((item) => (
          <article key={item.name} className="roadmap-card">
            <h3>{item.name}</h3>
            <p>{item.note}</p>
            <span>Planned visualization</span>
          </article>
        ))}
      </section>
    </div>
  );
};

export default RoadmapCategory;

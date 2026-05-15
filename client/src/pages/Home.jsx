import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const algorithmCategories = [
  {
    title: 'Sorting Algorithms',
    description: 'Study comparison sorts, counting-based methods, and digit-based pipelines with step-by-step playback.',
    link: '/sorting',
    algorithms: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Shell Sort', 'Counting Sort', 'Radix Sort']
  },
  {
    title: 'Searching Algorithms',
    description: 'Compare direct scans, sorted-array searches, and progressive range-expansion strategies.',
    link: '/searching',
    algorithms: ['Linear Search', 'Binary Search', 'Jump Search', 'Interpolation Search', 'Exponential Search']
  },
  {
    title: 'Tree Structures',
    description: 'Explore ordered trees, heaps, tries, and traversal strategies with live structure-aware visuals.',
    link: '/trees',
    algorithms: ['Binary Search Tree', 'AVL Tree', 'Heap', 'Trie', 'Binary Tree Traversal']
  },
  {
    title: 'Graph Algorithms',
    description: 'Compare traversals, shortest paths, and spanning trees on the same weighted graph.',
    link: '/graphs',
    algorithms: ['BFS', 'DFS', 'Dijkstra', 'A*', "Prim's", "Kruskal's"]
  },
  {
    title: 'Dynamic Programming',
    description: 'Preview the next wave of optimization and counting visualizations built around memoization and tabulation.',
    link: '/dynamic-programming',
    algorithms: ['Knapsack', 'LCS', 'Coin Change', 'LIS', 'Edit Distance', 'Grid DP']
  },
  {
    title: 'Greedy Algorithms',
    description: 'Follow locally optimal decisions in scheduling, encoding, interval, and resource-allocation problems.',
    link: '/greedy',
    algorithms: ['Activity Selection', 'Fractional Knapsack', 'Huffman Coding', 'Job Sequencing', 'Platforms', 'Cash Change']
  },
  {
    title: 'Backtracking',
    description: 'Explore branching decision trees, pruning, and search-state rollback on classic constraint problems.',
    link: '/backtracking',
    algorithms: ['N-Queens', 'Sudoku Solver', 'Subset Sum', 'Permutations', 'Maze Search']
  },
  {
    title: 'String Algorithms',
    description: 'Inspect pattern-matching and text-processing techniques using prefixes, hashes, and linear scans.',
    link: '/string-algorithms',
    algorithms: ['KMP', 'Z Algorithm', 'Rabin-Karp', 'Trie Prefix Search', 'Manacher', 'Suffix Array']
  },
];

const features = [
  {
    title: 'Interactive Playback',
    description: 'Pause, resume, reset, and tune animation speed without losing algorithm state.'
  },
  {
    title: 'Readable Pseudocode',
    description: 'Pair execution with pseudocode so learners can connect the motion to the logic.'
  },
  {
    title: 'Multiple Visualization Modes',
    description: 'Switch between arrays, trees, tries, and graphs without leaving the same design system.'
  },
  {
    title: 'Growing Algorithm Library',
    description: 'Use a broader catalog instead of a tiny showcase, with room for deeper study over time.'
  }
];

const platformStats = [
  { label: 'Live Algorithms', value: '25+' },
  { label: 'Core Categories', value: '8' },
  { label: 'Visualization Modes', value: 'Array, Tree, Trie, Graph' },
];

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-eyebrow">Interactive DSA Studio</div>
          <h1>Professional Algorithm Visualizations for Learning, Practice, and Teaching</h1>
          <p>
            Explore a broader algorithm library with polished controls, live state playback, and consistent visuals across data structures and problem-solving styles.
          </p>
          <div className="hero-buttons">
            <Link to="/library" className="btn btn-primary">
              Open Library
            </Link>
            <a href="#categories" className="btn btn-secondary">
              Browse Categories
            </a>
          </div>
          <div className="hero-stats">
            {platformStats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="categories" className="categories-section">
        <h2>Algorithm Categories</h2>
        <p className="section-description">
          A deeper catalog organized around the way learners actually compare techniques
        </p>

        <div className="categories-grid">
          {algorithmCategories.map((category) => (
            <div key={category.title} className="category-card">
              <h3>{category.title}</h3>
              <p>{category.description}</p>

              <div className="algorithms-list">
                <h4>Included Topics</h4>
                <ul>
                  {category.algorithms.map((algo) => (
                    <li key={algo}>{algo}</li>
                  ))}
                </ul>
              </div>

              <Link to={category.link} className="category-link">
                Explore {category.title}
                <span className="arrow">-&gt;</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section">
        <h2>Why It Feels Better</h2>
        <p className="section-description">
          Built to support real study sessions instead of one-off demos
        </p>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-number">{index + 1}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Build intuition with more depth</h2>
          <p>
            Move beyond a small demo set into a more complete algorithm library with stronger presentation and more room to grow.
          </p>
          <Link to="/library" className="btn btn-primary btn-large">
            Start Exploring
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

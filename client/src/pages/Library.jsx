import React from 'react';
import { Link } from 'react-router-dom';
import './Library.css';

const categories = [
  {
    title: 'Sorting',
    link: '/sorting',
    status: 'Live',
    count: '8 algorithms',
    description: 'Comparison sorts, divide-and-conquer flows, and non-comparison methods.',
  },
  {
    title: 'Searching',
    link: '/searching',
    status: 'Live',
    count: '5 algorithms',
    description: 'Sequential, logarithmic, and adaptive search strategies.',
  },
  {
    title: 'Trees',
    link: '/trees',
    status: 'Live',
    count: '5 structures',
    description: 'BST, AVL, Heap, Trie, and binary traversal views.',
  },
  {
    title: 'Graphs',
    link: '/graphs',
    status: 'Live',
    count: '6 algorithms',
    description: 'Traversal, shortest path, and minimum spanning tree workflows.',
  },
  {
    title: 'Dynamic Programming',
    link: '/dynamic-programming',
    status: 'Roadmap',
    count: '6 planned',
    description: 'Tabulation and memoization patterns for optimization and counting problems.',
  },
  {
    title: 'Greedy',
    link: '/greedy',
    status: 'Roadmap',
    count: '6 planned',
    description: 'Locally optimal choices for scheduling, spanning trees, and interval problems.',
  },
  {
    title: 'Backtracking',
    link: '/backtracking',
    status: 'Roadmap',
    count: '5 planned',
    description: 'Constraint search, branching, pruning, and combinatorial generation.',
  },
  {
    title: 'String Algorithms',
    link: '/string-algorithms',
    status: 'Roadmap',
    count: '6 planned',
    description: 'Pattern matching, prefix tables, rolling hashes, and text processing techniques.',
  }
];

const Library = () => {
  return (
    <div className="library-page">
      <section className="library-hero">
        <div className="library-hero-copy">
          <span className="library-eyebrow">Algorithm Library</span>
          <h1>A larger category system with room to grow</h1>
          <p>
            Browse the full platform by domain. Live sections are ready to explore now, and the roadmap categories show where the library is expanding next.
          </p>
        </div>
      </section>

      <section className="library-grid">
        {categories.map((category) => (
          <Link key={category.title} to={category.link} className="library-card">
            <div className="library-card-top">
              <span className={`library-status ${category.status === 'Live' ? 'live' : 'roadmap'}`}>
                {category.status}
              </span>
              <span className="library-count">{category.count}</span>
            </div>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <span className="library-action">
              {category.status === 'Live' ? 'Open category' : 'View roadmap'}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Library;

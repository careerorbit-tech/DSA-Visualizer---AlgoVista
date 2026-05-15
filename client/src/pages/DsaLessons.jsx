import React from 'react';
import { Link } from 'react-router-dom';
import './LearningPages.css';

const lessonGroups = [
  {
    title: 'Core Foundations',
    lessons: [
      'What data structures solve',
      'Time complexity and Big O intuition',
      'Space complexity in real problems',
      'Recursion vs iteration',
      'When to precompute, sort, or hash'
    ]
  },
  {
    title: 'Sorting Mindset',
    lessons: [
      'Stable vs unstable sorting',
      'Comparison vs non-comparison sorting',
      'How divide and conquer changes performance',
      'When insertion-style methods still win'
    ]
  },
  {
    title: 'Searching Mindset',
    lessons: [
      'Why sorted data changes everything',
      'Linear vs logarithmic search strategies',
      'Bounding a range before binary search',
      'Data distribution and interpolation search'
    ]
  },
  {
    title: 'Trees and Graphs',
    lessons: [
      'Hierarchical thinking with trees',
      'Balancing and structural guarantees',
      'Traversal orders and when they matter',
      'Shortest path vs spanning tree goals'
    ]
  }
];

const DsaLessons = () => {
  return (
    <div className="learning-page">
      <section className="learning-hero">
        <span className="learning-badge">DSA Lessons</span>
        <h1>Learn the ideas before memorizing the algorithms</h1>
        <p>
          Use these lesson tracks to build intuition about why algorithms work, what tradeoffs they make, and how to choose the right tool for a problem.
        </p>
      </section>

      <section className="learning-grid">
        {lessonGroups.map((group) => (
          <article key={group.title} className="learning-card">
            <h3>{group.title}</h3>
            <ul>
              {group.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="learning-callout">
        <div>
          <h2>Best way to study here</h2>
          <p>
            Start with a lesson theme, then open the matching category in the library and compare several visualizations back to back.
          </p>
        </div>
        <Link to="/library" className="learning-button">
          Open Algorithm Library
        </Link>
      </section>
    </div>
  );
};

export default DsaLessons;

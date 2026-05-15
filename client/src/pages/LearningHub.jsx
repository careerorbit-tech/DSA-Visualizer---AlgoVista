import React from 'react';
import './LearningPages.css';

const studyTracks = [
  {
    title: 'Beginner Path',
    steps: [
      'Learn arrays, strings, and basic Big O',
      'Practice linear search and simple sorting',
      'Understand recursion and binary search',
      'Move into trees and graph traversal'
    ]
  },
  {
    title: 'Interview Path',
    steps: [
      'Master pattern recognition',
      'Compare sorting and searching tradeoffs',
      'Use trees, heaps, and tries intentionally',
      'Study graph shortest path and greedy choices'
    ]
  },
  {
    title: 'Problem Solving Path',
    steps: [
      'Read constraints first',
      'Choose structure before coding',
      'Trace manually with small examples',
      'Optimize only after correctness is clear'
    ]
  }
];

const habits = [
  'Trace each algorithm with 5 to 8 elements before scaling up.',
  'Say out loud what the invariant is at every step.',
  'Compare two algorithms on the same input to see the real tradeoff.',
  'Use the pseudocode panel to connect the motion to the control flow.',
  'After watching a visualization, explain it without looking at the screen.'
];

const LearningHub = () => {
  return (
    <div className="learning-page">
      <section className="learning-hero">
        <span className="learning-badge">Study Guide</span>
        <h1>Use the platform like a coach, not just a gallery</h1>
        <p>
          These study tracks and habits help turn the visualizations into actual DSA understanding, especially if you are preparing for exams or interviews.
        </p>
      </section>

      <section className="learning-grid">
        {studyTracks.map((track) => (
          <article key={track.title} className="learning-card">
            <h3>{track.title}</h3>
            <ol className="learning-list ordered">
              {track.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </section>

      <section className="learning-wide-card">
        <h2>High-value study habits</h2>
        <ul className="learning-list">
          {habits.map((habit) => (
            <li key={habit}>{habit}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default LearningHub;

import React from 'react';
import './LearningPages.css';

const principles = [
  {
    title: 'Clarity First',
    text: 'We want learners to understand why an algorithm works, not only what buttons to click.'
  },
  {
    title: 'Visual + Conceptual',
    text: 'Each visualization should connect motion, state, and pseudocode so the learning sticks.'
  },
  {
    title: 'Growth Ready',
    text: 'The platform is being shaped as a larger DSA learning library with more categories and more structured lessons.'
  }
];

const AboutUs = () => {
  return (
    <div className="learning-page">
      <section className="learning-hero">
        <span className="learning-badge">About Us</span>
        <h1>Built to make DSA feel understandable</h1>
        <p>
          AlgoVista is focused on helping students and developers learn data structures and algorithms through cleaner visuals, guided comparison, and better learning flow.
        </p>
      </section>

      <section className="learning-grid">
        {principles.map((item) => (
          <article key={item.title} className="learning-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="learning-wide-card">
        <h2>What this platform is trying to become</h2>
        <p>
          A professional DSA learning workspace with algorithm visualizations, lesson tracks, roadmap categories, and study guidance that supports beginners as well as interview preparation.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;

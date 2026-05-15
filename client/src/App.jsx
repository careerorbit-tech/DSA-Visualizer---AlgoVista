// client/src/App.jsx (updated with all routes)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Library from './pages/Library';
import DsaLessons from './pages/DsaLessons';
import LearningHub from './pages/LearningHub';
import AboutUs from './pages/AboutUs';
import Sorting from './pages/Sorting';
import Searching from './pages/Searching';
import Graphs from './pages/Graphs';
import AlgorithmView from './pages/AlgorithmView';
import GraphAlgorithmView from './pages/GraphAlgorithmView';
import RoadmapCategory from './pages/RoadmapCategory';

import Trees from './pages/Trees';
import TreeAlgorithmView from './pages/TreeAlgorithmView';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/lessons" element={<DsaLessons />} />
            <Route path="/study-guide" element={<LearningHub />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/searching" element={<Searching />} />
            <Route path="/trees" element={<Trees />} />
            <Route path="/graphs" element={<Graphs />} />
            <Route path="/dynamic-programming" element={<RoadmapCategory />} />
            <Route path="/greedy" element={<RoadmapCategory />} />
            <Route path="/backtracking" element={<RoadmapCategory />} />
            <Route path="/string-algorithms" element={<RoadmapCategory />} />
            <Route path="/algorithm/:category/:name" element={<AlgorithmView />} />
            <Route path="/algorithm/trees/:name" element={<TreeAlgorithmView />} />
            <Route path="/algorithm/graphs/:name" element={<GraphAlgorithmView />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

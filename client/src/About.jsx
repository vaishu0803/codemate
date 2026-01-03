import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Cpu, Terminal, ArrowLeft } from 'lucide-react';
import './App.css'; // Re-use styles

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container about-page">
      <nav className="navbar">
        <div className="nav-left">
          <div className="logo-box" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <Code2 size={28} className="logo-icon" />
            <span className="logo-text">CODEMATE</span>
          </div>
        </div>
        <div className="nav-right">
          <button className="nav-btn" onClick={() => navigate('/')}>
             <ArrowLeft size={16} style={{marginRight: '5px'}}/> Back to Home
          </button>
        </div>
      </nav>

      <div className="about-content">
        <div className="about-card">
          <h1>About CodeMate</h1>
          <p className="about-description">
            CodeMate is an AI-powered assistant designed for developers and competitive programmers. 
            It helps you understand, debug, and optimize code instantly using advanced LLMs.
          </p>

          <div className="features-grid">
            <div className="feature-item">
              <Code2 size={24} />
              <span>Code Explanation</span>
            </div>
            <div className="feature-item">
              <Cpu size={24} />
              <span>Logic Optimization</span>
            </div>
            <div className="feature-item">
              <Terminal size={24} />
              <span>Test Case Generation</span>
            </div>
          </div>

          <div className="instructions-section">
            <h2>🚀 How to Run Locally</h2>
            <div className="step">
              <span className="step-num">1</span>
              <div className="step-text">
                <strong>Start Backend</strong>
                <pre>cd server && npm start</pre>
              </div>
            </div>
            <div className="step">
              <span className="step-num">2</span>
              <div className="step-text">
                <strong>Start Frontend</strong>
                <pre>cd client && npm run dev</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
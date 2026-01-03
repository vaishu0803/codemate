import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, FileCode, ChevronRight, Code2 } from 'lucide-react';
import './App.css';

const RecentViews = () => {
  const navigate = useNavigate();

  // Placeholder data - in a real app, this would come from localStorage or Backend
  const mockHistory = [
    { id: 1, title: "Two Sum Optimization", lang: "Python", date: "2 mins ago" },
    { id: 2, title: "Binary Tree Traversal Explanation", lang: "Java", date: "1 hour ago" },
    { id: 3, title: "Merge Sort Test Cases", lang: "C++", date: "Yesterday" },
    { id: 4, title: "React useEffect Debugging", lang: "JavaScript", date: "2 days ago" },
  ];

  return (
    <div className="app-container about-page">
      <nav className="navbar">
        <div className="nav-container">
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
        </div>
      </nav>

      <div className="about-content">
        <div className="about-card">
          <div className="recent-header">
            <Clock size={32} className="logo-icon" />
            <h1>Recent Activity</h1>
          </div>
          
          <div className="history-list">
            {mockHistory.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-left">
                  <div className="history-icon">
                    <FileCode size={20} />
                  </div>
                  <div className="history-details">
                    <h3>{item.title}</h3>
                    <span className="history-meta">{item.lang} • {item.date}</span>
                  </div>
                </div>
                <button className="history-action">
                  <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentViews;
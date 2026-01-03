import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { 
  Code2, 
  UploadCloud, 
  Link as LinkIcon, 
  FileText, 
  Cpu, 
  Bug, 
  Maximize2, 
  Minimize2, 
  PlayCircle,
  BookOpen,
  Loader2,
  Clock // Icon for Recent Views
} from "lucide-react";
import About from "./About";
import RecentViews from "./RecentViews"; // Ensure this file exists
import "./App.css";

const API_BASE = "http://localhost:5000/api/ai";

const Home = () => {
  const [inputType, setInputType] = useState("paste");
  const [codeContent, setCodeContent] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [fileName, setFileName] = useState("");
  const [language, setLanguage] = useState("Python");
  
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setCodeContent(e.target.result);
      reader.readAsText(file);
    }
  };

  const handleFeature = async (feature) => {
    if (!codeContent.trim()) {
      alert("Please provide some code first!");
      return;
    }

    setIsLoading(true);
    setOutput("");

    try {
      let endpoint = "generate";
      const contextPrefix = `Programming Language: ${language}.\n`;
      let payload = { model: "gemini-1.5-flash" };

      switch (feature) {
        case "explain":
          endpoint = "explain";
          payload.code = contextPrefix + codeContent;
          break;
        case "optimize":
          endpoint = "optimize";
          payload.code = contextPrefix + codeContent;
          break;
        case "testcase":
          endpoint = "testcase";
          payload.code = contextPrefix + codeContent;
          break;
        case "solution":
          endpoint = "generate";
          payload.prompt = `
            ${contextPrefix}
            Analyze the following problem/code.
            Provide a **Brute Force Solution** following this strict format:
            
            # Brute Force Approach
            **AI Summarization:** [Brief summary]
            **Steps:** [List of steps]
            **Code:** [Code block in ${language}]
            **Complexity:** [Time & Space Complexity]
            **YouTube Link:** [Relevant link or N/A]

            Here is the code/problem:
            ${codeContent}
          `;
          break;
        default:
          break;
      }

      const res = await axios.post(`${API_BASE}/${endpoint}`, payload);
      const resultText = res.data.result || res.data.response || JSON.stringify(res.data, null, 2);
      setOutput(resultText);

    } catch (err) {
      console.error(err);
      setOutput("Error processing request. Please check backend connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`app-container ${isMaximized ? "maximized-view" : ""}`}>
      
      {/* --- Navigation Bar --- */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-left">
            <div className="logo-box">
              <Code2 size={28} className="logo-icon" />
              <span className="logo-text">CODEMATE</span>
            </div>
          </div>
          
          <div className="nav-right">
            <button className="nav-btn active">Home</button>
            {/* Recent Views Button */}
            <button className="nav-btn" onClick={() => navigate('/recent')}>
               Recent Views
            </button>
            <button className="nav-btn" onClick={() => navigate('/about')}>About</button>
          </div>
        </div>
      </nav>

      <div className="main-layout">
        
        {/* --- Top Panel: Input --- */}
        {!isMaximized && (
          <section className="input-panel">
            <div className="panel-header center-layout">
              {/* Centered Controls Container */}
              <div className="header-controls-center">
                <div className="input-mode-selector">
                  <button 
                    className={inputType === 'paste' ? 'active' : ''} 
                    onClick={() => setInputType('paste')}
                  >
                    <FileText size={16} /> Paste
                  </button>
                  <button 
                    className={inputType === 'file' ? 'active' : ''} 
                    onClick={() => setInputType('file')}
                  >
                    <UploadCloud size={16} /> File
                  </button>
                  <button 
                    className={inputType === 'link' ? 'active' : ''} 
                    onClick={() => setInputType('link')}
                  >
                    <LinkIcon size={16} /> Link
                  </button>
                </div>

                <div className="lang-select-wrapper">
                  <select 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                    className="lang-select"
                  >
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                    <option value="JavaScript">JavaScript</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-area">
              {inputType === "paste" && (
                <textarea
                  className="main-textarea"
                  placeholder={`// Paste your ${language} code or problem description here...`}
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  spellCheck="false"
                />
              )}

              {inputType === "file" && (
                <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    hidden 
                    onChange={handleFileUpload} 
                  />
                  <UploadCloud size={48} className="upload-icon" />
                  <p>Click to upload a system file</p>
                  {fileName && <span className="file-tag">{fileName}</span>}
                </div>
              )}

              {inputType === "link" && (
                <div className="link-zone">
                  <div className="link-input-wrapper">
                    <LinkIcon size={20} />
                    <input 
                      type="text" 
                      placeholder="Paste GitHub, Pastebin, or Problem URL..." 
                      onChange={(e) => setCodeContent(`Source URL: ${e.target.value}`)}
                    />
                  </div>
                  <p className="hint-text">Enter a valid URL to fetch code context.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* --- Middle Panel: Features Control --- */}
        {!isMaximized && (
          <section className="features-bar">
            <div className="feature-btn-group">
              <button className="feature-btn" onClick={() => handleFeature('explain')}>
                <BookOpen size={18} /> Explain
              </button>
              
              <button className="feature-btn" onClick={() => handleFeature('optimize')}>
                <Cpu size={18} /> Optimize
              </button>
              
              <button className="feature-btn" onClick={() => handleFeature('testcase')}>
                <Bug size={18} /> Test Cases
              </button>

              <button className="feature-btn special" onClick={() => handleFeature('solution')}>
                <PlayCircle size={18} /> Brute Force
              </button>
            </div>
          </section>
        )}

        {/* --- Bottom Panel: Results --- */}
        <section className={`output-panel ${isMaximized ? "full-screen" : ""}`}>
          <div className="panel-header output-header">
            <h3>Result Console</h3>
            <button 
              className="icon-btn" 
              onClick={() => setIsMaximized(!isMaximized)}
              title={isMaximized ? "Minimize" : "Maximize"}
            >
              {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
          </div>

          <div className="output-content">
            {isLoading ? (
              <div className="loader-container">
                <Loader2 className="spinner" size={40} />
                <p>Analyzing and Generating in {language}...</p>
              </div>
            ) : output ? (
              <div className="markdown-wrapper"> 
                <ReactMarkdown
                  children={output}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                />
              </div>
            ) : (
              <div className="empty-placeholder">
                <div className="placeholder-content">
                  <Code2 size={48} className="placeholder-icon"/>
                  <p>Select an action to generate results</p>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recent" element={<RecentViews />} />
      </Routes>
    </Router>
  );
}

export default App;
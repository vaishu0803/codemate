import { useState, useRef } from "react";
import {
  UploadCloud,
  Link as LinkIcon,
  BookOpen,
  Cpu,
  Bug,
  PlayCircle,
} from "lucide-react";
import ResultPanel from "../components/Resultpanel";
import { processAI } from "../services/aiService";

const Home = () => {
  const [inputType, setInputType] = useState("paste");
  const [codeContent, setCodeContent] = useState("");
  const [language, setLanguage] = useState("JavaScript");

  const [results, setResults] = useState({});
  const [activeTab, setActiveTab] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const fileRef = useRef(null);

  // 🔁 Reset result panel to initial state
  const resetResults = () => {
    setResults({});
    setActiveTab(null);
  };

  const handleAction = async (action) => {
    if (!codeContent.trim()) {
      alert("Provide some input first");
      return;
    }

    setIsLoading(true);

    try {
    const result = await processAI({
  action,
  code: codeContent,   // ✅ CORRECT
  language,
});


      setResults((prev) => ({
        ...prev,
        [action]: result,
      }));

      setActiveTab(action);
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [action]: "Server error while processing request",
      }));
      setActiveTab(action);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4">
      <div className="w-full max-w-4xl mt-10">

        {/* Input Card */}
        <div className="bg-white rounded-xl shadow p-4">
          
          {/* Input Type Switch */}
          <div className="flex justify-between mb-3">
            <div className="flex gap-2">
              {["paste", "file", "link"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setInputType(type);
                    setCodeContent("");
                    resetResults();
                  }}
                  className={`px-3 py-1 rounded text-sm ${
                    inputType === type
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option>JavaScript</option>
              <option>Java</option>
              <option>Python</option>
              <option>C++</option>
            </select>
          </div>

          {/* Paste Input */}
          {inputType === "paste" && (
            <textarea
              className="w-full h-40 border rounded p-3 text-sm font-mono"
              placeholder={`// Paste your ${language} code or problem description here...`}
              value={codeContent}
              onChange={(e) => {
                const value = e.target.value;
                setCodeContent(value);
                if (!value.trim()) resetResults();
              }}
            />
          )}

          {/* File Upload */}
          {inputType === "file" && (
            <div
              onClick={() => fileRef.current.click()}
              className="h-40 flex flex-col justify-center items-center border border-dashed rounded cursor-pointer text-gray-500"
            >
              <UploadCloud />
              <p>Click to upload file</p>
              <input
                ref={fileRef}
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    setCodeContent("");
                    resetResults();
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => setCodeContent(reader.result || "");
                  reader.readAsText(file);
                }}
              />
            </div>
          )}

          {/* Link Input */}
          {inputType === "link" && (
            <div className="flex items-center gap-2 border rounded p-3">
              <LinkIcon size={18} />
              <input
                className="flex-1 outline-none text-sm"
                placeholder="Paste GitHub / LeetCode link"
                value={codeContent}
                onChange={(e) => {
                  const value = e.target.value;
                  setCodeContent(value);
                  if (!value.trim()) resetResults();
                }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <button onClick={() => handleAction("explain")} className="action-btn">
            <BookOpen size={16} /> Explain
          </button>
          <button onClick={() => handleAction("optimize")} className="action-btn">
            <Cpu size={16} /> Optimize
          </button>
          <button onClick={() => handleAction("testcase")} className="action-btn">
            <Bug size={16} /> Test Cases
          </button>
          <button
            onClick={() => handleAction("generate")}
            className="action-btn bg-black text-white"
          >
            <PlayCircle size={16} /> Brute Force
          </button>
        </div>

        {/* Result Panel */}
        <ResultPanel
          results={results}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isLoading={isLoading}
          isMaximized={isMaximized}
          setIsMaximized={setIsMaximized}
        />
      </div>
    </div>
  );
};

export default Home;

import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Code2 } from "lucide-react";

const RecentViews = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-400 mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Recent Views</h1>

      <div className="space-y-3">
        <div className="p-4 bg-slate-900 border border-slate-700 rounded">
          <div className="flex items-center gap-2">
            <Code2 size={16} />
            <span>Longest Substring Without Repeating Characters</span>
          </div>
          <div className="text-sm text-slate-400 flex items-center gap-1 mt-1">
            <Clock size={14} /> 2 hours ago
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentViews;

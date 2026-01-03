import { Maximize2, Minimize2 } from "lucide-react";

const ResultPanel = ({
  results,
  activeTab,
  setActiveTab,
  isLoading,
  isMaximized,
  setIsMaximized,
}) => {
  const data = activeTab ? results[activeTab] : null;

  return (
    <section
      className={`w-full max-w-4xl mx-auto mt-6 ${
        isMaximized ? "fixed inset-0 z-50 bg-white p-6" : ""
      }`}
    >
      <div className="border rounded-xl shadow-sm bg-white h-full">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <h3 className="font-semibold text-gray-800">RESULT CONSOLE</h3>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 rounded hover:bg-gray-100"
          >
            {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>

        {/* Tabs */}
        {Object.keys(results).length > 0 && (
          <div className="flex gap-2 border-b px-4 py-2 flex-wrap">
            {Object.keys(results).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-3 py-1 text-sm rounded transition ${
                  activeTab === key
                    ? "bg-black text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {key.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="min-h-[200px] p-6 text-sm text-gray-700 overflow-y-auto">
          {isLoading ? (
            <div className="text-center text-gray-500">Processing...</div>
          ) : data ? (
            <div className="space-y-6">

              <div>
                <h4 className="font-semibold mb-1">Overview</h4>
                <p>{data.overview}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Key Steps</h4>
                <ul className="list-disc pl-5">
                  {data.keySteps?.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Time Complexity</h4>
                <p>{data.timeComplexity}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Space Complexity</h4>
                <p>{data.spaceComplexity}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-1">Edge Cases</h4>
                {data.edgeCases?.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {data.edgeCases.map((edge, i) => (
                      <li key={i}>{edge}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">None</p>
                )}
              </div>

            </div>
          ) : (
            <div className="text-center text-gray-400">
              Select an action to generate results
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResultPanel;

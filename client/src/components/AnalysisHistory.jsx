import React from 'react';

function AnalysisHistory({ analyses, onSelectAnalysis }) {
  return (
    <div className="space-y-2">
      {analyses.length > 0 ? (
        analyses.map((analysis) => (
          <div 
            key={analysis._id} 
            className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition"
            onClick={() => onSelectAnalysis(analysis)}
          >
            <p className="font-medium text-sm truncate">{analysis.text || 'Image analysis'}</p>
            <p className="text-xs text-gray-600">{new Date(analysis.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">No history</p>
        </div>
      )}
    </div>
  );
}

export default AnalysisHistory;

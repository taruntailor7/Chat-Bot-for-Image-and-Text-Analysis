// AnalysisForm.js
import React, { useState, useEffect } from 'react';

function AnalysisForm({ handleSubmit, handleFileChange, setText, text, loading, error, fileInputRef }) {
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files[0];
      setFileName(file ? file.name : '');
    }
  }, [fileInputRef]);

  const onFileChange = (event) => {
    handleFileChange(event);
    const file = event.target.files[0];
    setFileName(file ? file.name : '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center">
          <label htmlFor="file-upload" className="flex-shrink-0 cursor-pointer px-4 py-2 border border-gray-300 rounded-l-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Choose File
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            ref={fileInputRef}
            className="sr-only"
          />
          <span className="flex-grow px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 truncate">
            {fileName || 'No file chosen'}
          </span>
        </div>
        <div className="flex space-x-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-grow rounded-md shadow-sm focus:ring-0 focus:border-transparent border-gray-300 focus:outline-none"
            placeholder="Ask a question about the image..."
          />
          <button
            type="submit"
            disabled={loading}
            className="flex-shrink-0 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2">
          {error}
        </div>
      )}
    </form>
  );
}

export default AnalysisForm;
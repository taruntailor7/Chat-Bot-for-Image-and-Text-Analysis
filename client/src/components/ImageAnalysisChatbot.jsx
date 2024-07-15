// ImageAnalysisChatbot.js
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatInterface from './ChatInterface';
import AnalysisForm from './AnalysisForm';
import AnalysisHistory from './AnalysisHistory';

function ImageAnalysisChatbot() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tempError, setTempError] = useState('');
  const [analyses, setAnalyses] = useState([]);
  const fileInputRef = useRef();

  useEffect(() => {
    fetchAnalyses();
  }, []);

  useEffect(() => {
    if (tempError) {
      const timer = setTimeout(() => {
        setTempError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [tempError]);

  const fetchAnalyses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analyses');
      setAnalyses(response.data);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      const changeEvent = new Event('change', { bubbles: true });
      fileInputRef.current.dispatchEvent(changeEvent);
    }
    setFile(null);
  };

  const validateFileSize = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setTempError('File is too large. Maximum size is 5MB.');
      clearFileInput();
      return false;
    }
    return true;
  };


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && validateFileSize(selectedFile)) {
      setFile(selectedFile);
      setTempError('');
    } else {
      clearFileInput();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTempError('');

    if (!file) {
      setTempError('Please select an image.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('text', text);

    try {
      const response = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setConversation([...conversation, { type: 'user', content: text }, { type: 'bot', content: response.data.analysis }]);
      setText('');
      clearFileInput();
      fetchAnalyses();
    } catch (error) {
      console.error('Error in analysing image:', error);
      let errorMessage = 'An error occurred. Please try again.';
      if (error.response && error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error;
      }
      setTempError(errorMessage);
      clearFileInput();
    }

    setLoading(false);
  };

  const handleSelectAnalysis = (analysis) => {
    setConversation([
      { type: 'user', content: analysis.text || 'Image analysis' },
      { type: 'bot', content: analysis.analysis }
    ]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">History</h2>
          <AnalysisHistory analyses={analyses} onSelectAnalysis={handleSelectAnalysis} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 flex flex-col overflow-hidden bg-gray-200">
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Chat Bot for Image and Text Analysis</h1>
          </div>
          
          {/* Conversation area */}
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl mx-auto">
              <ChatInterface conversation={conversation} />
            </div>
          </div>
          
          {/* Fixed form at the bottom */}
          <div className="bg-white shadow-lg">
            <div className="max-w-3xl mx-auto p-6">
              <AnalysisForm
                handleSubmit={handleSubmit}
                handleFileChange={handleFileChange}
                setText={setText}
                text={text}
                loading={loading}
                error={tempError}
                fileInputRef={fileInputRef}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ImageAnalysisChatbot;
import React, { useState } from 'react';
import axios from 'axios';

const VivaPractice = () => {
  const [file, setFile] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [question, setQuestion] = useState('');
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('difficulty', difficulty);

    // Upload the PDF and get the first question
    const response = await axios.post('/api/viva', formData);
    setQuestion(response.data.question);
  };

  const startRecording = () => {
    // Implement recording logic (placeholder)
    setRecording(true);
    // After recording, transcribe and send for evaluation
    handleRecordingComplete('Student answer recording');
  };

  const handleRecordingComplete = async (recordedText) => {
    setTranscription(recordedText);
    // Send transcription for evaluation
    const response = await axios.post('/api/evaluate', { answer: recordedText });
    setEvaluation(response.data.evaluationScore);
    setCorrectAnswer(response.data.correctAnswer);
    setRecording(false);
    setQuestion(''); // Clear the question after answering
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Viva Practice</h1>

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload PDF</label>
          <input 
            type="file" 
            accept=".pdf"
            onChange={handleFileChange} 
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Difficulty</label>
          <select 
            value={difficulty} 
            onChange={handleDifficultyChange} 
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button 
          onClick={handleSubmit} 
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
        >
          Submit
        </button>

        {question && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Question:</h2>
            <p className="bg-gray-100 p-4 rounded-md">{question}</p>

            <div className="flex items-center mt-4">
              <button 
                onClick={startRecording} 
                className={`bg-green-600 text-white font-semibold py-2 px-4 rounded-md ${recording ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-500 transition duration-300'}`}
                disabled={recording}
              >
                {recording ? 'Recording...' : 'Start Recording'}
              </button>
            </div>
          </div>
        )}

        {transcription && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Transcription:</h2>
            <p className="bg-gray-100 p-4 rounded-md">{transcription}</p>
          </div>
        )}

        {evaluation && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Evaluation Score:</h2>
            <p className="bg-gray-100 p-4 rounded-md">{evaluation}</p>
            <h2 className="text-lg font-semibold mt-4 mb-2">Correct Answer:</h2>
            <p className="bg-gray-100 p-4 rounded-md">{correctAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VivaPractice;

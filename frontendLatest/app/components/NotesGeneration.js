import React, { useState } from 'react';
import axios from 'axios';

const NotesGeneration = () => {
    const [files, setFiles] = useState([]);
    const [youtubeLink, setYoutubeLink] = useState('');
    const [subject, setSubject] = useState('');
    const [questionsAnswers, setQuestionsAnswers] = useState(null);
    const [isFileUpload, setIsFileUpload] = useState(true); // State to toggle between file upload and YouTube link

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
        setYoutubeLink(''); // Clear YouTube link when files are selected
    };

    const handleYoutubeChange = (e) => {
        setYoutubeLink(e.target.value);
        setFiles([]); // Clear files when YouTube link is entered
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleSubmit = async () => {
        if ((files.length === 0 && !youtubeLink) || !subject) return;

        const formData = new FormData();
        if (isFileUpload) {
            files.forEach((file) => {
                formData.append('pdf_paths', file);
            });
        } else {
            formData.append('youtube_link', youtubeLink);
        }
        formData.append('subject', subject); // Add the subject to the form data

        // Send the files or the YouTube link to the Flask server
        const response = await axios.post('http://192.168.137.74:5000/generate_notes', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Set questions and answers after the response is received
        setQuestionsAnswers(response.data.questions_answers);
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Notes Generation</h1>

            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                {/* Subject Input Section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input 
                        type="text" 
                        value={subject} 
                        onChange={handleSubjectChange} 
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Enter the subject"
                    />
                </div>

                {/* Toggle between File Upload and YouTube Link */}
                <div className="mb-4 flex justify-between">
                    <button 
                        onClick={() => setIsFileUpload(true)} 
                        className={`px-4 py-2 rounded-md ${isFileUpload ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        Upload Files
                    </button>
                    <button 
                        onClick={() => setIsFileUpload(false)} 
                        className={`px-4 py-2 rounded-md ${!isFileUpload ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        YouTube Link
                    </button>
                </div>

                {/* Conditional Inputs */}
                {isFileUpload ? (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload PDF(s)</label>
                        <input 
                            type="file" 
                            accept=".pdf" 
                            multiple 
                            onChange={handleFileChange} 
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                ) : (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">YouTube Link</label>
                        <input 
                            type="text" 
                            value={youtubeLink} 
                            onChange={handleYoutubeChange} 
                            className="border border-gray-300 rounded-md p-2 w-full"
                        />
                    </div>
                )}

                <button 
                    onClick={handleSubmit} 
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
                >
                    Generate Notes
                </button>

                {/* Display generated questions and answers */}
                {questionsAnswers && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">Generated Questions and Answers:</h2>
                        {questionsAnswers.questions.map((question, index) => (
                            <div key={index} className="mb-4">
                                <h3 className="font-semibold text-gray-700">Question {index + 1}:</h3>
                                <p className="bg-gray-100 p-2 rounded-md">{question}</p>
                                <h4 className="font-semibold text-gray-700 mt-2">Answer:</h4>
                                <p className="bg-gray-100 p-2 rounded-md">{questionsAnswers.answers[index]}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesGeneration;

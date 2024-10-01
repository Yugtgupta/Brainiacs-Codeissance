import React, { useState } from 'react';

const NotesGeneration = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [notes, setNotes] = useState(null);

  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleYoutubeLinkChange = (event) => {
    setYoutubeLink(event.target.value);
  };

  const handleGenerateNotes = () => {
    // Hardcoded notes response with history content
    const hardcodedResponse = `
      Key Content: The Rise of Nationalism in Europe

      1. Introduction to Nationalism:
      - 19th-century Europe saw the rise of nationalism, leading to the formation of nation-states.
      - Frédéric Sorrieu’s 1848 prints imagined a world of democratic republics.
      
      2. French Revolution:
      - Marked the first expression of nationalism in 1789, leading to the rise of popular sovereignty.
      - Symbols like the tricolour flag and the National Assembly were introduced.
      
      3. Napoleon’s Reforms:
      - Napoleon's reforms, including the Napoleonic Code, promoted equality but were coupled with imperial ambitions.
      
      4. Revolutions of 1830 and 1848:
      - Series of nationalist uprisings across Europe, particularly in Italy, Germany, and Greece.
      
      5. Unification of Italy and Germany:
      - Italy unified under Victor Emmanuel II, supported by Garibaldi and Cavour.
      - Germany unified under Prussian leadership, led by Otto von Bismarck.
      
      6. Cultural Nationalism:
      - Romanticism contributed to nationalist feelings through art, music, and literature, including the efforts of the Grimm Brothers in Germany.
      
      7. Symbols of Nationalism:
      - Nations were often personified by female figures like Marianne (France) and Germania (Germany) to represent liberty and unity.
      
      Conclusion: Nationalism led to significant political and social changes in Europe, leading to the decline of multinational empires and the emergence of modern nation-states.
    `;
    
    setNotes(hardcodedResponse);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Notes Generation</h1>
      
      <div className="mb-4">
        <label className="block mb-2 text-lg">Upload PDF File</label>
        <input 
          type="file" 
          onChange={handleFileUpload}
          className="border p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-lg">Add YouTube Link</label>
        <input 
          type="text" 
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
          placeholder="Paste YouTube link here"
          className="border p-2 w-full"
        />
      </div>

      <button 
        onClick={handleGenerateNotes} 
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700 transition"
      >
        Generate Notes
      </button>

      {notes && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Generated Notes:</h2>
          <pre>{notes}</pre>
        </div>
      )}
    </div>
  );
};

export default NotesGeneration;

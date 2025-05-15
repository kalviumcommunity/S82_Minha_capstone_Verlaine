import React, { useState } from 'react';

const Journal = () => {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEntries([...entries, { text: entry, date: new Date().toLocaleDateString() }]);
    setEntry('');
  };

  return (
    <div className="p-6 bg-silk min-h-screen">
      <h2 className="text-3xl font-elegant text-plum mb-4">Skin Journal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-4 border border-mauve rounded-lg focus:outline-none"
          rows="4"
          placeholder="How’s your skin feeling today?"
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          required
        ></textarea>
        <button className="bg-plum text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all">Save Reflection</button>
      </form>
      <div className="mt-6 space-y-4">
        {entries.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow">
            <p className="text-mauve italic">"{item.text}"</p>
            <p className="text-right text-sm text-gray-400 mt-2">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journal;

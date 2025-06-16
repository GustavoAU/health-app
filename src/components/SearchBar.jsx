import React, { useState } from 'react';


const SearchBar = ({ onSearch, placeholder = "Describe your symptoms...", disabled = false }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="flex opacity-100 transition-opacity duration-300">
      <input
        className={`p-2 border rounded-l-xl w-full ${
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        }`}
        type="text"
        placeholder={placeholder}
        value={query}
        disabled={disabled}
        onChange={e => setQuery(e.target.value)}
      />
      <button
        className={`text-white px-4 rounded-r ${disabled ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
        disabled={disabled}
        onClick={() => onSearch(query)}
      >
        🔍
      </button>
    </div>
  );
};


export default SearchBar;

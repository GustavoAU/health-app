import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div className="flex">
      <input 
        className="p-3 border rounded-l w-full"
        type="text" 
        placeholder="Describe your symptoms..." 
        value={query} 
        onChange={e => setQuery(e.target.value)} 
      />
      <button className="bg-blue-600 text-white px-4 rounded-r" onClick={() => onSearch(query)}>🔍</button>
    </div>
  );
};

export default SearchBar;

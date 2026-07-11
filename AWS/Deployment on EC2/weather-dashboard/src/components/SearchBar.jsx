import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search for cities (e.g. Kamra, London, Paris)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className="search-icon-btn" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="spinner" style={{ width: 20, height: 20 }} />
          ) : (
            <Search size={20} />
          )}
        </button>
      </div>
    </form>
  );
}

export default SearchBar;

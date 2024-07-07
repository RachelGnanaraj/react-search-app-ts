import React, { useState, useEffect, ChangeEvent, KeyboardEvent, useRef } from 'react';
import { fetchSuggestions } from '../services/api';
import SuggestionsDropdown from './SuggestionsDropdown';
import '../styles/SearchBar.css';
import { SearchBarProps } from '../constants';

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (query.length > 2) {
            fetchSuggestions(query)
                .then(setSuggestions)
                .catch(error => console.error('Error fetching suggestions:', error));
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setShowSuggestions(true);
    };

    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSearch = () => {
        onSearch(query);
        setShowSuggestions(false);
    };

    const handleSelectSuggestion = (suggestion: string) => {
        setQuery(suggestion);
        onSearch(suggestion);
        setShowSuggestions(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <div className="container">
                <div className="search-bar">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Search..."
                        ref={inputRef}
                    />
                    {query.length > 0 && <button onClick={handleClear} className="clear-btn">X</button>}
                    <button onClick={handleSearch} className="search-btn">
                        <img src="/searchIcon.png" alt="Search Icon" className="search-icon" />
                        Search
                    </button>
                </div>
                {showSuggestions && (
                    <SuggestionsDropdown
                        suggestions={suggestions}
                        onSelect={handleSelectSuggestion}
                    />
                )}
            </div>
        </div>
    );
};

export default SearchBar;

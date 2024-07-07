import React, { useState, useEffect } from 'react';
import { SuggestionsDropdownProps } from '../constants';
import '../styles/SuggestionsDropdown.css';

const SuggestionsDropdown = ({ suggestions, onSelect }: SuggestionsDropdownProps) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            onSelect(suggestions[selectedIndex]);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex, suggestions]);

    return (
        <div className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
                <div
                    key={index}
                    className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                    onClick={() => onSelect(suggestion)}
                >
                    {suggestion}
                </div>
            ))}
        </div>
    );
};

export default SuggestionsDropdown;

import React from 'react';
import { SearchResultsProps } from '../constants';
import '../styles/SearchResults.css';

const highlightTextByOffset = (text: string, highlights: { BeginOffset: number; EndOffset: number }[]) => {
    const highlightedText = [];
    let lastIndex = 0;

    highlights.forEach(({ BeginOffset, EndOffset }) => {
        highlightedText.push(text.slice(lastIndex, BeginOffset));
        highlightedText.push(<strong key={BeginOffset}>{text.slice(BeginOffset, EndOffset)}</strong>);
        lastIndex = EndOffset;
    });

    highlightedText.push(text.slice(lastIndex));
    return highlightedText;
};

const highlightText = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
};


const SearchResults = ({ results, query, totalResults, page, pageSize }: SearchResultsProps) => {
    const startIndex = (page - 1) * pageSize + 1;
    const endIndex = Math.min(page * pageSize, totalResults);

    return (
        <div className="container results-container">
            {results.length > 0 && <h3 className="results-count">Showing {startIndex}-{endIndex} of {totalResults} results</h3>}
            {results.map(result => (
                <div key={result.DocumentId} className="result-item">
                    <a href={result.DocumentURI} target="_blank" rel="noopener noreferrer" className="result-link">
                        <h3 className="result-title">{highlightText(result.DocumentTitle.Text, query)}</h3>
                    </a>
                    <p className="result-excerpt">{highlightText(result.DocumentExcerpt.Text, query)}</p>
                    <p className="result-url">{result.DocumentURI}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchResults;

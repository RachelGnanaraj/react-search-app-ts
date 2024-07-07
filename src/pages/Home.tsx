import React, { useState } from 'react';
import { fetchSearchResults } from '../services/api';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { SearchResultItem, SearchResultsResponse } from '../constants';

const Home = () => {
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [query, setQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
    fetchSearchResults(searchQuery)
      .then((response: SearchResultsResponse) => {
        setResults(response.ResultItems);
        setTotalResults(response.TotalNumberOfResults);
      })
      .catch(error => console.error('Error fetching search results:', error));
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults
        results={results}
        query={query}
        totalResults={totalResults}
        page={page}
        pageSize={pageSize}
      />
    </div>
  );
};

export default Home;

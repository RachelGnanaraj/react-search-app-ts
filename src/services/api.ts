import axios from 'axios';
import { SearchResultsResponse, SEARCH_RESULTS_API_URL, SuggestionResponse, SUGGESTIONS_API_URL } from '../constants';

// Function to fetch suggestions
export const fetchSuggestions = async (query: string): Promise<string[]> => {
    try {
        const response = await axios.get<SuggestionResponse>(SUGGESTIONS_API_URL);
        return response.data.suggestions;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
};

// Function to fetch search results
export const fetchSearchResults = async (query: string): Promise<SearchResultsResponse> => {
    try {
        const response = await axios.get<SearchResultsResponse>(SEARCH_RESULTS_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching search results:', error);
        return {
            TotalNumberOfResults: 0,
            Page: 1,
            PageSize: 10,
            ResultItems: []
        };
    }
};

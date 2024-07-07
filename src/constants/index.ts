export const SUGGESTIONS_API_URL = 'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json';
export const SEARCH_RESULTS_API_URL = 'https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json';

// Interface for the suggestion response
export interface SuggestionResponse {
    stemmedQueryTerm: string;
    suggestions: string[];
}

// Interface for the search result item
export interface SearchResultItem {
    DocumentId: string;
    DocumentTitle: {
        Text: string;
        Highlights: { BeginOffset: number; EndOffset: number }[];
    };
    DocumentExcerpt: {
        Text: string;
        Highlights: { BeginOffset: number; EndOffset: number }[];
    };
    DocumentURI: string;
}

// Interface for the search results response
export interface SearchResultsResponse {
    TotalNumberOfResults: number;
    Page: number;
    PageSize: number;
    ResultItems: SearchResultItem[];
}

export interface SearchResultsProps {
    results: SearchResultItem[];
    query: string;
    totalResults: number;
    page: number;
    pageSize: number;
}

export interface SuggestionsDropdownProps {
    suggestions: string[];
    onSelect: (suggestion: string) => void;
}

export interface SearchBarProps {
    onSearch: (query: string) => void;
}
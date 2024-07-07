// __mocks__/axios.ts
import { SearchResultItem, SearchResultsResponse, SEARCH_RESULTS_API_URL, SuggestionResponse, SUGGESTIONS_API_URL } from '../constants';

const mockSuggestions: string[] = ['mock suggestion 1', 'mock suggestion 2'];
const mockSearchResults: SearchResultItem[] = [
    {
        DocumentId: '1',
        DocumentTitle: { Text: 'Mock Title 1', Highlights: [] },
        DocumentExcerpt: { Text: 'Mock Excerpt 1', Highlights: [] },
        DocumentURI: 'https://example.com/document/1'
    },
    {
        DocumentId: '2',
        DocumentTitle: { Text: 'Mock Title 2', Highlights: [] },
        DocumentExcerpt: { Text: 'Mock Excerpt 2', Highlights: [] },
        DocumentURI: 'https://example.com/document/2'
    }
];

export default {
    get: jest.fn((url: string) => {
        if (url === SUGGESTIONS_API_URL) {
            return Promise.resolve({ data: { stemmedQueryTerm: 'mock', suggestions: mockSuggestions } } as unknown as SuggestionResponse);
        } else if (url === SEARCH_RESULTS_API_URL) {
            return Promise.resolve({ data: { TotalNumberOfResults: 2, Page: 1, PageSize: 10, ResultItems: mockSearchResults } } as unknown as SearchResultsResponse);
        }
        return Promise.reject(new Error('Not found'));
    })
};

import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from '../SearchResults';
import { SearchResultItem } from '../../constants';

describe('SearchResults', () => {
    const mockResultsWithHighlights: SearchResultItem[] = [
        {
            DocumentId: '1',
            DocumentTitle: { Text: 'Mock Title 1', Highlights: [{ BeginOffset: 0, EndOffset: 4 }] },
            DocumentExcerpt: { Text: 'Mock Excerpt 1', Highlights: [{ BeginOffset: 0, EndOffset: 4 }] },
            DocumentURI: 'https://example.com/document/1',
        },
        {
            DocumentId: '2',
            DocumentTitle: { Text: 'Another Mock Title 2', Highlights: [] },
            DocumentExcerpt: { Text: 'Another Mock Excerpt 2', Highlights: [] },
            DocumentURI: 'https://example.com/document/2',
        },
    ];

    const defaultProps = {
        results: mockResultsWithHighlights,
        query: 'Mock',
        totalResults: 2,
        page: 1,
        pageSize: 10,
    };

    it('renders the correct number of results', () => {
        render(<SearchResults {...defaultProps} />);
        expect(screen.getByText('Showing 1-2 of 2 results')).toBeInTheDocument();
    });

});

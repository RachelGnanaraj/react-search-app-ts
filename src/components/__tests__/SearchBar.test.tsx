import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';
import { fetchSuggestions } from '../../services/api';

jest.mock('../../services/api');

describe('SearchBar', () => {
    const mockOnSearch = jest.fn();
    const mockedFetchSuggestions = fetchSuggestions as jest.MockedFunction<typeof fetchSuggestions>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders SearchBar component', () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        const inputElement = screen.getByPlaceholderText('Search...');
        expect(inputElement).toBeInTheDocument();
    });

    it('fetches suggestions and displays them', async () => {
        mockedFetchSuggestions.mockResolvedValue(['mock suggestion 1', 'mock suggestion 2']);

        render(<SearchBar onSearch={mockOnSearch} />);
        const inputElement = screen.getByPlaceholderText('Search...');
        fireEvent.change(inputElement, { target: { value: 'mock' } });

        await waitFor(() => {
            const suggestion1 = screen.getByText('mock suggestion 1');
            const suggestion2 = screen.getByText('mock suggestion 2');
            expect(suggestion1).toBeInTheDocument();
            expect(suggestion2).toBeInTheDocument();
        });

        expect(mockedFetchSuggestions).toHaveBeenCalledTimes(1);
        expect(mockedFetchSuggestions).toHaveBeenCalledWith('mock');
    });


    it('selects suggestion and calls onSearch when suggestion is clicked', async () => {
        mockedFetchSuggestions.mockResolvedValue(['mock suggestion 1', 'mock suggestion 2']);

        render(<SearchBar onSearch={mockOnSearch} />);
        const inputElement = screen.getByPlaceholderText('Search...');
        fireEvent.change(inputElement, { target: { value: 'mock' } });

        await waitFor(() => {
            const suggestion1 = screen.getByText('mock suggestion 1');
            expect(suggestion1).toBeInTheDocument();
        });

        userEvent.click(screen.getByText('mock suggestion 1'));

        expect(mockOnSearch).toHaveBeenCalledTimes(1);
        expect(mockOnSearch).toHaveBeenCalledWith('mock suggestion 1');
    });
});

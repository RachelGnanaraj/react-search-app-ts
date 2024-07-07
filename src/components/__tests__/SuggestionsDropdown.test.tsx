import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SuggestionsDropdown from '../SuggestionsDropdown';

describe('SuggestionsDropdown', () => {
    const suggestions = ['suggestion1', 'suggestion2', 'suggestion3'];
    const mockOnSelect = jest.fn();

    beforeEach(() => {
        render(<SuggestionsDropdown suggestions={suggestions} onSelect={mockOnSelect} />);
    });

    it('renders suggestions correctly', () => {
        suggestions.forEach((suggestion) => {
            expect(screen.getByText(suggestion)).toBeInTheDocument();
        });
    });

    it('highlights the correct suggestion on arrow down key press', () => {
        fireEvent.keyDown(window, { key: 'ArrowDown' });
        expect(screen.getByText('suggestion1')).toHaveClass('selected');

        fireEvent.keyDown(window, { key: 'ArrowDown' });
        expect(screen.getByText('suggestion2')).toHaveClass('selected');
    });

    it('highlights the correct suggestion on arrow up key press', () => {
        fireEvent.keyDown(window, { key: 'ArrowDown' });
        fireEvent.keyDown(window, { key: 'ArrowDown' });
        fireEvent.keyDown(window, { key: 'ArrowUp' });

        expect(screen.getByText('suggestion1')).toHaveClass('selected');
    });

    it('selects the highlighted suggestion on enter key press', () => {
        fireEvent.keyDown(window, { key: 'ArrowDown' });
        fireEvent.keyDown(window, { key: 'Enter' });

        expect(mockOnSelect).toHaveBeenCalledWith('suggestion1');
    });

    it('selects the correct suggestion on mouse click', () => {
        fireEvent.click(screen.getByText('suggestion2'));

        expect(mockOnSelect).toHaveBeenCalledWith('suggestion2');
    });
});

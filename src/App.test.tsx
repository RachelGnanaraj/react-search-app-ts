// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./pages/Home', () => () => <div>Home Component</div>);
jest.mock('@govtechsg/sgds-masthead-react', () => ({
  SgdsMasthead: () => <div>SgdsMasthead Component</div>
}));

describe('App', () => {
  it('renders SgdsMasthead component', () => {
    render(<App />);
    expect(screen.getByText('SgdsMasthead Component')).toBeInTheDocument();
  });

  it('renders Home component', () => {
    render(<App />);
    expect(screen.getByText('Home Component')).toBeInTheDocument();
  });
});

import { render, screen, waitFor } from '@testing-library/react'

import React from 'react';
import Index from '~/pages/index';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom'

// Mock the `api` since it might be making HTTP requests.
jest.mock('~/utils/api', () => ({
  api: {
    articles: {
      getAll: {
        useQuery: () => ({ data: null })
      }
    }
  }
}));

describe('<Index />', () => {

  it('renders without crashing', () => {
    render(<Index />);
    const searchInput = screen.getByTestId('search-input')
    expect(searchInput).toBeInTheDocument();
  });

  it('can search for an article', async () => {
    render(<Index />);

    const searchInput = screen.getByTestId('search-input')

    await userEvent.type(searchInput, 'Some Search Query');

    await waitFor(() => {
      expect(searchInput).toHaveValue('Some Search Query');
      // TODO: Add more assertions here.
    });
  });
});


import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from '../helpers';
import SearchPage from '../../app/search/page';
import { fetchPeople } from '../../api/users.api';

// Mock the API call
jest.mock('../../api/users.api', () => ({
  fetchPeople: jest.fn(),
}));

// Mock the localStorage hook
jest.mock('../../common/hooks/useSearchTermFromLocalStorage', () => ({
  __esModule: true,
  default: () => ({
    searchTerm: '',
    setSearchTerm: jest.fn(),
  }),
}));

const mockPeopleData = {
  results: [
    {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
      gender: 'male',
      eye_color: 'blue',
      hair_color: 'blond',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
  next: 'https://swapi.dev/api/people/?page=2',
  previous: null,
  count: 82,
};

describe('SearchPage', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    localStorage.clear();
    (fetchPeople as jest.Mock).mockReset();
  });

  test('renders initial state correctly', async () => {
    (fetchPeople as jest.Mock).mockResolvedValueOnce(mockPeopleData);

    renderWithRouter(<SearchPage />);

    expect(screen.getByPlaceholderText(/Search.../)).toBeInTheDocument();
    expect(screen.getByText(/Search/)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
    });
  });

  test('shows loading state while fetching data', async () => {
    (fetchPeople as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockPeopleData), 100))
    );

    renderWithRouter(<SearchPage />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  test('handles pagination correctly', async () => {
    (fetchPeople as jest.Mock).mockResolvedValue(mockPeopleData);

    renderWithRouter(<SearchPage />);

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
    });

    const nextButton = screen.getByText(/Next/);
    await userEvent.click(nextButton);

    expect(window.location.search).toBe('?page=2');
  });

  test('updates results when search term changes', async () => {
    const mockSearchResults = {
      ...mockPeopleData,
      results: [
        {
          ...mockPeopleData.results[0],
          name: 'Leia Organa',
        },
      ],
    };

    (fetchPeople as jest.Mock)
      .mockResolvedValueOnce(mockPeopleData)
      .mockResolvedValueOnce(mockSearchResults);

    renderWithRouter(<SearchPage />);

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/Search.../);
    await userEvent.type(searchInput, 'Leia');
    await userEvent.click(screen.getByText(/Search/));

    await waitFor(() => {
      expect(screen.getByText(/Leia Organa/)).toBeInTheDocument();
    });
  });

  //   test('handles error states appropriately', async () => {
  //     const consoleError = jest
  //       .spyOn(console, 'error')
  //       .mockImplementation(() => {});
  //     (fetchPeople as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

  //     renderWithRouter(<SearchPage />);

  //     await waitFor(() => {
  //       expect(fetchPeople).toHaveBeenCalled();
  //     });

  //     consoleError.mockRestore();
  //   });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DetailedCard from '../../components/DetailedCard';
import { renderWithRouter } from '../helpers';
import { RootState } from '@/app/store';

const mockStore = configureStore([]);
const initialState: Partial<RootState> = {
  people: {
    currentCard: null,
    isFetchPersonByIdLoading: false,
    results: [],
    searchTerm: '',
    isFetchPeopleLoading: false,
    isNextPage: false,
    selectedPeople: {},
  },
};

const mockPerson = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  eye_color: 'blue',
  hair_color: 'blond',
};

describe('DetailedCard component', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  test('displays the detailed card data when not loading', () => {
    const store = mockStore({
      ...initialState,
      people: {
        ...initialState.people,
        currentCard: mockPerson,
      },
    });

    renderWithRouter(
      <Provider store={store}>
        <DetailedCard />
      </Provider>
    );

    expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/19BBY/)).toBeInTheDocument();
    expect(screen.getByText(/male/)).toBeInTheDocument();
    expect(screen.getByText(/blue/)).toBeInTheDocument();
    expect(screen.getByText(/blond/)).toBeInTheDocument();
  });

  test('displays spinner when loading', () => {
    const store = mockStore({
      ...initialState,
      people: {
        ...initialState.people,
        isFetchPersonByIdLoading: true,
      },
    });

    renderWithRouter(
      <Provider store={store}>
        <DetailedCard />
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('clicking the close button updates search params and hides component', async () => {
    const store = mockStore({
      ...initialState,
      people: {
        ...initialState.people,
        currentCard: mockPerson,
      },
    });

    renderWithRouter(
      <Provider store={store}>
        <DetailedCard />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Close/));

    expect(store.getActions()).toContainEqual({
      type: 'people/resetCurrentCard',
    });
    expect(window.location.search).toBe('?id=');
  });

  test('returns nothing if no data provided', () => {
    const store = mockStore(initialState);

    const { container } = renderWithRouter(
      <Provider store={store}>
        <DetailedCard />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });
});

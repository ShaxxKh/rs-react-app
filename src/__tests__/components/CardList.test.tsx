import { screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CardList from '../../components/CardList';
import { renderWithRouter } from '../helpers';

const mockStore = configureStore([]);
const initialState = {
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

test('renders the specified number of cards', () => {
  const store = mockStore({
    ...initialState,
    people: {
      ...initialState.people,
      results: [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          gender: 'male',
          eye_color: 'green',
          hair_color: 'black',
          url: 'https://swapi.dev/api/people/1/',
        },
        {
          name: 'Leia Organa',
          birth_year: '19BBY',
          gender: 'female',
          eye_color: 'green',
          hair_color: 'black',
          url: 'https://swapi.dev/api/people/2/',
        },
      ],
    },
  });

  renderWithRouter(
    <Provider store={store}>
      <CardList />
    </Provider>
  );

  const cards = screen.getAllByRole('link');
  expect(cards).toHaveLength(2);
});

test('displays appropriate message if no cards are present', () => {
  const store = mockStore(initialState);

  renderWithRouter(
    <Provider store={store}>
      <CardList />
    </Provider>
  );

  expect(screen.getByText('No results found')).toBeInTheDocument();
});

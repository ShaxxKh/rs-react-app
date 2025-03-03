import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Results from '../../components/Results';
import { renderWithRouter } from '../helpers';
import { RootState } from '@/appStore/store';

const mockStore = configureStore([]);
const initialState: Partial<RootState> = {
  people: {
    currentCard: null,
    isFetchPersonByIdLoading: false,
    results: [
      {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        eye_color: 'yellow',
        hair_color: 'black',
        url: 'https://swapi.dev/api/people/1/',
      },
      {
        name: 'Leia Organa',
        birth_year: '19BBY',
        gender: 'female',
        eye_color: 'yellow',
        hair_color: 'black',
        url: 'https://swapi.dev/api/people/2/',
      },
    ],
    searchTerm: '',
    isFetchPeopleLoading: false,
    isNextPage: true,
    selectedPeople: {},
  },
};

test('updates URL query parameter when page changes', async () => {
  const store = mockStore(initialState);

  renderWithRouter(
    <Provider store={store}>
      <Results />
    </Provider>
  );

  await userEvent.click(screen.getByText(/Next/));
  expect(window.location.search).toBe('?page=2');
});

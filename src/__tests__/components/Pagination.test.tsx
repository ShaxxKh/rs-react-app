import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Results from '../../components/Results';
import { Person } from '../../api/users.api';
import { renderWithRouter } from '../helpers';

const mockResults: Person[] = [
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
];

test('updates URL query parameter when page changes', async () => {
  const handlePageChange = jest.fn();
  renderWithRouter(
    <Results
      results={mockResults}
      currentPage={1}
      isNextPage={true}
      isFetchPeopleLoading={false}
      onPageChange={handlePageChange}
    />
  );
  await userEvent.click(screen.getByText(/Next/));
  expect(handlePageChange).toHaveBeenCalledWith(2);
});

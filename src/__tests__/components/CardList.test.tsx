import { screen } from '@testing-library/react';
import CardList from '../../components/CardList';
import { Person } from '../../api/users.api';
import { renderWithRouter } from '../helpers';

const mockResults: Person[] = [
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
];

test('renders the specified number of cards', () => {
  renderWithRouter(<CardList results={mockResults} />);
  const cards = screen.getAllByRole('link');
  expect(cards).toHaveLength(mockResults.length);
});

test('displays appropriate message if no cards are present', () => {
  renderWithRouter(<CardList results={[]} />);
  expect(screen.getByText('No results found')).toBeInTheDocument();
});

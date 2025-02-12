import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../../components/Card';
import { Person } from '../../api/users.api';
import { renderWithRouter } from '../helpers';

const mockPerson: Person = {
  name: 'Luke Skywalker',
  birth_year: '19BBY',
  gender: 'male',
  eye_color: 'blue',
  hair_color: 'black',
  url: 'https://swapi.dev/api/people/1/',
};

describe('Card component', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    localStorage.clear();
    document.body.innerHTML = '';
  });

  test('renders the relevant card data', () => {
    renderWithRouter(<Card data={mockPerson} />);
    expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/19BBY/)).toBeInTheDocument();
    expect(screen.getByText(/male/)).toBeInTheDocument();
  });

  test('clicking on a card opens a detailed card component', async () => {
    renderWithRouter(<Card data={mockPerson} />);
    await userEvent.click(screen.getByRole('link'));
    expect(window.location.search).toContain('id=1');
  });

  test('clicking on a card sets correct id in search params', async () => {
    renderWithRouter(<Card data={mockPerson} />);

    // Before click, search params should be empty
    expect(window.location.search).toBe('');

    await userEvent.click(screen.getByRole('link'));

    // After click, search params should contain the correct id
    expect(window.location.search).toBe('?id=1');
  });
});

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DetailedCard from '../../components/DetailedCard';
import { PersonWithoutUrl } from '../../api/users.api';
import { renderWithRouter } from '../helpers';

const mockPerson: PersonWithoutUrl = {
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
    renderWithRouter(
      <DetailedCard
        data={mockPerson}
        setCurrentCard={() => {}}
        isFetchPersonByIdLoading={false}
      />
    );
    expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
    expect(screen.getByText(/19BBY/)).toBeInTheDocument();
    expect(screen.getByText(/male/)).toBeInTheDocument();
    expect(screen.getByText(/blue/)).toBeInTheDocument();
    expect(screen.getByText(/blond/)).toBeInTheDocument();
  });

  test('displays spinner when loading', () => {
    renderWithRouter(
      <DetailedCard
        data={mockPerson}
        setCurrentCard={() => {}}
        isFetchPersonByIdLoading={true}
      />
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('clicking the close button updates search params and hides component', async () => {
    const setCurrentCard = jest.fn();
    renderWithRouter(
      <DetailedCard
        data={mockPerson}
        setCurrentCard={setCurrentCard}
        isFetchPersonByIdLoading={false}
      />
    );

    await userEvent.click(screen.getByText(/Close/));

    expect(setCurrentCard).toHaveBeenCalledWith(null);
    expect(window.location.search).toBe('?id=');
  });

  test('returns nothing if no data provided', () => {
    const { container } = renderWithRouter(
      <DetailedCard
        data={null}
        setCurrentCard={() => {}}
        isFetchPersonByIdLoading={false}
      />
    );
    expect(container.firstChild).toBeNull();
  });
});

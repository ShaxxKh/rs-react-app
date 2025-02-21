import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Controls from '../../components/Controls';
import { renderWithRouter } from '../helpers';

test('clicking the Search button saves the entered value to the local storage', async () => {
  renderWithRouter(<Controls />);
  const input = screen.getByPlaceholderText(/Search.../);
  fireEvent.change(input, { target: { value: 'Luke' } });
  await userEvent.click(screen.getByText(/Search/));
  expect(localStorage.getItem('searchTerm')).toBe('Luke');
});

test('retrieves the value from the local storage upon mounting', () => {
  localStorage.setItem('searchTerm', 'Leia');
  renderWithRouter(<Controls />);
  expect(screen.getByPlaceholderText(/Search.../)).toHaveValue('Leia');
});

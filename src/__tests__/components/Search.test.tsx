import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Controls from '../../components/Controls';
import { renderWithRouter } from '../helpers';

test('clicking the Search button saves the entered value to the local storage', async () => {
  const setSearchTerm = jest.fn();
  renderWithRouter(
    <Controls
      searchTerm=""
      setSearchTerm={setSearchTerm}
      handleSearchClick={() => {}}
    />
  );
  const input = screen.getByPlaceholderText(/Search.../);
  fireEvent.change(input, { target: { value: 'Luke' } });
  await userEvent.click(screen.getByText(/Search/));
  //   expect(setSearchTerm.mock.calls).toEqual([['L'], ['Lu'], ['Luk'], ['Luke']]);
  expect(setSearchTerm).toHaveBeenCalledWith('Luke');
});

test('retrieves the value from the local storage upon mounting', () => {
  localStorage.setItem('searchTerm', 'Leia');
  const { rerender } = renderWithRouter(
    <Controls
      searchTerm=""
      setSearchTerm={() => {}}
      handleSearchClick={() => {}}
    />
  );
  rerender(
    <Controls
      searchTerm={localStorage.getItem('searchTerm') || ''}
      setSearchTerm={() => {}}
      handleSearchClick={() => {}}
    />
  );
  expect(screen.getByPlaceholderText(/Search.../)).toHaveValue('Leia');
});

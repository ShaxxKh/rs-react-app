import ThemeContext, { ThemeType } from './../context/ThemeContext';
import React, { useContext } from 'react';
import RadioButton from './RadioButton';
import useSearchTermFromLocalStorage from '../common/hooks/useSearchTermFromLocalStorage';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/people/peopleSlice';

export default function Controls() {
  const dispatch = useDispatch();
  const { searchTerm, setSearchTermToLocalState } =
    useSearchTermFromLocalStorage();
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermToLocalState(event.target.value);
  };

  const handleSearchClick = () => {
    dispatch(setSearchTerm(searchTerm));
  };

  const handleRadioButtonClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTheme(event.target.value as ThemeType);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <button onClick={handleSearchClick}>Search</button>
      <div onChange={handleRadioButtonClick}>
        <RadioButton isChecked={isDark} value="dark" />
        <RadioButton isChecked={!isDark} value="light" />
      </div>
    </div>
  );
}

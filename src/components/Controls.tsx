import ThemeContext, { ThemeType } from './../context/ThemeContext';
import React, { useContext } from 'react';
import RadioButton from './RadioButton';

interface ControlsProps {
  handleSearchClick: () => void;
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
}

export default function Controls(props: ControlsProps) {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchTerm(event.target.value);
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
        value={props.searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <button onClick={props.handleSearchClick}>Search</button>
      <div onChange={handleRadioButtonClick}>
        <RadioButton isChecked={isDark} value="dark" />
        <RadioButton isChecked={!isDark} value="light" />
      </div>
    </div>
  );
}

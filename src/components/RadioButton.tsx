import { ThemeType } from '../context/ThemeContext';

export default function RadioButton(props: {
  isChecked: boolean;
  value: ThemeType;
}) {
  const { isChecked, value } = props;
  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <label>
      <input
        type="radio"
        name="filter"
        value={value}
        defaultChecked={isChecked}
      />
      {capitalizedValue}
    </label>
  );
}

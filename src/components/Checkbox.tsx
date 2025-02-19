export default function Checkbox(props: {
  isChecked: boolean;
  handleOnCheckboxChange: () => void;
}) {
  const { isChecked, handleOnCheckboxChange } = props;

  return (
    <label>
      <input
        type="checkbox"
        name="select"
        checked={isChecked}
        defaultChecked={isChecked}
        onChange={handleOnCheckboxChange}
      />
    </label>
  );
}

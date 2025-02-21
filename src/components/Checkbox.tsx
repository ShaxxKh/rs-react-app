export default function Checkbox(props: {
  isChecked: boolean;
  handleOnCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { isChecked, handleOnCheckboxChange } = props;

  return (
    <label>
      <input
        type="checkbox"
        name="select"
        checked={isChecked || false}
        onChange={handleOnCheckboxChange}
      />
    </label>
  );
}

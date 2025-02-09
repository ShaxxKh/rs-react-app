import './spinner.css';

export default function Spinner() {
  return (
    <>
      <div
        className="spinner"
        style={{
          width: '32px',
          height: '32px',
          borderColor: '#0066cc',
          borderTopColor: 'transparent',
        }}
        role="status"
        aria-label="loading"
        data-testid="spinner"
      ></div>
      <span className="spinner-text">Loading...</span>
    </>
  );
}

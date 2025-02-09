import { useSearchParams } from 'react-router';
import { PersonWithoutUrl } from '../api/users.api';

export default function DetailedCard(props: {
  data: PersonWithoutUrl;
  setCurrentCard: (currentCard: null) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseButtonClick = () => {
    searchParams.set('id', '');
    setSearchParams(searchParams);
    props.setCurrentCard(null);
  };

  return (
    <div>
      <h2>Detailed Card</h2>
      <ul style={{ listStyleType: 'none', textAlign: 'start' }}>
        {Object.entries(props.data).map((property, index) => {
          return (
            <li key={index}>
              {property[0]}: {property[1]}
            </li>
          );
        })}
      </ul>
      <button onClick={handleCloseButtonClick}>Close</button>
    </div>
  );
}

import { useSearchParams } from 'react-router';
import { PersonWithoutUrl } from '../api/users.api';
import Spinner from './Spinner/Spinner';

export default function DetailedCard(props: {
  data: PersonWithoutUrl;
  isFetchPersonByIdLoading: boolean;
  setCurrentCard: (currentCard: null) => void;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCloseButtonClick = () => {
    searchParams.set('id', '');
    setSearchParams(searchParams);
    props.setCurrentCard(null);
  };

  if (!props.data && !props.isFetchPersonByIdLoading) {
    return;
  }

  return !props.isFetchPersonByIdLoading ? (
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
  ) : (
    <Spinner />
  );
}

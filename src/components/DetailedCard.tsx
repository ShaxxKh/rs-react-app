import { useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner/Spinner';
import {
  resetCurrentCard,
  selectCurrentCard,
  selectIsFetchPersonByIdLoading,
} from '../features/people/peopleSlice';
import { RootState } from '@/app/store';

export default function DetailedCard() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const personData = useSelector((state: RootState) =>
    selectCurrentCard(state)
  );
  const isFetchPersonByIdLoading = useSelector((state: RootState) =>
    selectIsFetchPersonByIdLoading(state)
  );

  const handleCloseButtonClick = () => {
    searchParams.set('id', '');
    setSearchParams(searchParams);
    dispatch(resetCurrentCard());
  };

  if (!personData && !isFetchPersonByIdLoading) {
    return;
  }

  return !isFetchPersonByIdLoading ? (
    <div>
      <h2>Detailed Card</h2>
      <ul style={{ listStyleType: 'none', textAlign: 'start' }}>
        {Object.entries(personData).map((property, index) => {
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

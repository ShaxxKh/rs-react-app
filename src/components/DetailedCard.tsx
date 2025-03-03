import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner/Spinner';
import {
  resetCurrentCard,
  selectCurrentCard,
  selectIsFetchPersonByIdLoading,
} from '../features/people/peopleSlice';
import { RootState } from '@/appStore/store';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function DetailedCard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const personData = useSelector((state: RootState) =>
    selectCurrentCard(state)
  );
  const isFetchPersonByIdLoading = useSelector((state: RootState) =>
    selectIsFetchPersonByIdLoading(state)
  );

  const handleCloseButtonClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('id');
    dispatch(resetCurrentCard());

    router.push(`search?${params.toString()}`);
  };

  if (!personData && !isFetchPersonByIdLoading) {
    return;
  }

  return !isFetchPersonByIdLoading ? (
    <div>
      <h2>Detailed Card</h2>
      <ul style={{ listStyleType: 'none', textAlign: 'start' }}>
        {personData &&
          Object.entries(personData).map((property, index) => {
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

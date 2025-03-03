import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPersonByIdQuery } from '../api/users.api';
import DetailedCard from './DetailedCard';
import Spinner from './Spinner/Spinner';
import CardList from './CardList';
import {
  resetCurrentCard,
  selectIsFetchPeopleLoading,
  selectIsNextPage,
  setCurrentCard,
  setIsFetchPersonByIdLoading,
} from '../features/people/peopleSlice';
import { RootState } from '@/appStore/store';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function Results() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNextPage = useSelector((state: RootState) => selectIsNextPage(state));
  const isFetchPeopleLoading = useSelector((state: RootState) =>
    selectIsFetchPeopleLoading(state)
  );
  const id = searchParams.get('id') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const {
    data: currentCard,
    error,
    isLoading,
    isFetching,
  } = useGetPersonByIdQuery(id, {
    skip: !id,
    selectFromResult: (response) => {
      if (response.data) {
        const { name, birth_year, gender, hair_color, eye_color } =
          response.data;
        return {
          ...response,
          data: { name, birth_year, gender, hair_color, eye_color },
        };
      }

      return response;
    },
  });

  useEffect(() => {
    if (id) {
      if (currentCard && !error) {
        dispatch(setCurrentCard(currentCard));
      }

      dispatch(setIsFetchPersonByIdLoading(isLoading || isFetching));
    } else {
      dispatch(resetCurrentCard());
    }
  }, [id, dispatch, currentCard, error, isLoading, isFetching]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`search?${params.toString()}`);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {isFetchPeopleLoading ? (
        <Spinner />
      ) : (
        <div>
          <h2>Results</h2>
          <CardList />
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!isNextPage}
          >
            Next
          </button>
        </div>
      )}
      <DetailedCard />
    </div>
  );
}

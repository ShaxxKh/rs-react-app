import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router';
import { Person, useGetPersonByIdQuery } from '../api/users.api';
import DetailedCard from './DetailedCard';
import Spinner from './Spinner/Spinner';
import CardList from './CardList';
import {
  resetCurrentCard,
  setCurrentCard,
  setIsFetchPersonByIdLoading,
} from '../features/people/peopleSlice';

interface ResultsProps {
  results: Person[];
  currentPage: number;
  isNextPage: boolean;
  isFetchPeopleLoading: boolean;
  onPageChange: (page: number) => void;
}

export default function Results(props: ResultsProps) {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const {
    results,
    currentPage,
    isNextPage,
    isFetchPeopleLoading,
    onPageChange,
  } = props;
  const id = searchParams.get('id');

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

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {isFetchPeopleLoading ? (
        <Spinner />
      ) : (
        <div>
          <h2>Results</h2>
          <CardList results={results} />
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
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

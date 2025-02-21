import { useEffect } from 'react';
import Results from '../components/Results';
import { useGetPeopleQuery } from '../api/users.api';
import Controls from '../components/Controls';
import { useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchTerm,
  setIsFetchPeopleLoading,
  setIsNextPage,
  setResults,
} from '../features/people/peopleSlice';
import { RootState } from '@/app/store';
import ErrorButton from '../components/ErrorButton';

export default function SearchPage() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => selectSearchTerm(state));
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || undefined;

  const { data, isLoading, isFetching } = useGetPeopleQuery({
    search: searchTerm,
    page: currentPage,
  });

  useEffect(() => {
    if (data?.results) {
      const { results, next } = data;
      dispatch(setResults(results));
      dispatch(setIsNextPage(Boolean(next)));
    }
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setIsFetchPeopleLoading(isLoading || isFetching));
  }, [isLoading, isFetching, dispatch]);

  return (
    <div className="search_page">
      <Controls />
      <Results />
      <ErrorButton />
    </div>
  );
}

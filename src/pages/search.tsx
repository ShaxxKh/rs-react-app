import { useEffect } from 'react';
import Results from '../components/Results';
import { useGetPeopleQuery } from '../api/users.api';
import Controls from '../components/Controls';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchTerm,
  setIsFetchPeopleLoading,
  setIsNextPage,
  setResults,
} from '../features/people/peopleSlice';
import { RootState } from '@/appStore/store';
import ErrorButton from '../components/ErrorButton';
import DownloadArea from '../components/DownloadArea';
import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => selectSearchTerm(state));
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || undefined;

  const { data, isLoading, isFetching, error } = useGetPeopleQuery({
    search: searchTerm,
    page: currentPage,
  });

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      dispatch(setIsNextPage(false));
      dispatch(setResults([]));
      return;
    }

    if (data?.results) {
      const { results, next } = data;
      dispatch(setResults(results));
      dispatch(setIsNextPage(Boolean(next)));
    }
  }, [data, dispatch, error]);

  useEffect(() => {
    dispatch(setIsFetchPeopleLoading(isLoading || isFetching));
  }, [isLoading, isFetching, dispatch]);

  return (
    <div className="search_page">
      <Controls />
      <Results />
      <ErrorButton />
      <DownloadArea />
    </div>
  );
}

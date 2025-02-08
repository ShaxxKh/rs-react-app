import { useEffect, useState } from 'react';
import Results from '../components/Results';
import { fetchPeople, Person } from '../api/users.api';
import Controls from '../components/Controls';
// import CustomError from '../common/errors/CustomError';
import Spinner from '../components/Spinner/Spinner';
import { useSearchParams } from 'react-router';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') ?? ''
  );
  const [results, setResults] = useState<Person[]>([]);
  // const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [isNextPage, setIsNextPage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  async function getPeopleAndUpdateResults(
    name?: string,
    page?: number
  ): Promise<void> {
    try {
      setLoading(true);
      const { results, next } = await fetchPeople(name, page);

      setResults(results);
      setIsNextPage(Boolean(next));
      // setError(null);
    } catch (error) {
      if (error instanceof Error) {
        // setError(error);
      }

      throw error;
    } finally {
      setLoading(false);
    }
  }

  // function handleErrorButtonClick() {
  //   setError(new CustomError('Error Button Clicked'));
  // }

  function setSearchTermToLocalStorage(searchTerm: string) {
    setSearchTerm(searchTerm);
    localStorage.setItem('searchTerm', searchTerm);
  }

  function handlePageChange(newPage: number) {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
  }

  useEffect(() => {
    getPeopleAndUpdateResults(searchTerm, page);
  }, [searchTerm, page]);

  // if (error) {
  //   throw error;
  // }

  return (
    <div className="search_page">
      <Controls
        searchTerm={searchTerm}
        handleSearchClick={async () =>
          await getPeopleAndUpdateResults(searchTerm)
        }
        setSearchTerm={setSearchTermToLocalStorage}
      />
      {loading ? (
        <Spinner />
      ) : (
        <Results
          results={results}
          currentPage={page}
          isNextPage={isNextPage}
          onPageChange={handlePageChange}
        />
      )}
      <button>Error Button</button>
    </div>
  );
}

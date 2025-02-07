import { useEffect, useState } from 'react';
import Results from '../components/Results';
import { fetchPeople, Person } from '../api/users.api';
import Controls from '../components/Controls';
import CustomError from '../common/errors/CustomError';
import Spinner from '../components/Spinner/Spinner';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Person[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  async function getPeopleAndUpdateResults(name?: string): Promise<void> {
    try {
      setLoading(true);
      const { results } = await fetchPeople(name);
      setLoading(false);
      setResults(results);
      setError(null);
    } catch (error) {
      setError(error as Error);
      throw error;
    }
  }

  async function handleSearchClick(): Promise<void> {
    await getPeopleAndUpdateResults(searchTerm);
  }

  function handleErrorButtonClick() {
    setError(new CustomError('Error Button Clicked'));
  }

  function setSearchTermToLocalStorage(searchTerm: string) {
    setSearchTerm(searchTerm);
    localStorage.setItem('searchTerm', searchTerm);
  }

  useEffect(() => {
    getPeopleAndUpdateResults(searchTerm);
  }, [searchTerm]);

  if (error) {
    throw error;
  }

  return (
    <div className="search_page">
      <Controls
        searchTerm={searchTerm}
        handleSearchClick={handleSearchClick}
        setSearchTerm={setSearchTermToLocalStorage}
      />
      {loading ? <Spinner /> : <Results results={results} />}
      <button onClick={handleErrorButtonClick}>Error Button</button>
    </div>
  );
}

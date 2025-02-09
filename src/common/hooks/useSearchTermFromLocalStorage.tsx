import { useEffect, useState } from 'react';

export default function useSearchTermToLocalStorage() {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') ?? ''
  );

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  return { searchTerm, setSearchTerm };
}

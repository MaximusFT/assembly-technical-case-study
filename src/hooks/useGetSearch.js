import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';

import { serializeFormQuery } from '../core/utils';
import { useGetSearchOrgQuery, useGetSearchUsersQuery } from '../core/api';
import useDebounce from './useDebounce';

function useGetSearch() {
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTerm = searchParams.get('term');
  const [searchTerm, setSearch] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  const useGetSearch = type === 'user' ? useGetSearchUsersQuery : useGetSearchOrgQuery;
  const { isLoading, isFetching, refetch } = useGetSearch(
    { searchTerm: currentTerm, type },
    { skip: !currentTerm || !type },
  );

  const updateParams = () => {
    setSearchParams(serializeFormQuery(searchParams, { term: debouncedSearchTerm }));
  };

  useEffect(() => {
    if (currentTerm?.length > 2) {
      refetch({ searchTerm: currentTerm, type });
      setSearch(currentTerm);
    }
  }, []);

  useEffect(() => {
    if (
      debouncedSearchTerm !== null &&
      debouncedSearchTerm?.length > 2 &&
      debouncedSearchTerm !== currentTerm
    ) {
      updateParams();
    }
  }, [debouncedSearchTerm, type]);

  useEffect(() => {
    if (debouncedSearchTerm !== null && debouncedSearchTerm?.length > 2) {
      updateParams();
    }
  }, [type]);

  return [searchTerm, setSearch, isLoading || isFetching];
}

export default useGetSearch;

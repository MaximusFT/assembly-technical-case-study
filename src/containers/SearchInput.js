import React from 'react';
import { useIntl } from 'react-intl';
import { Input } from 'antd';

import useGetSearch from '../hooks/useGetSearch';

const { Search } = Input;

const SearchInput = () => {
  const intl = useIntl();
  const [searchTerm, setSearch, isLoading] = useGetSearch();

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleSearch = value => {
    setSearch(value);
  };

  return (
    <Search
      value={searchTerm}
      className="ey-search"
      placeholder={intl.formatMessage({ id: 'Common.InputSearchTerm' })}
      enterButton={intl.formatMessage({ id: 'Common.Search' })}
      onSearch={handleSearch}
      onChange={handleChange}
      allowClear
      loading={isLoading}
    />
  );
};

export default SearchInput;

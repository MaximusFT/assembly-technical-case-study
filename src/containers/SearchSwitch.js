import React from 'react';
import { useParams } from 'react-router-dom';
import { Switch } from 'antd';

import Lang from '../components/Lang';
import { useNavigateSearch } from '../hooks/useNavigateSearch';

const SearchSwitch = () => {
  const { type } = useParams();
  const navigateSearch = useNavigateSearch();

  const onChangeSwitch = checked => {
    navigateSearch(`/search/${checked ? 'org' : 'user'}`);
  };

  return (
    <Switch
      className="ey-switch"
      checkedChildren={<Lang id="Common.Organization" />}
      unCheckedChildren={<Lang id="Common.User" />}
      onChange={onChangeSwitch}
      checked={type === 'org'}
    />
  );
};

export default SearchSwitch;

import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams, useParams, Outlet } from 'react-router-dom';
import { Avatar, Button, Card, List, Typography } from 'antd';

import Lang from '../components/Lang';
import IconLoad from '../components/IconLoad';
import RouteSuspense from '../components/RouteSuspense';
import { getSearchResultSelector } from '../core/selectors/github';
import useGetSearch from '../hooks/useGetSearch';
import { useNavigateSearch } from '../hooks/useNavigateSearch';

import { AppContext } from './App/services/AppContext';

const SearchResult = () => {
  const navigateSearch = useNavigateSearch();
  const { setVisibleDrawer } = useContext(AppContext);
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const [, , isLoading] = useGetSearch();
  const searchList = useSelector(getSearchResultSelector(type, searchParams.get('term')));

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const handlerChangeTerm = link => {
    navigateSearch(link);
  };

  return (
    <>
      <Card
        title={<Lang id="Common.SearchResults" />}
        extra={
          <Button onClick={showDrawer}>
            <Lang id="Common.History" />
          </Button>
        }
      >
        <List
          loading={isLoading}
          bordered
          size="small"
          dataSource={searchList}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <a key="repos" onClick={() => handlerChangeTerm(`popup/repos/${item.login}`)}>
                  <IconLoad src="repositories" />
                </a>,
                <a
                  key="followers"
                  onClick={() => handlerChangeTerm(`popup/followers/${item.login}`)}
                >
                  <IconLoad src="team" />
                </a>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <a href={item.html_url} target="_blank" rel="noreferrer">
                    <Avatar src={item.avatar_url} />
                  </a>
                }
              />
              <Typography.Paragraph copyable={item.login} className="flex-fill mb-0">
                {item.login}
              </Typography.Paragraph>
            </List.Item>
          )}
        />
      </Card>
      <RouteSuspense>
        <Outlet />
      </RouteSuspense>
    </>
  );
};

export default SearchResult;

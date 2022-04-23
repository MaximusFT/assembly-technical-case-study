import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Divider, List, Row } from 'antd';

import Lang from '../components/Lang';
import { useNavigateSearch } from '../hooks/useNavigateSearch';
import { getSearchHistorySelector } from '../core/selectors/github';

const SearchHistory = () => {
  const navigateSearch = useNavigateSearch();
  const historyList = useSelector(getSearchHistorySelector());

  const handlerChangeTerm = (type, term) => {
    navigateSearch(`/search/${type}`, { term });
  };

  return (
    <>
      <Divider orientation="left">
        <Lang id="Common.HistorySearchTerms" />
      </Divider>
      <Row justify="space-between" gutter={16}>
        <Col span={12}>
          <List
            header={<Lang id="Common.User" />}
            bordered
            dataSource={historyList.user}
            renderItem={item => (
              <List.Item key={item}>
                <a onClick={() => handlerChangeTerm('user', item)}>{item}</a>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <List
            header={<Lang id="Common.Organization" />}
            bordered
            dataSource={historyList.org}
            renderItem={item => (
              <List.Item key={item}>
                <a onClick={() => handlerChangeTerm('org', item)}>{item}</a>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default SearchHistory;

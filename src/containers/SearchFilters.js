import React from 'react';
import { Col, Row } from 'antd';

import SearchInput from './SearchInput';
import SearchSwitch from './SearchSwitch';

const SearchFilters = () => {
  return (
    <Row justify="center" gutter={[16, 16]}>
      <Col className="text-center text-md-end" xs={24} sm={24} md={8} lg={9} xl={10}>
        <SearchSwitch />
      </Col>
      <Col className="text-center text-md-start" xs={24} sm={24} md={16} lg={15} xl={14}>
        <SearchInput />
      </Col>
    </Row>
  );
};

export default SearchFilters;

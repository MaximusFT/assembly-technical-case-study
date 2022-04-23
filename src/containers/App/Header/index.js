import React from 'react';
import { Link } from 'react-router-dom';

import Col from 'antd/lib/col';
import Layout from 'antd/lib/layout';
import Row from 'antd/lib/row';

import LocaleToggle from '../../../components/LocaleToggle';
import Lang from '../../../components/Lang';

const Header = () => (
  <Layout.Header className="header">
    <Row justify="space-between" align="middle">
      <Col className="logo">
        <Link className="text-white" to="/">
          <Lang id="Common.GitHub" />
        </Link>
      </Col>
      <Col className="lang">
        <LocaleToggle />
      </Col>
    </Row>
  </Layout.Header>
);

export default Header;

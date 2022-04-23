import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { Col, Drawer, Layout, Row } from 'antd';

import RouteSuspense from '../../components/RouteSuspense';
import Lang from '../../components/Lang';
import SearchHistory from '../SearchHistory';
import SearchFilters from '../SearchFilters';

import { AppContext } from './services/AppContext';
import Header from './Header';
import Footer from './Footer';

const { Content } = Layout;

const AppLayout = () => {
  const { visibleDrawer, setVisibleDrawer } = useContext(AppContext);

  const onClose = () => {
    setVisibleDrawer(false);
  };

  return (
    <Layout>
      <Header />
      <Content className="py-4">
        <Row justify="center" gutter={[16, 16]}>
          <Col span={24} className="text-center">
            <SearchFilters />
          </Col>
          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <RouteSuspense>
              <Outlet />
            </RouteSuspense>
          </Col>
        </Row>
        <Drawer
          title={<Lang id="Common.HistorySearch" />}
          placement="right"
          onClose={onClose}
          visible={visibleDrawer}
        >
          <SearchHistory />
        </Drawer>
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;

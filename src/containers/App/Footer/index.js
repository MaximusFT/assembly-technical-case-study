import React from 'react';

import Typography from 'antd/lib/typography';
import Col from 'antd/lib/col';
import Layout from 'antd/lib/layout';
import Row from 'antd/lib/row';
import BackTop from 'antd/lib/back-top';

import Lang from '../../../components/Lang';

const { Paragraph } = Typography;

const Footer = () => (
  <Layout.Footer className="inverse">
    <Row type="flex" justify="space-center">
      <Col span={24}>
        <Paragraph className="copyright mt-4">
          © 2022 <Lang id="Common.GitHub" />
        </Paragraph>
      </Col>
    </Row>
    <BackTop />
  </Layout.Footer>
);

export default Footer;

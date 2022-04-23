import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import Spin from 'antd/lib/spin';

import Div from './Div';

const RouteSuspense = ({ children }) => (
  <Suspense
    fallback={
      <Div className="suspense-main">
        <Spin size="large" />
      </Div>
    }
  >
    {children}
  </Suspense>
);

RouteSuspense.propTypes = {
  children: PropTypes.any,
};

export default RouteSuspense;

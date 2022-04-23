import React from 'react';
import PropTypes from 'prop-types';

const Div = ({ children, ...props }) => React.createElement('div', props, children);

Div.propTypes = {
  children: PropTypes.any,
};

export default Div;

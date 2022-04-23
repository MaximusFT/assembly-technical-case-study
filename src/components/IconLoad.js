import React from 'react';
import PropTypes from 'prop-types';

import { createFromIconfontCN } from '@ant-design/icons';

import { mergeClassNames } from '../core/utils';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2686019_2ykw4ew7c4l.js',
});

const IconLoad = ({ className, props, src }) => {
  return (
    <IconFont
      type={`icon-${src}`}
      {...props}
      className={mergeClassNames('svg-container', className)}
    />
  );
};

IconLoad.propTypes = {
  className: PropTypes.any,
  src: PropTypes.any,
  props: PropTypes.any,
};

export default IconLoad;

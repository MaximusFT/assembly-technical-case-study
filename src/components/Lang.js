import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { callbackLangProxy } from './Language/LanguageProvider';

const Lang = props => (
  <FormattedMessage {...props} defaultMessage={callbackLangProxy(null, props.id)} />
);

Lang.propTypes = {
  id: PropTypes.any,
};

export default Lang;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import DownOutlined from '@ant-design/icons/lib/icons/DownOutlined';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';

import { appLocales, appLocalesSelect } from './Language/LanguageProvider';
import { changeLocale } from './Language/actions';
import { makeSelectLocale } from './Language/selectors';
import { DEFAULT_LOCALE } from './Language/constants';
import Lang from './Lang';

const localeSelector = createSelector(makeSelectLocale(), locale => locale);

const LocaleToggle = () => {
  const locale = useSelector(localeSelector);
  const dispatch = useDispatch();
  const localeHandler = event => dispatch(changeLocale(event.key));

  const menu = () => (
    <Menu onClick={localeHandler}>
      {appLocales.map(item => (
        <Menu.Item key={item}>
          {appLocalesSelect[item].id ? <Lang id={appLocalesSelect[item].id} /> : item}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown
      overlayClassName="LocaleToggle-overlay"
      className="LocaleToggle"
      trigger="click"
      overlay={menu}
    >
      <Button>
        {appLocalesSelect[locale || DEFAULT_LOCALE].flag}
        <span className="text-uppercase mx-2">{locale}</span>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default LocaleToggle;

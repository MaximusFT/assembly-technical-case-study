import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import SearchResult from '../SearchResult';
import PopupRepos from '../PopupRepos';

import AppLayout from './AppLayout';

import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles.css';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/search/user" />} />
        <Route path="search/:type" element={<SearchResult />}>
          <Route path="popup/:modalType/:login" element={<PopupRepos />} />
          <Route path="popup/:modalType/:login" element={<PopupRepos />} />
        </Route>
        <Route path="*" element={<Navigate to="/search/user" />} />
        {/* <GetParameterPopups /> */}
      </Route>
    </Routes>
  );
};

export default App;

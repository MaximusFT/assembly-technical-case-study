import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './containers/App/services/AppProvider';
import LanguageProvider from './components/Language/LanguageProvider';
import { setupStore } from './core/store';

const store = setupStore();

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <LanguageProvider>
      <BrowserRouter>
        <AppProvider />
      </BrowserRouter>
    </LanguageProvider>
  </Provider>,
);

import React, { useState } from 'react';

import App from '../index';
import { AppContext } from './AppContext';

const AppProvider = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);

  const contextValue = {
    visibleDrawer,
    setVisibleDrawer,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <App />
    </AppContext.Provider>
  );
};

export default AppProvider;

import React from 'react';
import App from './App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store/ConfigureStore.js';
import 'antd/dist/antd.js';
import '/src/main.css';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);

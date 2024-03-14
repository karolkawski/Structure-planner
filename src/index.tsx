import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'flowbite';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store'; // Import store'a
import { Helmet } from 'react-helmet';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Structure planner</title>
      <meta
        name="description"
        content="Efficiently organize your day with Structure Planner, the user-friendly app designed for seamless task management and timeline tracking."
      />
    </Helmet>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

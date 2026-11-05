import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import { moduleRoute } from './legacy-routes';

const module = moduleRoute(location.hash);
if (module)
  location.replace(new URL('v6.html', location.href).pathname + location.search + '#' + module);
else
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );

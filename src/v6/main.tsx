import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { canonicalLegacyRoute } from '../legacy-routes';
import './styles.css';
if (/^#\/(missao|recurso)\//.test(location.hash) && !canonicalLegacyRoute(location.hash)) {
  location.replace('./biblioteca.html' + location.hash);
} else
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );

import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client
import { Provider } from 'react-redux'; // Importa Provider
import store from './store'; // Importa el store de Redux
import App from './App.jsx'; // Importa tu componente App
import './index.css';

//renderizamos la aplicacion
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

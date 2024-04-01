
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Importa Provider
import store from './store'; // Importa el store de Redux
import App from './App.jsx'; // Importa tu componente App
import './index.css';

//renderizamos la aplicacion
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <Provider store={store}> {/*esto hacemos para q tanto App como sus hijos tengan acceso al store de Redux y puedan acceder al estado global*/}
      <App />
    </Provider>
  </React.StrictMode>
);


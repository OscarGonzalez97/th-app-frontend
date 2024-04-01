//para manejar el estado de autentiación , necesitamos almacenar
//el estado y poder acceder a él y a sus componentes, para eso
//utilizamos el store
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer'; // Importamos el  único reducer

// Configuramos el store de Redux utilizando configureStore
const store = configureStore({
  reducer: authReducer // Pasamos el reducer que tenemos
});

export default store;

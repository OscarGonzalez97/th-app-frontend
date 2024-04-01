//aca lo que hacemos es definir la forma en la que se
//va actualizar el estado cuando se reciba el token


// Define el estado inicial del token de sesión
const initialState = { //aca estamos definiendo un objeto de estado 
    token: null, //con la propiedad token que inicializamos en null
  };
  
  // Define el reducer para manejar las acciones relacionadas con el token de sesión
  const authReducer = (state = initialState, action) => {
    switch (action.type) { //utilizamos para manejar 2 tipos de acciones (en este caso SET_TOKEN Y CLEAR_TOKEN)
      // Acción para establecer el token de sesión en el estado
      case 'SET_TOKEN': 
        return { ...state, token: action.payload }; // devuelve un nuevo estado que incluye el token proporcionado por action.payload
      // Acción para limpiar (eliminar) el token de sesión del estado
      case 'CLEAR_TOKEN':
        return { ...state, token: null }; // y aca devuelve un nuevo estado don el token =  null , indicando que no hay ningun token de sesion
      default:
        return state; //si la accion no coincide con ninguna de las acciones anteriores devuelve el estado sin modificar 
    }
  };
  
  export default authReducer;
  

  //NOTA: asi accedemos al token desde otro lado
 // const token = useSelector(state => state.auth.token);
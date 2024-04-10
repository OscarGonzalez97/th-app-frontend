import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditarPostulante() {
    const token = useSelector(state => state.token); //para extraer el calor del token del store

    const { id } = useParams(); //para extraer el ID de la URL 
    const [datosAPI, setDatosAPI] = useState(null); //para guardar los datos que nos devuelve la API del id correspondiente 

    useEffect(() => {
        // Función para obtener todos los datos de la API
        async function fetchData() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/postulante/{id}`);
            setDatosAPI(response.data); // Almacenar todos los datos en la variable de estado
        } catch (error) {
            console.error('Error al obtener los datos de la API:', error);
        }
        }
        fetchData(); // Llamar a la función para obtener datos cuando el componente se monta
    }, []); // Este efecto se ejecutará solo una vez al montar el componente

    return (
        <form>
        {/* Renderizar los campos del formulario con los datos de la API */}
        {datosAPI && (
            <>
            {/* Utilizar los datos almacenados para llenar el formulario */}
            <input type="text" value={datosAPI.campo1} onChange={(e) => console.log(e.target.value)} />
            <input type="text" value={datosAPI.campo2} onChange={(e) => console.log(e.target.value)} />
            {/* Agrega más campos según sea necesario */}
            </>
        )}
        <button type="submit">Enviar</button>
        </form>
    );
    }

    export default EditarPostulante;

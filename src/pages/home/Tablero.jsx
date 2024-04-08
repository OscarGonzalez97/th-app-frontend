import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

function Tablero() {
    const token = useSelector(state => state.token);

    const [estados, setEstados] = useState([]);
    const [postulantes, setPostulantes] = useState([]);

    useEffect(() => {
        if (token) {
            axios.get(`${import.meta.env.VITE_API_URL}/v1/estados`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => setEstados(response.data))
                .catch(error => console.error(error));

            axios.get(`${import.meta.env.VITE_API_URL}/v1/postulante`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if(response.data != "No hay postulantes disponibles en este momento."){
                        setPostulantes(response.data)
                    }
                })
                .catch(error => console.error(error));
        }
    }, []);

    return (
        <div className="tablero">
            {estados.map(estado => (
                <div key={estado.id_estado} className="columna">
                    <h2>{estado.estado}</h2>
                    {postulantes.length !== 0 && postulantes
                        .filter(postulante => postulante.estado.id_estado === estado.id_estado)
                        .map(postulante => (
                            <div key={postulante.id_postulante} className="postulante">
                                <p>{postulante.nombre} {postulante.apellido}</p>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}

export default Tablero;

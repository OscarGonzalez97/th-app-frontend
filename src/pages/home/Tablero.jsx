import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tablero() {
    const [estados, setEstados] = useState([]);
    const postulantes = [
        { id: 1, nombre: 'John', apellido: 'Doe', estado_id: 1 },
        { id: 2, nombre: 'Jane', apellido: 'Smith', estado_id: 2 },
        { id: 3, nombre: 'Michael', apellido: 'Johnson', estado_id: 3 },
        { id: 4, nombre: 'Emily', apellido: 'Brown', estado_id: 4 },
        { id: 5, nombre: 'Daniel', apellido: 'Miller', estado_id: 5 },
        { id: 6, nombre: 'Olivia', apellido: 'Davis', estado_id: 6 },
        { id: 7, nombre: 'David', apellido: 'Garcia', estado_id: 3 },
        { id: 8, nombre: 'Sophia', apellido: 'Rodriguez', estado_id: 5 },
        { id: 9, nombre: 'Joseph', apellido: 'Wilson', estado_id: 6 },
        { id: 10, nombre: 'Abigail', apellido: 'Martinez', estado_id: 3 },
    ];

    useEffect(() => {
        axios.get('http://localhost:8080/thbackend/v1/estados')
            .then(response => setEstados(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="tablero">
            {estados.map(estado => (
                <div key={estado.id_estado} className="columna">
                    <h2>{estado.estado}</h2>
                    {postulantes
                        .filter(postulante => postulante.estado_id === estado.id_estado)
                        .map(postulante => (
                            <div key={postulante.id} className="postulante">
                                <p>{postulante.nombre} {postulante.apellido}</p>
                            </div>
                        ))}
                </div>
            ))}
        </div>
    );
}

export default Tablero;

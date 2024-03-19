import React from 'react';
import '../pages/PostulanteForm.css';
import imagen from '../imagenes/prog_backend.png';

const PostulanteForm = () => {
    return (
        <div className="postulante-container">
            <h1>Título</h1>
            <h2>Descripción</h2>
            <img src={imagen} alt="Vacante" className="img-fluid" />

            <h4>Datos Personales</h4>
            <h6>Todos los campos con (*) deben estar rellenados</h6>

            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre *</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" 
                    placeholder="Ingrese su nombre"/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="apellido" className="form-label">Apellido *</label>
                    <input type="text" className="form-control" id="apellido" name="apellido" 
                    placeholder="Ingrese su apellido"/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input type="email" className="form-control" id="email" name="email" 
                    placeholder="Ingrese su email"/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="nacionalidad" className="form-label">Nacionalidad</label>
                    <select id="nacionalidad" className="form-select" name="nacionalidad">
                        <option value="py">Paraguay</option>
                        <option value="ar">Argentina</option>
                        <option value="br">Brasil</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="tipo_documento" className="form-label">Tipo de documento</label>
                    <select id="tipo_documento" className="form-select" name="tipo_documento">
                        <option value="ci">Cédula de Identidad</option>
                        <option value="pass">Pasaporte</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="nro_documento" className="form-label">Número de documento *</label>
                    <input type="text" className="form-control" id="nro_documento" name="nro_documento" 
                    placeholder="Ingrese su número de documento"/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="departamento" className="form-label">Departamento</label>
                    <select id="departamento" className="form-select" name="departamento">
                        <option value="cap">Capital</option>
                        <option value="cen">Central</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="ciudad" className="form-label">Ciudad</label>
                    <select id="ciudad" className="form-select" name="ciudad">
                        <option value="asu">Asunción</option>
                        <option value="fdo">Fernando de la Mora</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="direccion" className="form-label">Dirección *</label>
                    <input type="text" className="form-control" id="direccion" name="direccion" 
                    placeholder="Ingrese su dirección"/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="telefono" className="form-label">Teléfono *</label>
                    <input type="text" className="form-control" id="telefono" name="telefono" 
                    placeholder="Ingrese su número de teléfono"/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="fecha_nacimiento" className="form-label">Fecha de nacimiento *</label>
                    <input type="date" className="form-control" id="fecha_nacimiento" name="fecha_nacimiento" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="cargar_cv" className="form-label">Cargar CV</label>
                    <input type="file" className="form-control" id="cargar_cv" name="cargar_cv" />
                </div>

                <div className="col-md-6">
                    <label htmlFor="nivel_ingles" className="form-label">Nivel de inglés</label>
                    <select id="nivel_ingles" className="form-select" name="nivel_ingles">
                        <option value="basico">Básico</option>
                        <option value="intermedio">Intermedio</option>
                        <option value="avanzado">Avanzado</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="estado_civil" className="form-label">Estado civil</label>
                    <select id="estado_civil" className="form-select" name="estado_civil">
                        <option value="soltero">Soltero/a</option>
                        <option value="casado">Casado/a</option>
                        <option value="divorciado">Divorciado/a</option>
                        {/* Agrega más opciones según sea necesario */}
                    </select>
                </div>


                <div className="col-12">
                    <h4>Cargos *</h4>

                </div>

                <div className="col-12">
                    <h4>Estudios</h4>

                </div>

                <div className="col-12">
                    <h4>Tecnologías *</h4>

                </div>

                <div className="col-12">
                    <h4>Otras Tecnologías</h4>
                    <textarea className="form-control" id="otras_tecnologias" name="otras_tecnologias" 
                    placeholder="Si tienes alguna tecnología que no figura en la sección anterior. Escribelo aquí." rows="3"></textarea>
                </div>

                <div className="col-12">
                    <h4>Experiencias</h4>

                </div>

                <div className="col-12">
                    <h4>Referencia Personal</h4>

                </div>


                <div className="col-12 d-flex justify-content-end">
                    <button type="button" className="btn btn-danger me-2">Cancelar</button>
                    <button type="submit" className="btn btn-success">Guardar</button>
                </div>
            </form>
        </div>
    );
}

export default PostulanteForm;

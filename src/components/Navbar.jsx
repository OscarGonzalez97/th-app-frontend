import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoImage from "../imagenes/logo.png"
import { faGbp, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import HoverNavDropdown from './DropdownItem';

const NavBar = () => {

  const [show, setShow] = useState(false);

  const removeToken = () => {
    localStorage.removeItem('token');
   
  }

  return (
    <>
      <Navbar className="navBg"
        variant="dark"
        expand="lg"
        style={{ backgroundColor: '#0B316E', padding: '5px' }}>


        <Container fluid>

          <Navbar.Brand as={Link}
            to="/">
            <img
              src={LogoImage}
              width="30"
              height="30"
              className="d-inline-block align-top rounded-circle"
              alt="Logo"
              style={{ marginRight: '10px' }} />
            ROSHKA
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="ml-auto">

              <HoverNavDropdown title="Convocatorias" id="convo-dropdown">
                <NavDropdown.Item as={Link} to="/convocatoria">Agregar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cargos/listarco">Listar</NavDropdown.Item>
              </HoverNavDropdown>
              {/* 
              <HoverNavDropdown title="Postulante" id="post-dropdown">
                <NavDropdown.Item as={Link} to="/postulante/listar">Listar</NavDropdown.Item>
              </HoverNavDropdown> */}

              <Nav.Link as={Link}
                to="/postulante/listar">
                Postulantes
              </Nav.Link>

              <HoverNavDropdown title="Beneficios" id="beneficios-dropdown">

                <NavDropdown.Item as={Link} to="/beneficios">Agregar</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/beneficios/listar">Listar</NavDropdown.Item>
              
              </HoverNavDropdown>

              <NavDropdown className="d-md-none d-md-block align-items-center"
                title={
                  <>
                    <div className='d-flex gap-1 h6  align-items-center'>
                      <FontAwesomeIcon icon={faGear} style={{ fontSize: '24px', marginRight: '5px' }} />
                      <h6 className="m-0">Configuracion</h6>
                    </div>
                  </>}
                id="beneficios-dropdown">

                <NavDropdown.Item as={Link} to="/tecnologia">Tecnologias</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cambiarcontraseña">Restablecer Contraseñas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/usuario">Usuarios permitidos</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link className='d-lg-none d-lg-block align-items-center' as={Link} to="/login">
                <div className='d-flex gap-1 h6  align-items-center'>
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: '24px' }} />
                  <h6 className="m-0">Salir</h6>
                </div>
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>


          <Nav className='d-none d-lg-flex' >
            <NavDropdown className="d-flex flex-row" align={{ lg: 'end' }} title={<FontAwesomeIcon icon={faGear} style={{ fontSize: '24px', marginRight: '5px' }} />} id="beneficios-dropdown">
              <NavDropdown.Item as={Link} to="/tecnologia">Tecnologias</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cambiarcontraseña">Restablecer Contraseñas</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/usuario">Usuarios permitidos</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link className='d-none d-sm-block' as={Link}
              onClick={removeToken}
              to="/login">
          <div className='d-flex gap-2 h6  align-items-center'>
                  <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: '24px' }} />
                  <h6 className="m-0">Salir</h6>
                </div>          
              </Nav.Link>
          </Nav>


        </Container>
      </Navbar>


      {/* CSS to hide the dropdown toggle arrow */}
      <style>{`
        .dropdown-toggle::after {
          display: none !important;
        }
        .dropdown-menu{
          margin-top:0px !important;
        }
       
      `}</style>

    </>
  );
};

export default NavBar;

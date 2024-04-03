import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoImage from "../imagenes/logo.png"
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = () => {
  return (
    <>
      <Navbar className="navBg "
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

              <NavDropdown title="Convocatorias"
                id="convo-dropdown">
                <NavDropdown.Item as={Link}
                  to="/convocatoria">Agregar
                </NavDropdown.Item>

                <NavDropdown.Item as={Link}
                  to="/cargos/listarco ">Listar
                </NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="Tecnologías"
                id="tec-dropdown">
                <NavDropdown.Item as={Link}
                  to="/tecnologia">Agregar
                </NavDropdown.Item>

                <NavDropdown.Item as={Link}
                  to="/tecnologia/listar">Listar
                </NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="Postulante"
                id="post-dropdown">
                <NavDropdown.Item as={Link}
                  to="/postulante/listar">Listar
                </NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="Beneficios"
                id="beneficios-dropdown">
                <NavDropdown.Item as={Link}
                  to="/beneficios">Agregar
                </NavDropdown.Item>

                <NavDropdown.Item as={Link}
                  to="/beneficios/listar">Listar
                </NavDropdown.Item>
              </NavDropdown>


              <NavDropdown title="Usuarios permitidos"
                id="usuario-dropdown">
                <NavDropdown.Item as={Link}
                  to="/usuario">Agregar
                </NavDropdown.Item>

                <NavDropdown.Item as={Link}
                  to="/usuarios/listar">Listar
                </NavDropdown.Item>
              </NavDropdown>


              <Nav.Link as={Link}
                to="/cambiarcontraseña">Restablecer Contraseña
              </Nav.Link>


              <Nav.Link as={Link}
                to="/login">
                <FontAwesomeIcon icon={faRightFromBracket} style={{ fontSize: '24px' }} />
              </Nav.Link>

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;

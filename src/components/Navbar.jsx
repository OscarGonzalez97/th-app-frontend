import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoImage from "../imagenes/ima.png"

const NavBar = () => {
  return (
    <>
      <Navbar className="navBg"
        variant="dark"
        expand="lg"
        style={{backgroundColor: '#0B316E' , padding: '2px' }}>
 
          





      

        <Container>
          <Navbar.Brand as={Link}
            to="/">
             
            <img
              src={LogoImage}
              width="30"
              height="30"
              className="d-inline-block align-top rounded-circle"
              alt="Logo"
              style={{ marginRight: '10px' }}/>
            ROSHKA
            
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link}
                to="/">Home
              </Nav.Link>

              <NavDropdown title="Convocatorias"
                id="convo-dropdown">
                <NavDropdown.Item as={Link}
                  to="/convo/agregar">Agregar
                </NavDropdown.Item>
                
                <NavDropdown.Item as={Link}
                  to="/cargos/listarco ">Listar convocatorias
                </NavDropdown.Item>

              </NavDropdown>
              <NavDropdown title="Tecnologías"
                id="tec-dropdown">
                <NavDropdown.Item as={Link}
                  to="/tecnologias/agregar">Agregar
                </NavDropdown.Item>
                <NavDropdown.Item as={Link}
                  to="/tecnologias/listar">Listar
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Postulante"
                id="post-dropdown">
                <NavDropdown.Item as={Link}
                  to="/postulante/listar">Listar
                </NavDropdown.Item>
                <NavDropdown.Item as={Link}
                  to="/postulante/resumen">Resumen
                </NavDropdown.Item>
              </NavDropdown>

             


              <Nav.Link as={Link}
                to="/editarperfil">Editar Perfil
              </Nav.Link>

              <Nav.Link as={Link}
                to="/salir">Salir
              </Nav.Link>

            </Nav>
            

            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};


export default NavBar;

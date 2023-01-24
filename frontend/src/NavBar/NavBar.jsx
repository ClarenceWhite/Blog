import "./NavBar.css";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import logo from '../images/signature_en.png'


const NavBar = () => {

    return (
        <div className="nav_container">
            <Navbar bg="light" variant="light">
                <Container>
                    <div className="nav-logo">
                        <Navbar.Brand href="/" className="logo">
                            <img
                                src={logo}
                                // width="60"
                                height="60"
                                className="d-inline-block align-middle"
                            />
                        </Navbar.Brand>
                        <p className="fs-2 fw-bold d-inline-block align-middle"></p>
                    </div>
                    <div className="nav-links">
                        <Navbar.Collapse className="navbar-items">
                            <Nav className="me-auto">
                                <Nav.Link href="https://profolio-two.vercel.app/" className="fs-3 d-inline-block align-middle">
                                    About
                                </Nav.Link>
                                <NavDropdown title="Blogs" id="basic-nav-dropdown" className="fs-3 d-inline-block align-middle">
                                    <NavDropdown.Item href="/blog/reading">
                                        Reading
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/blog/music">
                                        Music
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/blog/tech">
                                        Tech
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href="/compose" className="fs-3 d-inline-block align-middle">
                                    Compose
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar;
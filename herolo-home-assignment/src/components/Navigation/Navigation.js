import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

export default function Navigation({ title, links }) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>{title}</Navbar.Brand>
                <Nav className="me-auto">
                    {links.map((link, index) =>
                        <NavLink
                            key={link + index}
                            to={link.to}
                            activeStyle={{
                                fontWeight: "bold",
                                textDecoration: "none",
                                color: "lightgray",
                                paddingLeft: "15px",
                                paddingRight: "15px"
                            }}>
                            {link.label}
                        </NavLink>)}
                </Nav>
            </Container>
        </Navbar>
    )
}
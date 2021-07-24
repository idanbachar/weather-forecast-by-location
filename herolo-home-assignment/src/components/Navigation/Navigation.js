import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

export default function Navigation({ title, links }) {

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>{title}</Navbar.Brand>
                <Nav>
                    {links.map((link, index) =>
                        <NavLink
                            className="inactive"
                            activeClassName="active"
                            key={index}
                            to={link.to}
                        >
                            {link.label}
                        </NavLink>

                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navigation({ title, links }) {

    const themeColor = useSelector(state => state.themeColor);

    return (

        <Navbar collapseOnSelect expand="lg" bg={themeColor} variant={themeColor}>
            <Container>
                <Navbar.Brand>{title}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto" />
                    <Nav>
                        {links.map((link, index) =>
                            <Link
                                key={index}
                                className="nav-link"
                                to={link.to}
                            >
                                {link.label}
                            </Link>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >

    )
}
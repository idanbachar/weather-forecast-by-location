import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from 'react-router-dom';

export default function Navigation({ links }) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Herolo Weather Task</Navbar.Brand>
                <Nav className="me-auto">
                    {links.map(link =>
                        <NavLink
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
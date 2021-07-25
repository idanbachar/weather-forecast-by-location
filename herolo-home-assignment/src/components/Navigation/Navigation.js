import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import TempUnitToggle from '../TempUnitToggle/TempUnitToggle';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useSelector } from 'react-redux';

export default function Navigation({ title, links }) {

    const themeColor = useSelector(state => state.themeColor) || 'L';
    const themeDisplay = themeColor === 'D' ? "dark" : "light";

    return (
        <Navbar bg={themeDisplay} variant={themeDisplay}>
            <Container>
                <Navbar.Brand>{title}</Navbar.Brand>
                <Nav>
                    <TempUnitToggle />
                </Nav>
                <Nav>
                    <ThemeToggle />
                </Nav>
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
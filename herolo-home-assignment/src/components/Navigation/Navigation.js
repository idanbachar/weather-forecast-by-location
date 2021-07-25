import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Navigation({ title, links }) {

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const dispatch = useDispatch();

    const radios = [
        { name: 'Celsius', value: 'C' },
        { name: 'Fahrenheit', value: 'F' },
    ];

    const changeForcastUnit = (event) => {

        setRadioValue(event.currentTarget.value);
        dispatch({
            type: 'UPDATE',
            payload: event.currentTarget.value
        })
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>{title}</Navbar.Brand>
                <Nav>
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={radio.value === "F" ? 'outline-success' : 'outline-danger'}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => changeForcastUnit(e)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
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
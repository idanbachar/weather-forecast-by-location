import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ThemeToggle() {
    const dispatch = useDispatch();
    const [theme, setTheme] = useState('light');

    const themes = [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
    ];

    const changeTheme = (event) => {
        dispatch({
            type: 'CHANGE',
            payload: event.currentTarget.value
        })
        setTheme(event.currentTarget.value);
    }

    return (
        <ButtonGroup>
            <span style={{
                marginRight: '10px'
            }}>
                Theme:
            </span>
            {themes.map((unit, index) => (
                <ToggleButton
                    key={index}
                    id={`radio-theme-${index}`}
                    type="radio"
                    variant={`outline-${unit.value}`}
                    name="radio-theme"
                    value={unit.value}
                    checked={theme === unit.value}
                    onChange={(e) => changeTheme(e)}
                >
                    {unit.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    )
}
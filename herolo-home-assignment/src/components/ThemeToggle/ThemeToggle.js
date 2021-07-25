import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ThemeToggle() {

    const dispatch = useDispatch();

    const [checked, setChecked] = useState(true);
    const [radioValue, setRadioValue] = useState('light');

    const themes = [
        { name: 'Light', value: 'light' },
        { name: 'Dark', value: 'dark' },
    ];

    const changeTheme = (event) => {

        dispatch({
            type: 'CHANGE',
            payload: event.currentTarget.value
        })

        setRadioValue(event.currentTarget.value);
    }

    return (
        <ButtonGroup>
            {themes.map((unit, index) => (
                <ToggleButton
                    key={index}
                    id={`radio-theme-${index}`}
                    type="radio"
                    variant={unit.value === "light" ? 'outline-success' : 'outline-danger'}
                    name="radio-theme"
                    value={unit.value}
                    checked={radioValue === unit.value}
                    onChange={(e) => changeTheme(e)}
                >
                    {unit.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    )
}
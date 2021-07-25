import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ThemeToggle() {

    const dispatch = useDispatch();

    const [checked, setChecked] = useState(true);
    const [radioValue, setRadioValue] = useState('L');

    const themes = [
        { name: 'Light', value: 'L' },
        { name: 'Dark', value: 'D' },
    ];

    const changeForcastUnit = (event) => {

        setRadioValue(event.currentTarget.value);

        dispatch({
            type: 'CHANGE',
            payload: event.currentTarget.value
        })
    }

    return (
        <ButtonGroup>
            {themes.map((unit, index) => (
                <ToggleButton
                    key={index}
                    id={`radio-theme-${index}`}
                    type="radio"
                    variant={unit.value === "L" ? 'outline-success' : 'outline-danger'}
                    name="radio-theme"
                    value={unit.value}
                    checked={radioValue === unit.value}
                    onChange={(e) => changeForcastUnit(e)}
                >
                    {unit.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    )
}
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function TempUnitToggle() {

    const dispatch = useDispatch();

    const [checked, setChecked] = useState(true);
    const [radioValue, setRadioValue] = useState('C');

    const units = [
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
        <ButtonGroup>
            {units.map((unit, index) => (
                <ToggleButton
                    key={index}
                    id={`radio-${index}`}
                    type="radio"
                    variant={unit.value === "F" ? 'outline-success' : 'outline-danger'}
                    name="radio"
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
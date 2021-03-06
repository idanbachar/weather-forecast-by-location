import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function TempUnitToggle() {
    const dispatch = useDispatch();
    const [tempUnit, setTempUnit] = useState('C');

    const units = [
        { name: '°C', value: 'C' },
        { name: '°F', value: 'F' },
    ];

    const changeForcastUnit = (event) => {
        dispatch({
            type: 'UPDATE',
            payload: event.currentTarget.value
        })
        setTempUnit(event.currentTarget.value);
    }

    return (
        <ButtonGroup>
            <span style={{
                marginRight: '10px'
            }}>
                Temp:
            </span>
            {units.map((unit, index) => (
                <ToggleButton
                    key={index}
                    id={`radio-${index}`}
                    type="radio"
                    variant={unit.value === "C" ? 'outline-success' : 'outline-danger'}
                    name="radio"
                    value={unit.value}
                    checked={tempUnit === unit.value}
                    onChange={(e) => changeForcastUnit(e)}
                >
                    {unit.name}
                </ToggleButton>
            ))}
        </ButtonGroup>
    )
}
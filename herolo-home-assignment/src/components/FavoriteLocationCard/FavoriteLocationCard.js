import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function FavoriteLocationCard({ weatherData }) {

    const temperature_unit = useSelector(state => state.forcastUnit) || 'C';

    const current_temp_by_unit = temperature_unit === 'C' ?
        weatherData.temperature_c :
        weatherData.temperature_f

    return (
        <>
            <Link to={`/location/${weatherData.id}`} style={{ textDecoration: 'none' }}>
                <Card>
                    <Card.Header>
                        {weatherData.name}
                    </Card.Header>
                    <Card.Img variant="top" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/sun-in-blue-sky-with-clouds-tomch.jpg" />
                    <Card.Body>
                        <Card.Text>
                            {weatherData.weather_text}
                        </Card.Text>
                        <Card.Text>
                            {Math.round(current_temp_by_unit)}°{temperature_unit}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}
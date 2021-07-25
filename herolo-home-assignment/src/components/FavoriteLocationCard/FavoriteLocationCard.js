import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function FavoriteLocationCard({ weatherData }) {

    const temperatureUnit = useSelector(state => state.forcastUnit);
    const themeColor = useSelector(state => state.themeColor);
    const currentTempByUnit = temperatureUnit === 'C' ? weatherData.temperature_c : weatherData.temperature_f;

    return (
        <Link to={`/location/${weatherData.id}`} style={{ textDecoration: 'none' }}>
            <Card
                bg={themeColor}
                text={themeColor === 'light' ? 'dark' : 'light'}
                className="text-center"
            >
                <Card.Header>
                    <h2>{weatherData.name}</h2>
                </Card.Header>
                <Card.Img variant="top" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/sun-in-blue-sky-with-clouds-tomch.jpg" />
                <Card.Body>
                    <Card.Text style={{ fontSize: '25px' }}>
                        <strong>{weatherData.weather_text}</strong>
                    </Card.Text>
                    <Card.Text style={{ fontSize: '2rem' }}>
                        <strong>{Math.round(currentTempByUnit)}°{temperatureUnit}</strong>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}
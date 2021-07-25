import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function FavoriteLocationCard({ weatherData }) {

    const temperature_unit = useSelector(state => state.forcastUnit) || 'C';
    const themeColor = useSelector(state => state.themeColor) || 'L';

    const current_temp_by_unit = temperature_unit === 'C' ? weatherData.temperature_c : weatherData.temperature_f;

    return (
        <>
            <Link to={`/location/${weatherData.id}`} style={{ textDecoration: 'none' }}>
                <Card
                    bg={themeColor === 'L' ? 'light' : 'dark'}
                    text={themeColor === 'L' ? 'dark' : 'light'}
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
                            <strong>{Math.round(current_temp_by_unit)}°{temperature_unit}</strong>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}
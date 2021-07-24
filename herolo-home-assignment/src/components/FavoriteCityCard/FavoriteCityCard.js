import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export default function FavoriteCityCard({ weatherData }) {
    return (
        <>
            <Link to={`/city/${weatherData.id}`} style={{ textDecoration: 'none' }}>
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
                            {weatherData.temperature_c} C
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </>
    )
}
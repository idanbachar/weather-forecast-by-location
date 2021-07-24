import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ForcastCard from '../ForcastCard/ForcastCard';
import Button from 'react-bootstrap/Button';

export default function CityCardDetailed({ weatherData, handleFavorite }) {

    if (weatherData === undefined)
        return null;

    function FavoriteButton() {
        return (
            <Button
                variant={!weatherData.isFavorite ? 'success' : 'danger'}
                onClick={() => !weatherData.isFavorite ? handleFavorite("ADD") : handleFavorite("REMOVE")}
            >
                {!weatherData.isFavorite ? "Add to favorites" : "Remove from favorites"}
            </Button>
        )
    }

    return (
        <Card>

            <Card.Body>
                <h1>{weatherData.name}</h1>
                <h2>{weatherData.temperature_c}° C</h2>
                <h1>{weatherData.weather_text}</h1>
                <Card.Text>
                    <FavoriteButton />
                </Card.Text>
                <Row xs={1} md={5} className="g-5">
                    {weatherData.five_days_daily_forcasts.map((forcast, index) => (
                        <Col key={index}>
                            <ForcastCard
                                date={forcast.Date}
                                temperature={forcast.Temperature}
                            />
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card >
    )
}
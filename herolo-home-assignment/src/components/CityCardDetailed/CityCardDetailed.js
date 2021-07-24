import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ForcastCard from '../ForcastCard/ForcastCard';
import Button from 'react-bootstrap/Button';

export default function CityCardDetailed({ weatherData, handleAddFavorite, handleRemoveFavorite }) {

    if (weatherData === undefined)
        return null;

    function FavoriteButton() {
        return (
            <Button
                variant={!weatherData.isFavorite ? 'success' : 'danger'}
                onClick={!weatherData.isFavorite ? handleAddFavorite : handleRemoveFavorite}
            >
                {!weatherData.isFavorite ? "Add to favorites" : "Remove from favorites"}
            </Button>
        )
    }

    return (
        <Card>
            <Card.Text>
                <p align="left">
                    <h1>{weatherData.name}</h1>
                    <h2>{weatherData.temperature_c}° C</h2>
                </p>
            </Card.Text>
            <Card.Body>
                <Card.Text>
                    <h1>{weatherData.weather_text}</h1>
                </Card.Text>
                <Card.Text>
                    <FavoriteButton />
                </Card.Text>

                <Row xs={1} md={5} className="g-5">
                    {weatherData.five_days_daily_forcasts.map((forcast, index) => (
                        <Col>
                            <ForcastCard
                                key={index}
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
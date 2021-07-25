import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ForcastCard from '../ForcastCard/ForcastCard';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

export default function LocationCardDetailed({ weatherData, handleFavorite }) {
    const temperatureUnit = useSelector(state => state.forcastUnit);
    const themeColor = useSelector(state => state.themeColor);

    if (weatherData === undefined)
        return null;

    const forcastsByUnit = temperatureUnit === 'C' ? weatherData.five_days_daily_forcasts_c : weatherData.five_days_daily_forcasts_f;
    const CurrentTempByUnit = temperatureUnit === 'C' ? weatherData.temperature_c : weatherData.temperature_f;

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
        <Card
            bg={themeColor}
            text={themeColor === 'light' ? 'dark' : 'light'}

        >
            <Card.Body >
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <h1>
                        {weatherData.name},
                        <br />
                        {Math.round(CurrentTempByUnit)}°{temperatureUnit}
                    </h1>
                    <FavoriteButton />
                </div>
                <h1 className="text-center">{weatherData.weather_text}</h1>
                <Row xs={1} md={5} className="g-5">
                    {forcastsByUnit.map((forcast, index) => (
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
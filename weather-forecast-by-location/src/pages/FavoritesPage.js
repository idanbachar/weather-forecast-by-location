import { useSelector } from "react-redux"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import WeatherCard from "../components/WeatherCard/WeatherCard";

export default function FavoritesPage() {
    const favoriteLocations = useSelector(state => state.favoriteLocations);
    const temperatureUnit = useSelector(state => state.forcastUnit);

    return (
        <div className="container">
            <h3>My Favorite locations</h3>
            <hr />
            <Row xs={1} md={5} className="g-5">
                {favoriteLocations.map((weatherData, index) =>
                    <Col key={index}>
                        <WeatherCard
                            title={weatherData.name}
                            imageText={weatherData.weather_text}
                            smallLabel={weatherData.weather_text}
                            bigLabel={(temperatureUnit === 'C' ? Math.round(weatherData.temperature_c) : Math.round(weatherData.temperature_f)) + "°" + temperatureUnit}
                            link={weatherData.id}
                        />
                    </Col>)}
            </Row>
        </div>
    )
}
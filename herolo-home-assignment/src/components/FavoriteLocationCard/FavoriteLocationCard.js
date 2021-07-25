import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import clearWeatherImg from '../../images/weather_forcast/clear.jpg'
import cloudyWeatherImg from '../../images/weather_forcast/cloudy.jpg';
import mostlyClearWeatherImg from '../../images/weather_forcast/mostly_clear.jpg';
import rainWeatherImg from '../../images/weather_forcast/rain.jpg';
import sunnyWeatherImg from '../../images/weather_forcast/sunny.jpg';

export default function FavoriteLocationCard({ weatherData }) {

    const temperatureUnit = useSelector(state => state.forcastUnit);
    const themeColor = useSelector(state => state.themeColor);
    const currentTempByUnit = temperatureUnit === 'C' ? weatherData.temperature_c : weatherData.temperature_f;

    const getCurrentWeatherImage = () => {

        if (weatherData.weather_text === "Clear")
            return clearWeatherImg;
        else if (weatherData.weather_text === "Mostly Clear")
            return mostlyClearWeatherImg;
        else if (weatherData.weather_text === "Cloudy" || weatherData.weather_text === "Mostly cloudy")
            return cloudyWeatherImg;
        else if (weatherData.weather_text === "Sunny" || weatherData.weather_text === "Clouds and sun")
            return sunnyWeatherImg;
        else if (weatherData.weather_text === "Light rain" || weatherData.weather_text === "Heavy rain")
            return rainWeatherImg;

            return sunnyWeatherImg;
    }

    let currentImage = getCurrentWeatherImage();

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
                <Card.Img variant="top"
                    src={currentImage}
                    height="150"
                />
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
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import clearWeatherImg from '../../images/weather_forcast/clear.jpg';
import cloudyWeatherImg from '../../images/weather_forcast/cloudy.jpg';
import mostlyClearWeatherImg from '../../images/weather_forcast/mostly_clear.jpg';
import rainWeatherImg from '../../images/weather_forcast/rain.jpg';
import sunnyWeatherImg from '../../images/weather_forcast/sunny.jpg';

export default function ForcastCard({ date, temperature, weatherText }) {
    const themeColor = useSelector(state => state.themeColor);
    const getOppositeTheme = () => themeColor === 'light' ? 'dark' : 'light';

    const getCurrentWeatherImage = () => {

        if (weatherText === "Clear")
            return clearWeatherImg;
        else if (weatherText === "Mostly Clear")
            return mostlyClearWeatherImg;
        else if (weatherText === "Cloudy")
            return cloudyWeatherImg;
        else if (weatherText === "Sunny" || weatherText === "Clouds and sun")
            return sunnyWeatherImg;

        return sunnyWeatherImg;
    }

    let currentImage = getCurrentWeatherImage();

    return (
        <Card
            bg={themeColor}
            text={getOppositeTheme}
            className="text-center"
        >
            <Card.Img
                variant="top"
                src={currentImage}
                height="150"
            />
            <Card.Body>
                <Card.Title>{new Date(date).toDateString()}</Card.Title>
                <Card.Text style={{ fontSize: '2rem' }}>
                    <strong>{Math.round(temperature.Maximum.Value)}°{temperature.Maximum.Unit}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
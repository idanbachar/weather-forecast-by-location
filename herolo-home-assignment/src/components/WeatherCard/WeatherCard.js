import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import clearWeatherImg from '../../images/weather_forcast/clear.jpg';
import cloudyWeatherImg from '../../images/weather_forcast/cloudy.jpg';
import mostlyClearWeatherImg from '../../images/weather_forcast/mostly_clear.jpg';
import rainWeatherImg from '../../images/weather_forcast/rain.jpg';
import sunnyWeatherImg from '../../images/weather_forcast/sunny.jpg';

export default function WeatherCard({ title, imageText, smallLabel, bigLabel, link }) {

    const themeColor = useSelector(state => state.themeColor);
    const oppositeThemeColor = themeColor === "dark" ? "light" : "dark";

    const getCurrentWeatherImage = () => {

        if (imageText === "Clear")
            return clearWeatherImg;
        else if (imageText === "Mostly Clear" || imageText === "Some clouds")
            return mostlyClearWeatherImg;
        else if (imageText === "Cloudy" || imageText === "Mostly cloudy")
            return cloudyWeatherImg;
        else if (imageText === "Sunny" || imageText === "Clouds and sun")
            return sunnyWeatherImg;
        else if (imageText === "Light rain" || imageText === "Heavy rain")
            return rainWeatherImg;

        return sunnyWeatherImg;
    }

    let currentImage = getCurrentWeatherImage();

    const RenderCard = () => {
        return (
            <Card
                bg={themeColor}
                text={oppositeThemeColor}
                className="text-center"
            >
                <Card.Header>
                    <Card.Title>
                        {title}
                    </Card.Title>
                </Card.Header>
                <Card.Img
                    variant="top"
                    src={currentImage}
                    height="150"
                />
                <Card.Body>
                    <Card.Text>
                        {smallLabel}
                    </Card.Text>
                    <Card.Text
                        style={{ fontSize: '2rem' }}>
                        {bigLabel}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }

    if (link)
        return (<Link to={`/location/${link}`} style={{ textDecoration: 'none' }}>
            <RenderCard />
        </Link>)
    return (<RenderCard />)
}
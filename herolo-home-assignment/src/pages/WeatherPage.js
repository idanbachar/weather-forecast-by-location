import { useEffect, useState } from "react"
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import ForcastCard from "../components/ForcastCard/ForcastCard";

export default function WeatherPage() {

    const apikey = "ykJesbBYhlBBwJJhnr3H56cgFBr6vB4M";
    const accuweather_url = "http://dataservice.accuweather.com";

    const [citySearch, setCitySearch] = useState('');
    const [currentCity, setCurrentCity] = useState();
    const [currentCityWeather, setCurrentCityWeather] = useState();
    const [fiveDaysForcasts, setFiveDaysForcasts] = useState([]);

    const getCity = async () => {
        const res = await fetch(`${accuweather_url}/locations/v1/cities/autocomplete?apikey=${apikey}&q=${citySearch}`);
        return await res.json();
    }

    const getCurrentWeather = async (cityKey) => {
        const res = await fetch(`${accuweather_url}/currentconditions/v1/${cityKey}?apikey=${apikey}`);
        return await res.json();
    }

    const getFiveDaysForcasts = async (cityKey) => {
        const res = await fetch(`${accuweather_url}/forecasts/v1/daily/5day/${cityKey}?apikey=${apikey}&metric=true`);
        return await res.json();
    }

    const getCityWeather = async () => {

        const city = await getCity();

        if (city.length > 0) {
            setCurrentCity(city[0]);

            const cityKey = city[0].Key;
            const currentWeather = await getCurrentWeather(cityKey);

            if (currentWeather.length > 0) {
                setCurrentCityWeather(currentWeather[0]);

                const fiveDaysDailyForcasts = await getFiveDaysForcasts(cityKey);
                if (fiveDaysDailyForcasts !== undefined)
                    setFiveDaysForcasts(fiveDaysDailyForcasts.DailyForecasts);
            }
        }
    }

    return (
        <div className="container">
            <InputGroup className="mb-3">
                <FormControl
                    aria-label="Search City"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(e) => setCitySearch(e.target.value)}
                    value={citySearch}
                />
                <Button
                    variant="outline-secondary"
                    onClick={getCityWeather}
                >
                    Search
                </Button>
            </InputGroup>

            <br />
            {currentCityWeather !== undefined ?
                <h1>{currentCity.LocalizedName} {currentCityWeather.Temperature.Metric.Value}</h1>
                : null}

            <Row xs={1} md={5} className="g-5">
                {fiveDaysForcasts.map(forcast => (
                    <Col>
                        <ForcastCard
                            date={forcast.Date}
                            temperature={forcast.Temperature}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}
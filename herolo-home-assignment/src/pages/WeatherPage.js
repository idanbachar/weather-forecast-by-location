import { useEffect, useState } from "react"
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function WeatherPage() {

    const apikey = "ykJesbBYhlBBwJJhnr3H56cgFBr6vB4M";
    const ACCUWEATHER_CITY_SEARCH_URL = "http://dataservice.accuweather.com";

    const [citySearch, setCitySearch] = useState('');
    const [cityWeather, setCityWeather] = useState();

    const getCity = async () => {
        const res = await fetch(`${ACCUWEATHER_CITY_SEARCH_URL}/locations/v1/cities/autocomplete?apikey=${apikey}&q=${citySearch}`);
        return await res.json();
    }

    const getCityWeather = async () => {
        const city = await getCity();

        if (city.length > 0) {
            const res = await fetch(`${ACCUWEATHER_CITY_SEARCH_URL}/currentconditions/v1/${city[0].Key}?apikey=${apikey}`);
            const weatherData = await res.json();

            if (weatherData.length > 0)
                setCityWeather(weatherData[0]);
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
            {cityWeather !== undefined ?
                <h1>{cityWeather.Temperature.Metric.Value}</h1>
                : null}
        </div>
    )
}
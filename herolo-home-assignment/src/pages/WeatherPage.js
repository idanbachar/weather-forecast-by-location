import { useState } from "react"
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import CityCardDetailed from "../components/CityCardDetailed/CityCardDetailed";
import { useDispatch } from "react-redux";

export default function WeatherPage() {

    const apikey = "ykJesbBYhlBBwJJhnr3H56cgFBr6vB4M";
    const accuweather_url = "http://dataservice.accuweather.com";

    const [citySearch, setCitySearch] = useState('Tel Aviv');
    const [currentCityData, setCurrentCityData] = useState();

    const dispatch = useDispatch();

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

            const cityKey = city[0].Key;
            const currentWeather = await getCurrentWeather(cityKey);

            if (currentWeather.length > 0) {

                const fiveDaysDailyForcasts = await getFiveDaysForcasts(cityKey);
                if (fiveDaysDailyForcasts !== undefined) {
                    setCurrentCityData({
                        id: city[0].Key,
                        name: city[0].LocalizedName,
                        weather_text: currentWeather[0].WeatherText,
                        five_days_daily_forcasts: fiveDaysDailyForcasts.DailyForecasts,
                        date: currentWeather[0].LocalObservationDateTime,
                        temperature_c: currentWeather[0].Temperature.Metric.Value,
                        temperature_f: currentWeather[0].Temperature.Imperial.Value
                    });
                }
            }
        }
    }

    const addToFavorite = (favoriteCity) => {

        dispatch({
            type: 'ADD',
            payload: favoriteCity
        });

        console.log(`The city ${favoriteCity.name} has been added to favorites.`);
    }

    return (
        <div className="container">
            <h1>City Weather</h1>
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

            <CityCardDetailed
                weatherData={currentCityData}
                handleAddFavorite={() => addToFavorite(currentCityData)} />

        </div>
    )
}
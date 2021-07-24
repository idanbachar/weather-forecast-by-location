import { useEffect, useState } from "react"
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import CityCardDetailed from "../components/CityCardDetailed/CityCardDetailed";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function WeatherPage() {

    const apikey = "3DaPAiGhzL0rLrdbGQsu334dZxEXIGiX";
    const accuweather_url = "http://dataservice.accuweather.com";

    const params = useParams();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favoriteCities);

    const [citySearch, setCitySearch] = useState('Tel Aviv');
    const [currentCityData, setCurrentCityData] = useState();

    useEffect(() => {
        if (favorites.length > 0) {

            if (params.cityId) {
                const cityWeather = favorites.find(fav => fav.id === params.cityId);
                if (cityWeather) {
                    setCitySearch(cityWeather.name);
                    setCurrentCityData(cityWeather);
                }
            }
            else {
                if (currentCityData) {
                    const cityWeather = favorites.find(fav => fav.id === currentCityData.id);
                    if (cityWeather)
                        setCurrentCityData(cityWeather);
                }
            }
        }

    }, [currentCityData, dispatch])

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

        try {
            const city = await getCity();
            const cityKey = city[0].Key;
            const currentWeather = await getCurrentWeather(cityKey);
            const fiveDaysDailyForcasts = await getFiveDaysForcasts(cityKey);

            setCurrentCityData({
                id: city[0].Key,
                name: city[0].LocalizedName,
                weather_text: currentWeather[0].WeatherText,
                five_days_daily_forcasts: fiveDaysDailyForcasts.DailyForecasts,
                date: currentWeather[0].LocalObservationDateTime,
                temperature_c: currentWeather[0].Temperature.Metric.Value,
                temperature_f: currentWeather[0].Temperature.Imperial.Value,
                isFavorite: false
            });
        }
        catch (error) {
            alert(error);
        }
    }

    const handleFavorite = (type) => {

        let payload;

        switch (type) {
            case "ADD":
                payload = currentCityData;
                break;
            case "REMOVE":
                payload = currentCityData.id;
                break;
            default:
                break;
        }

        dispatch({
            type: type,
            payload: payload
        });


        const updated = { ...currentCityData };
        updated.isFavorite = type === 'ADD';
        setCurrentCityData(updated);


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
                handleFavorite={handleFavorite}
            />
        </div>
    )
}
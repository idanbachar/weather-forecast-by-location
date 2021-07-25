import { useEffect, useState } from "react"
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import LocationCardDetailed from "../components/LocationCardDetailed/LocationCardDetailed";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function WeatherPage() {

    const apikey = "SGalJ8Wja99M5WXvMNCnegGJlGiY0GNL";
    const accuweather_url = "http://dataservice.accuweather.com";

    const params = useParams();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favoriteLocations);

    const [citySearch, setCitySearch] = useState('Tel Aviv');
    const [currentLocationData, setCurrentLocationData] = useState();

    useEffect(() => {
        if (favorites.length > 0) {

            if (params.locationId) {
                const locationWeather = favorites.find(fav => fav.id === params.locationId);
                if (locationWeather) {
                    setCitySearch(locationWeather.name);
                    setCurrentLocationData(locationWeather);
                }
            }
            else {
                if (currentLocationData) {
                    const locationWeather = favorites.find(fav => fav.id === currentLocationData.id);
                    if (locationWeather)
                        setCurrentLocationData(locationWeather);
                }
            }
        }

    }, [currentLocationData])

    const getCity = async () => {
        const res = await fetch(`${accuweather_url}/locations/v1/cities/autocomplete?apikey=${apikey}&q=${citySearch}`);
        return await res.json();
    }

    const getCurrentWeather = async (cityKey) => {
        const res = await fetch(`${accuweather_url}/currentconditions/v1/${cityKey}?apikey=${apikey}`);
        return await res.json();
    }

    const getFiveDaysForcasts = async (cityKey, temperatureUnit) => {

        let metric = temperatureUnit === 'C';
        const res = await fetch(`${accuweather_url}/forecasts/v1/daily/5day/${cityKey}?apikey=${apikey}&metric=${metric}`);
        return await res.json();
    }

    const getLocationWeather = async () => {

        try {
            const city = await getCity();
            const cityKey = city[0].Key;
            const currentWeather = await getCurrentWeather(cityKey);
            const fiveDaysDailyForcasts_C = await getFiveDaysForcasts(cityKey, 'C');
            const fiveDaysDailyForcasts_F = await getFiveDaysForcasts(cityKey, 'F');

            setCurrentLocationData({
                id: city[0].Key,
                name: city[0].LocalizedName,
                weather_text: currentWeather[0].WeatherText,
                five_days_daily_forcasts_c: fiveDaysDailyForcasts_C.DailyForecasts,
                five_days_daily_forcasts_f: fiveDaysDailyForcasts_F.DailyForecasts,
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
                payload = currentLocationData;
                break;
            case "REMOVE":
                payload = currentLocationData.id;
                break;
            default:
                break;
        }

        dispatch({
            type: type,
            payload: payload
        });


        const updated = { ...currentLocationData };
        updated.isFavorite = type === 'ADD';
        setCurrentLocationData(updated);


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
                    onClick={getLocationWeather}
                >
                    Search
                </Button>
            </InputGroup>
            <LocationCardDetailed
                weatherData={currentLocationData}
                handleFavorite={handleFavorite}
            />
        </div>
    )
}
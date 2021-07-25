import { useEffect, useState } from "react"
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import LocationCardDetailed from "../components/LocationCardDetailed/LocationCardDetailed";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function WeatherPage() {

    const apikey = "0zwcxsiiWksGhoR0QoQg1yd5KExpmxv8";
    const accuweather_url = "http://dataservice.accuweather.com";

    const params = useParams();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favoriteLocations);

    const [citySearch, setCitySearch] = useState('');
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

    useEffect(() => {
        getGeoLocation();
    }, [])

    const getGeoPosition = async (coordinates) => {
        const res = await fetch(`${accuweather_url}/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${coordinates.latitude},${coordinates.longitude}`);
        return await res.json();
    }

    const getCity = async (city = undefined) => {
        const res = await fetch(`${accuweather_url}/locations/v1/cities/autocomplete?apikey=${apikey}&q=${city === undefined ? citySearch : city}`);
        return await res.json();
    }

    const getCurrentWeather = async (cityKey) => {
        const res = await fetch(`${accuweather_url}/currentconditions/v1/${cityKey}?apikey=${apikey}`);
        return await res.json();
    }

    const getFiveDaysForcasts = async (cityKey, temperatureUnit) => {

        let metric = temperatureUnit === 'celsius';
        const res = await fetch(`${accuweather_url}/forecasts/v1/daily/5day/${cityKey}?apikey=${apikey}&metric=${metric}`);
        return await res.json();
    }

    const getGeoLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setGeoLocationCoordinates);

        } else {
            alert("Geolocation is not supported by this browser.");
            setCitySearch("Tel Aviv");
        }
    }

    async function setGeoLocationCoordinates(position) {

        const coordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }

        const data = await getGeoPosition(coordinates);
        const myCityName = data.LocalizedName;
        setCitySearch(myCityName);
        getLocationWeather(myCityName);
    }

    const getLocationWeather = async (cityName) => {

        try {
            const city = await getCity(cityName);
            const cityKey = city[0].Key;
            const currentWeather = await getCurrentWeather(cityKey);
            const fiveDaysDailyForcasts_C = await getFiveDaysForcasts(cityKey, 'celsius');
            const fiveDaysDailyForcasts_F = await getFiveDaysForcasts(cityKey, 'fahrenheit');

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
                    onClick={() => getLocationWeather(citySearch)}
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
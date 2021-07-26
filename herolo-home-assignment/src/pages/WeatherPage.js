import { useEffect, useState } from "react"
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import LocationCardDetailed from "../components/LocationCardDetailed/LocationCardDetailed";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGeoPosition, getCity, getCurrentWeather, getFiveDaysForcasts } from "../accuweather/AccuweatherAPI";
import Toast from 'react-bootstrap/Toast'

export default function WeatherPage() {

    const params = useParams();
    const dispatch = useDispatch();

    const favorites = useSelector(state => state.favoriteLocations);
    const [citySearch, setCitySearch] = useState('');
    const [currentLocationData, setCurrentLocationData] = useState();
    const [fetchError, setFetchError] = useState();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (params.locationId) {
            const locationWeather = favorites.find(fav => fav.id === params.locationId);
            if (locationWeather) {
                if (params.locationId === locationWeather.id) {
                    setCitySearch(locationWeather.name);
                    setCurrentLocationData(locationWeather);
                }
            }
        }

    }, [params])

    useEffect(() => {
        if (!params.locationId)
            getGeoLocation();
    }, [])

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

        try {
            const data = await getGeoPosition(coordinates);
            const myCityName = data.LocalizedName;
            setCitySearch(myCityName);
            await getLocationWeatherByCity(myCityName);
        } catch (error) {
            handleErrorMessage(error.message);
        }
    }

    const getLocationWeatherByCity = async (cityName) => {
        try {
            const city = await getCity(cityName);
            const cityKey = city[0].Key;
            const currentWeather = await getCurrentWeather(cityKey);
            const fiveDaysDailyForcasts_C = await getFiveDaysForcasts(cityKey, 'celsius');
            const fiveDaysDailyForcasts_F = await getFiveDaysForcasts(cityKey, 'fahrenheit');
            const isFavorited = favorites.find(fav => fav.id === cityKey);

            setCurrentLocationData({
                id: city[0].Key,
                name: city[0].LocalizedName,
                weather_text: currentWeather[0].WeatherText,
                five_days_daily_forcasts_c: fiveDaysDailyForcasts_C.DailyForecasts,
                five_days_daily_forcasts_f: fiveDaysDailyForcasts_F.DailyForecasts,
                date: currentWeather[0].LocalObservationDateTime,
                temperature_c: currentWeather[0].Temperature.Metric.Value,
                temperature_f: currentWeather[0].Temperature.Imperial.Value,
                isFavorite: isFavorited === undefined ? false : true
            });
        }
        catch (error) {
            handleErrorMessage(error.message);
        }
    }

    const handleErrorMessage = (errorMessage) => {
        switch (errorMessage) {
            case "Failed to fetch":
                errorMessage = "Cannot fetch data from api. Probably, the api key is max used."
                break;
            case "Cannot read property 'Key' of undefined":
                errorMessage = "City entered is not valid. Please try again.";
                break;
            default: break;
        }

        setFetchError(errorMessage);
        setShow(true);
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

    const validateSearchField = async (cityName) => {
        const allowedLetters = /^[a-zA-Z\s]*$/;
        if (cityName.match(allowedLetters))
            await getLocationWeatherByCity(cityName);
        else
            handleErrorMessage("Only english letters allowed.")
    }

    return (
        <div className="container">
            <h3>City Weather</h3>
            <hr />

            <InputGroup className="mb-3">
                <FormControl
                    aria-label="Search City"
                    aria-describedby="inputGroup-sizing-sm"
                    onChange={(e) => setCitySearch(e.target.value)}
                    value={citySearch}
                />
                <Button
                    variant="outline-secondary"
                    onClick={() => validateSearchField(citySearch)}
                >
                    Search
                </Button>
            </InputGroup>

            <Toast onClose={() => setShow(false)} show={show} delay={6000} autohide>
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                    <small>Now</small>
                </Toast.Header>
                <Toast.Body>{fetchError}</Toast.Body>
            </Toast>
            <hr style={{ visibility: 'hidden' }} />
            <LocationCardDetailed
                weatherData={currentLocationData}
                handleFavorite={handleFavorite}
            />
        </div>
    )
}
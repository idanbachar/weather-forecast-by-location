const apikey = "x8TKUnGnzcCUCMxZDgoqVsEfAOboxbzE";
const accuweather_url = "http://dataservice.accuweather.com";

export async function getGeoPosition(coordinates) {
    const res = await fetch(`${accuweather_url}/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${coordinates.latitude},${coordinates.longitude}`);
    return await res.json();
}

export async function getCity(cityName) {
    const res = await fetch(`${accuweather_url}/locations/v1/cities/autocomplete?apikey=${apikey}&q=${cityName}`);
    return await res.json();
}

export async function getCurrentWeather(cityKey) {
    const res = await fetch(`${accuweather_url}/currentconditions/v1/${cityKey}?apikey=${apikey}`);
    return await res.json();
}

export async function getFiveDaysForcasts(cityKey, temperatureUnit) {
    let metric = temperatureUnit === 'celsius';
    const res = await fetch(`${accuweather_url}/forecasts/v1/daily/5day/${cityKey}?apikey=${apikey}&metric=${metric}`);
    return await res.json();
}


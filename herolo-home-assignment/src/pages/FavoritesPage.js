import { useSelector } from "react-redux"
import FavoriteCityCard from "../components/FavoriteCityCard/FavoriteCityCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function FavoritesPage() {

    const favoriteCities = useSelector(state => state.favoriteCities);

    return (
        <div className="container">
            <h1>My Favorite Cities</h1>
            <Row xs={1} md={5} className="g-5">
                {favoriteCities.map(weatherData =>
                    <Col>
                        <FavoriteCityCard
                            weatherData={weatherData} />
                    </Col>
                )}
            </Row>
        </div>
    )
}
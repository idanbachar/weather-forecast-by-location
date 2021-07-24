import { useSelector } from "react-redux"
import FavoriteLocationCard from "../components/FavoriteLocationCard/FavoriteLocationCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function FavoritesPage() {

    const favoriteLocations = useSelector(state => state.favoriteLocations);

    return (
        <div className="container">
            <h1>My Favorite locations</h1>
            <Row xs={1} md={5} className="g-5">
                {favoriteLocations.map((weatherData, index) =>
                    <Col key={index}>
                        <FavoriteLocationCard
                            weatherData={weatherData} />
                    </Col>
                )}
            </Row>
        </div>
    )
}
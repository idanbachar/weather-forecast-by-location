import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

export default function ForcastCard({ date, temperature }) {

    const themeColor = useSelector(state => state.themeColor) || 'L';

    return (
        <Card
            bg={themeColor === 'L' ? 'light' : 'dark'}
            text={themeColor === 'L' ? 'dark' : 'light'}
        >
            <Card.Img variant="top" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/sun-in-blue-sky-with-clouds-tomch.jpg" />
            <Card.Body>
                <Card.Title>{new Date(date).toDateString()}</Card.Title>
                <Card.Text style={{ fontSize: '2rem' }}>
                    <strong>{Math.round(temperature.Maximum.Value)}°{temperature.Maximum.Unit}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
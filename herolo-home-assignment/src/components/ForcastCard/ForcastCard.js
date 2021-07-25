import Card from 'react-bootstrap/Card';

export default function ForcastCard({ date, temperature }) {
    return (
        <Card>
            <Card.Img variant="top" src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/sun-in-blue-sky-with-clouds-tomch.jpg" />
            <Card.Body>
                <Card.Title>{new Date(date).toDateString()}</Card.Title>
                <Card.Text>
                    {Math.round(temperature.Maximum.Value)} {temperature.Maximum.Unit}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
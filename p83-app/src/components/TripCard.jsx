import Card from 'react-bootstrap/Card'

function TripCard({ title, region, difficulty, summary }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{region}</Card.Subtitle>
        <Card.Text className="small mb-2">
          <strong>Difficulty:</strong> {difficulty}
        </Card.Text>
        <Card.Text>{summary}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TripCard

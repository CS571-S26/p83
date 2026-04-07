import Badge from 'react-bootstrap/Badge'
import Card from 'react-bootstrap/Card'

function TripCard({ title, region, difficulty, summary }) {
  return (
    <Card className="bb-trip-card h-100 shadow-sm">
      <Card.Header className="py-3 d-flex justify-content-between align-items-start gap-2 flex-wrap">
        <Card.Title className="h6 mb-0">{title}</Card.Title>
        <Badge bg="primary" className="text-white text-uppercase" style={{ fontSize: '0.65rem' }}>
          {difficulty}
        </Badge>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="bb-trip-region mb-2 small">{region}</Card.Subtitle>
        <Card.Text className="small mb-0">{summary}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TripCard

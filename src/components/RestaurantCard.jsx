import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RestaurantCard({ r }) {
  const id = r._id || r.id;
  const cuisines = r.cuisines || r.cuisine || [];
  const city = r.city?.name || r.cityName || r.city || "";

  return (
    <Card className="h-100 shadow-sm">
      {/* If you have images later, place <Card.Img variant="top" src={...} /> */}
      <Card.Body>
        <Card.Title className="mb-1">{r.name}</Card.Title>
        <Card.Subtitle className="text-muted small mb-2">
          {Array.isArray(cuisines) ? cuisines.join(", ") : cuisines}
          {city ? ` · ${city}` : ""}
        </Card.Subtitle>
        {"rating" in r && (
          <div className="mb-2 small">⭐ {Number(r.rating).toFixed(1)}</div>
        )}
        <Button as={Link} to={`/restaurants/${id}`} size="sm" variant="primary">
          View menu
        </Button>
      </Card.Body>
    </Card>
  );
}

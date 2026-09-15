import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      <h1 className="mb-3">Discover great food</h1>
      <p className="text-muted">
        Start by choosing a city or browse all restaurants.
      </p>
      <div className="d-flex gap-2">
        <Link className="btn btn-primary" to="/restaurants">
          Browse Restaurants
        </Link>
      </div>
    </Container>
  );
}

import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container>
      <h1 className="mb-3">404 — Not Found</h1>
      <p className="text-muted">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </Container>
  );
}

import { Container } from "react-bootstrap";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);

  // Prevent logged-out users from accessing Profile
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container>
      <h1 className="mb-3">My Profile</h1>

      <pre className="bg-light p-3 rounded border">
        {JSON.stringify(user, null, 2)}
      </pre>
    </Container>
  );
}
import { Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);
  return (
    <Container>
      <h1 className="mb-3">My Profile</h1>
      <pre className="bg-light p-3 rounded border">
        {JSON.stringify(user || { note: "Not loaded yet" }, null, 2)}
      </pre>
    </Container>
  );
}

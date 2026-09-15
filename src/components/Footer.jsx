import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="border-top mt-4 py-3">
      <Container className="text-center text-muted small">
        © {new Date().getFullYear()} MRN XPress · All rights reserved
      </Container>
    </footer>
  );
}

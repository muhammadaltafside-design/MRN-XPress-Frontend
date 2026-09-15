import { Card, Placeholder } from "react-bootstrap";

export default function ListSkeleton({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="h-100">
          <Card.Body>
            <Placeholder as={Card.Title} animation="wave">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="wave">
              <Placeholder xs={4} /> <Placeholder xs={3} />{" "}
              <Placeholder xs={2} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={3} />
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

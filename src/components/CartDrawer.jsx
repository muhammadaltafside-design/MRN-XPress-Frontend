import { Offcanvas, ListGroup, Button, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const money = (n) =>
  (n ?? 0).toLocaleString(undefined, { style: "currency", currency: "AUD" });

export default function CartDrawer() {
  const { items, total, totalQty, dec, add, remove, clear, isOpen, setOpen } =
    useCart();

  return (
    <Offcanvas show={isOpen} onHide={() => setOpen(false)} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>My Cart ({totalQty})</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length === 0 ? (
          <div className="text-muted">Your cart is empty.</div>
        ) : (
          <>
            <ListGroup className="mb-3">
              {items.map((it) => (
                <ListGroup.Item key={it._id}>
                  <div className="fw-semibold">{it.name}</div>
                  <div className="text-muted small">{money(it.price)}</div>
                  <Stack direction="horizontal" gap={2} className="mt-2">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => dec(it._id)}
                    >
                      -
                    </Button>
                    <div>{it.qty}</div>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => add(it)}
                    >
                      +
                    </Button>
                    <div className="ms-auto fw-semibold">
                      {money(it.qty * (it.price || 0))}
                    </div>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => remove(it._id)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Stack direction="horizontal">
              <div className="fw-bold">Total</div>
              <div className="ms-auto fw-bold">{money(total)}</div>
            </Stack>
            <Stack direction="horizontal" gap={2} className="mt-3">
              <Button variant="secondary" onClick={clear}>
                Clear
              </Button>
              <Button
                as={Link}
                to="/checkout"
                className="ms-auto"
                variant="primary"
                onClick={() => setOpen(false)}
                disabled={items.length === 0}
              >
                Review order
              </Button>
            </Stack>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurantById, getRestaurantMenu } from "../lib/api";
import { useCart } from "../context/CartContext";

const money = (n) =>
  (n ?? 0).toLocaleString(undefined, { style: "currency", currency: "AUD" });

// Extract items from common menu shapes:
// - { sections: [{ name, items: [...] }] }
// - { items: [...] }
// - { menuItems: [...] }
function extractSections(menu) {
  if (!menu) return [];
  const toItem = (x) =>
    x && typeof x === "object" ? x : { _id: String(x), name: "Item", price: 0 };

  if (Array.isArray(menu.sections)) {
    return menu.sections.map((s) => ({
      name: s.name || "Menu",
      items: (s.items || []).map(toItem),
    }));
  }
  if (Array.isArray(menu.items))
    return [{ name: "Menu", items: menu.items.map(toItem) }];
  if (Array.isArray(menu.menuItems))
    return [{ name: "Menu", items: menu.menuItems.map(toItem) }];
  return [];
}

export default function RestaurantDetails() {
  const { id } = useParams();
  const { add } = useCart();

  const {
    data: restaurant,
    isLoading: rLoading,
    isError: rError,
  } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
  });

  const {
    data: menu,
    isLoading: mLoading,
    isError: mError,
  } = useQuery({
    queryKey: ["menu", id],
    queryFn: () => getRestaurantMenu(id),
  });

  const sections = extractSections(menu);

  return (
    <Container>
      <h1 className="mb-1">
        {restaurant?.name || (rLoading ? "Loading…" : "Restaurant")}
      </h1>
      {restaurant?.cuisines && (
        <div className="text-muted mb-2">
          {Array.isArray(restaurant.cuisines)
            ? restaurant.cuisines.join(", ")
            : restaurant.cuisines}
          {restaurant?.city ? ` · ${restaurant.city}` : ""}
        </div>
      )}
      {"rating" in (restaurant || {}) && (
        <div className="mb-3">
          <Badge bg="warning" text="dark">
            ⭐ {Number(restaurant.rating).toFixed(1)}
          </Badge>
        </div>
      )}
      {rError && (
        <div className="text-danger mb-3">Failed to load restaurant.</div>
      )}

      <Row className="g-3">
        {mLoading && (
          <Col>
            <div className="text-muted">Loading menu…</div>
          </Col>
        )}
        {mError && (
          <Col>
            <div className="text-danger">Failed to load menu.</div>
          </Col>
        )}

        {sections.map((sec, i) => (
          <Col xs={12} key={i}>
            <h4 className="mt-3">{sec.name}</h4>
            <Row xs={1} sm={2} md={3} className="g-3">
              {(sec.items || []).map((it) => (
                <Col key={it._id || it.id}>
                  <Card className="h-100">
                    <Card.Body>
                      <Card.Title className="mb-1">
                        {it?.name ?? "Item"}
                      </Card.Title>
                      {it?.description && (
                        <Card.Text className="text-muted small">
                          {it.description}
                        </Card.Text>
                      )}
                      {it?.price != null && (
                        <div className="fw-semibold mb-2">
                          {money(it.price)}
                        </div>
                      )}

                      <Button
                        size="sm"
                        onClick={() =>
                          add({
                            _id: it?._id ?? it?.id ?? String(it),
                            name: it?.name ?? "Item",
                            price: it?.price ?? 0,
                            restaurantId: id,
                            qty: 1,
                          })
                        }
                      >
                        Add to cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        ))}

        {!mLoading && sections.length === 0 && (
          <Col>
            <div className="text-muted">No menu available.</div>
          </Col>
        )}
      </Row>
    </Container>
  );
}

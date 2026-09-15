import { Button } from "react-bootstrap";
import { useCart } from "../context/CartContext";

export default function CartButton() {
  const { totalQty, setOpen } = useCart();
  return (
    <Button variant="outline-primary" size="sm" onClick={() => setOpen(true)}>
      Cart {totalQty > 0 ? `(${totalQty})` : ""}
    </Button>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/api";

export default function Checkout() {
  const { items, total, clear } = useCart(); // assumes total is items total
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "" });
  const disabled = items.length === 0;

  const placeOrder = async (e) => {
    e.preventDefault();
    if (disabled) return;

    const payload = {
      items: items.map((i) => ({
        restaurantId: i.restaurantId,
        menuItemId: i._id,
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
      contact: { name: form.name, phone: form.phone },
      totals: { items: total, delivery: 0, tax: 0, grand: total },
    };

    const { id } = await createOrder(payload);
    clear();
    nav("/order-confirmation");
  };

  return (
    <div className="container py-4">
      <h1 className="mb-3">Review order</h1>

      {items.map((line) => (
        <div
          key={line._id || line.id}
          className="d-flex justify-content-between border rounded p-2 mb-2"
        >
          <div>
            {line.name} × {line.qty}
          </div>
          <div>A${(line.price * line.qty).toFixed(2)}</div>
        </div>
      ))}

      <div className="d-flex justify-content-between fw-bold border-top pt-2 mt-2 mb-4">
        <span>Total</span>
        <span>A${total.toFixed(2)}</span>
      </div>

      <form onSubmit={placeOrder} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={form.name}
            onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            className="form-control"
            value={form.phone}
            onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))}
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary" disabled={disabled}>
            Place order
          </button>
        </div>
      </form>
    </div>
  );
}

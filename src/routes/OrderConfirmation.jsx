import { Link } from "react-router-dom";

export default function OrderConfirmation() {
  return (
    <div className="container py-4">
      <h1>Thank you! 🎉</h1>
      <p className="text-muted mb-4">
        Your order has been placed successfully. We’ll start preparing it right
        away.
      </p>

      <div className="alert alert-success" role="alert">
        You will receive a confirmation call or message shortly.
      </div>

      <Link to="/restaurants" className="btn btn-primary mt-4">
        Back to restaurants
      </Link>
    </div>
  );
}

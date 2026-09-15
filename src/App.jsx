import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./routes/Home";
import Restaurants from "./routes/Restaurants";
import RestaurantDetails from "./routes/RestaurantDetails";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import NotFound from "./routes/NotFound";
import { Routes, Route } from "react-router-dom";
import Checkout from "@/routes/Checkout";
import OrderConfirmation from "@/routes/OrderConfirmation";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

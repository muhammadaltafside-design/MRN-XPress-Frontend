import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "mx_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const totalQty = items.reduce((s, it) => s + it.qty, 0);
  const total = items.reduce((s, it) => s + it.qty * (it.price || 0), 0);

  const add = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p._id === product._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setOpen(true);
  };

  const dec = (id) =>
    setItems((prev) =>
      prev
        .map((p) => (p._id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );

  const remove = (id) => setItems((prev) => prev.filter((p) => p._id !== id));
  const clear = () => setItems([]);

  const value = useMemo(
    () => ({
      items,
      totalQty,
      total,
      add,
      dec,
      remove,
      clear,
      isOpen,
      setOpen,
    }),
    [items, totalQty, total, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

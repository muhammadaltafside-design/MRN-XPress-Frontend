import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search restaurants…",
}) {
  const [text, setText] = useState(value || "");

  // debounce 300ms
  useEffect(() => {
    // Only fire when the user actually changes text (not on initial mount/sync)
    if (text === (value || "")) return;
    const id = setTimeout(() => onChange(text || null), 300);
    return () => clearTimeout(id);
  }, [text, value, onChange]);

  useEffect(() => setText(value || ""), [value]);

  return (
    <Form.Control
      type="search"
      placeholder={placeholder}
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{ minWidth: 260 }}
    />
  );
}

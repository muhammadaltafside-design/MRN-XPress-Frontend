import { Form } from "react-bootstrap";

export default function SortSelect({ value, onChange }) {
  return (
    <Form.Group>
      <Form.Label className="me-2 mb-0">Sort</Form.Label>
      <Form.Select
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        style={{ minWidth: 180 }}
      >
        <option value="">Default</option>
        <option value="name_asc">Name (A→Z)</option>
        <option value="name_desc">Name (Z→A)</option>
        <option value="rating_desc">Rating (High→Low)</option>
      </Form.Select>
    </Form.Group>
  );
}

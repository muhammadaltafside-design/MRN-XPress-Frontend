import { useQuery } from "@tanstack/react-query";
import { Form } from "react-bootstrap";
import { getCities } from "../lib/api";

export default function CityPicker({ value, onChange }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <Form.Group className="me-2">
      <Form.Label className="me-2 mb-0">City</Form.Label>
      <Form.Select
        disabled={isLoading || isError}
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        style={{ minWidth: 180 }}
      >
        <option value="">All</option>
        {(data || []).map((c) => (
          <option key={c._id || c.name} value={c._id || c.name}>
            {c.name}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

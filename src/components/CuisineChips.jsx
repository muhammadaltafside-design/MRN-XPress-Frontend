import { useQuery } from "@tanstack/react-query";
import { Badge, Stack } from "react-bootstrap";
import { getCuisines } from "../lib/api";

export default function CuisineChips({ value, onChange }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cuisines"],
    queryFn: getCuisines,
    staleTime: 5 * 60 * 1000,
  });

  const cuisines = (data || []).map((c) =>
    typeof c === "string" ? c : c.name
  );

  if (isLoading)
    return <div className="text-muted small">Loading cuisines…</div>;
  if (isError)
    return <div className="text-danger small">Failed to load cuisines.</div>;

  return (
    <Stack direction="horizontal" gap={2} className="flex-wrap">
      <Badge
        bg={value ? "light" : "primary"}
        text={value ? "dark" : "light"}
        role="button"
        onClick={() => onChange(null)}
      >
        All
      </Badge>
      {cuisines.map((name) => (
        <Badge
          key={name}
          bg={value === name ? "primary" : "light"}
          text={value === name ? "light" : "dark"}
          role="button"
          onClick={() => onChange(value === name ? null : name)}
        >
          {name}
        </Badge>
      ))}
    </Stack>
  );
}

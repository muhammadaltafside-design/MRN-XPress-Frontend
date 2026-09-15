import { useMemo } from "react";
import { Container, Row, Col, Stack, Alert, Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "../lib/api";
import CityPicker from "../components/CityPicker";
import CuisineChips from "../components/CuisineChips";
import SearchBar from "../components/SearchBar";
import SortSelect from "../components/SortSelect";
import RestaurantCard from "../components/RestaurantCard";
import ListSkeleton from "../components/ListSkeleton";

const DEFAULT_LIMIT = 12;

export default function Restaurants() {
  const [params, setParams] = useSearchParams();

  // read
  const cityId = params.get("cityId");
  const cuisine = params.get("cuisine");
  const q = params.get("q");
  const sort = params.get("sort"); // name_asc | name_desc | rating_desc
  const page = Math.max(1, parseInt(params.get("page") || "1", 10));
  const limit = Math.max(
    1,
    parseInt(params.get("limit") || String(DEFAULT_LIMIT), 10)
  );

  // write helper
  const update = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === null || v === undefined || v === "") next.delete(k);
      else next.set(k, String(v));
    });

    // ✅ Reset page ONLY if a filter value truly changed
    const changed = (k) => {
      if (!(k in patch)) return false;
      const before = params.get(k) ?? "";
      const after = (patch[k] ?? "") + "";
      return before !== after;
    };

    if (
      changed("cityId") ||
      changed("cuisine") ||
      changed("q") ||
      changed("sort")
    ) {
      next.set("page", "1");
    }

    setParams(next, { replace: false });
  };

  // map sort to API’s expected field
  const apiSort = useMemo(() => {
    if (sort === "name_asc") return "name";
    if (sort === "name_desc") return "-name";
    if (sort === "rating_desc") return "-rating";
    return undefined;
  }, [sort]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants", { cityId, cuisine, q, apiSort, page, limit }],
    queryFn: () =>
      getRestaurants({
        cityId: cityId || undefined,
        cuisine: cuisine || undefined,
        q: q || undefined,
        sort: apiSort,
        page,
        limit,
      }),
    keepPreviousData: true,
  });

  const items = data?.data || [];
  const total = data?.total || items.length || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <Container>
      <h1 className="mb-3">Restaurants</h1>

      {/* Filters */}
      <Stack direction="horizontal" gap={3} className="flex-wrap mb-3">
        <CityPicker value={cityId} onChange={(v) => update({ cityId: v })} />
        <SortSelect value={sort} onChange={(v) => update({ sort: v })} />
        <div className="ms-auto">
          <SearchBar value={q} onChange={(v) => update({ q: v })} />
        </div>
      </Stack>

      <CuisineChips value={cuisine} onChange={(v) => update({ cuisine: v })} />

      {/* States */}
      {isError && (
        <Alert variant="danger" className="mt-3">
          Failed to load restaurants. {error?.message || ""}
        </Alert>
      )}

      {/* List */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-3 mt-2">
        {isLoading ? (
          <ListSkeleton count={8} />
        ) : items.length === 0 ? (
          <Col>
            <Alert variant="secondary" className="mt-3">
              No restaurants found. Try adjusting filters.
            </Alert>
          </Col>
        ) : (
          items.map((r) => (
            <Col key={r._id || r.id}>
              <RestaurantCard r={r} />
            </Col>
          ))
        )}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack direction="horizontal" className="justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              disabled={page <= 1}
              onClick={() => update({ page: 1 })}
            />
            <Pagination.Prev
              disabled={page <= 1}
              onClick={() => update({ page: page - 1 })}
            />
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <Pagination.Item
                  key={p}
                  active={p === page}
                  onClick={() => update({ page: p })}
                >
                  {p}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              disabled={page >= totalPages}
              onClick={() => update({ page: page + 1 })}
            />
            <Pagination.Last
              disabled={page >= totalPages}
              onClick={() => update({ page: totalPages })}
            />
          </Pagination>
        </Stack>
      )}
    </Container>
  );
}

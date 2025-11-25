type FilterValue = string | string[] | undefined;

type NormalizedFilter = {
  normalizedFilter?: string;
  isStarredFilter?: "starred";
  activeFilter: "all" | "starred";
};

export const normalizeNotesFilter = (filter: FilterValue): NormalizedFilter => {
  const normalizedFilter = Array.isArray(filter) ? filter[0] : filter;
  const isStarredFilter =
    normalizedFilter === "starred" ? "starred" : undefined;
  const activeFilter = isStarredFilter ?? "all";

  return {
    normalizedFilter,
    isStarredFilter,
    activeFilter,
  };
};

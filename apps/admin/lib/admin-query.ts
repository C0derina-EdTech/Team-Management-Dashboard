// Builds query string for BetterAuth admin endpoints
export function adminQueryBuilder(
  baseUrl: string,
  params: Record<string, any>
) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "" && value !== "all") {
      query.set(key, String(value));
    }
  });

  return `${baseUrl}?${query.toString()}`;
}

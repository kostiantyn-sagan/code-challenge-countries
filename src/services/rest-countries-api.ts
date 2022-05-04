const BASE_URL = "https://restcountries.com/v3.1";

async function fetchWithErrorHandling(url = "", config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not Found"));
}

export function fetchCountries({
  searchQuery,
  selectedRegion,
}: {
  searchQuery: string;
  selectedRegion: string;
}) {
  if (searchQuery) {
    return fetchWithErrorHandling(`${BASE_URL}/name/${searchQuery}`);
  }

  if (selectedRegion) {
    return fetchWithErrorHandling(`${BASE_URL}/region/${selectedRegion}`);
  }

  return fetchWithErrorHandling(`${BASE_URL}/all`);
}

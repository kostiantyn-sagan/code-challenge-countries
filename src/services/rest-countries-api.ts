const BASE_URL = "https://restcountries.com/v2";

async function fetchWithErrorHandling(url = "", config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not Found"));
}

export function fetchCountries({
  searchQuery = "",
  selectedRegion = "",
  countryCodes = "",
}: {
  searchQuery?: string;
  selectedRegion?: string;
  countryCodes?: string;
}) {
  if (searchQuery) {
    return fetchWithErrorHandling(`${BASE_URL}/name/${searchQuery}`);
  }

  if (selectedRegion) {
    return fetchWithErrorHandling(`${BASE_URL}/region/${selectedRegion}`);
  }
  if (countryCodes) {
    return fetchWithErrorHandling(`${BASE_URL}/alpha?codes=${countryCodes}`);
  }

  return fetchWithErrorHandling(`${BASE_URL}/all`);
}

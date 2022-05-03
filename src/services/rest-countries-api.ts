const BASE_URL = "https://restcountries.com/v3.1";

async function fetchWithErrorHandling(url = "", config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not Found"));
}

export function fetchAll() {
  return fetchWithErrorHandling(`${BASE_URL}/all`);
}

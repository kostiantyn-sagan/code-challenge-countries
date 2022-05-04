import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import Loader from "react-loader-spinner";
import * as restCountriesAPI from "../services/rest-countries-api";
import CountryList from "../components/CountryList";
import SearchInput from "../components/SearchInput";
import FilterByRegion from "../components/FilterByRegion";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function DetailPage() {
  const location = useLocation();
  console.log(location);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    setStatus(Status.PENDING);

    restCountriesAPI
      .fetchCountries({ searchQuery, selectedRegion })
      .then((countries) => {
        setCountries(countries);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [selectedRegion, searchQuery]);

  return (
    <section>
      <h1>It`s Detail Page</h1>
      <Container>
        <SearchInput onSubmit={setSearchQuery} />
        <FilterByRegion setSelectedRegion={setSelectedRegion} />

        {status === Status.REJECTED && <p>{error}</p>}

        {status === Status.PENDING && <p>Loading...</p>}

        {status === Status.RESOLVED && <CountryList countries={countries} />}
      </Container>
    </section>
  );
}

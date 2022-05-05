import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container } from "@mui/material";
import { AiOutlineArrowLeft } from "react-icons/ai";
import * as restCountriesAPI from "../services/rest-countries-api";
import CountryDetail from "../components/CountryDetail";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function DetailPage() {
  const location = useLocation();

  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    restCountriesAPI
      .fetchCountries({
        countryCodes: location.state.countryCode,
      })
      .then((countries) => {
        setCountries(countries);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [location.state.countryCode]);

  return (
    <section>
      <Container>
        <Link to={location?.state?.from ?? "/"} className="goBackLink">
          <AiOutlineArrowLeft className="goBackIcon" />
          Back
        </Link>

        {status === Status.REJECTED && <p>{error}</p>}

        {status === Status.PENDING && <p>Loading...</p>}

        {status === Status.RESOLVED && <CountryDetail countries={countries} />}
      </Container>
    </section>
  );
}

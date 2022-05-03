import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Loader from "react-loader-spinner";
import * as restCountriesAPI from "../services/rest-countries-api";
import CountryList from "../components/CountryList";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function HomePage() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);

    restCountriesAPI
      .fetchAll()
      .then((countries) => {
        setCountries(countries);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, []);

  // if (status === Status.REJECTED) {
  //   return <p>{error}</p>;
  // }
  // if (status === Status.PENDING) {
  //   return <p>Загружаем...</p>;
  // }
  // if (status === Status.RESOLVED) {
  //   return <p>It`s Countries List</p>;
  // }

  return (
    <section>
      <Container>
        {status === Status.REJECTED && <p>{error}</p>}

        {status === Status.PENDING && <p>Loading...</p>}

        {status === Status.RESOLVED && <CountryList countries={countries} />}
      </Container>
    </section>
  );
}

import React, { FC, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Grid,
  ButtonGroup,
  Button,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import * as restCountriesAPI from "../../services/rest-countries-api";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// Types

type Country = {
  flags: {
    png: string;
  };
  name: {
    common: string;
    nativeName: {
      nld: {
        common: string;
      };
    };
  };
  population: number;
  region: string;
  subregion: string;
  capital: Array<string>;
  tld: Array<string>;
  currencies: {
    EUR: {
      name: string;
    };
  };
  languages: {};
  borders: Array<string>;
  nativeName: string;
};

type PropTypes = {
  countries: Array<Country>;
};

const CountryDetail: FC<PropTypes> = ({ countries }) => {
  const [borderCountries, setBorderCountries] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  const [country] = countries;

  const borderCountryCodes = country.borders.join(",");

  useEffect(() => {
    setStatus(Status.PENDING);

    restCountriesAPI
      .fetchCountries({
        countryCodes: borderCountryCodes,
      })
      .then((countries) => {
        setBorderCountries(countries);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [borderCountryCodes]);

  const transformLanguages = (languages: {}) =>
    Object.values(languages).reverse().join(", ");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <img src={`${country.flags.png}`} alt={country.name.common} />
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <Typography>{country.name.common}</Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography>Native Name: {country.nativeName}</Typography>
                <Typography>
                  Population:{" "}
                  {new Intl.NumberFormat("en-US").format(country.population)}
                </Typography>
                <Typography>Region: {country.region}</Typography>
                <Typography>Sub Region: {country.subregion}</Typography>
                <Typography>Capital: {country.capital}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Top Level Domain: {country.tld}</Typography>
                <Typography>
                  Currencies: {country.currencies.EUR.name}
                </Typography>
                <Typography>
                  Languages:{" "}
                  {transformLanguages(country.languages) as React.ReactNode}
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={3}>
                <Typography>Border Countries:</Typography>
              </Grid>
              <Grid item xs={9}>
                {status === Status.REJECTED && <p>{error}</p>}

                {status === Status.PENDING && <p>Loading...</p>}

                {status === Status.RESOLVED && (
                  <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                  >
                    <Button>One</Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                  </ButtonGroup>
                )}
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CountryDetail;

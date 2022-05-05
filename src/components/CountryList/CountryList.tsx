import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// Types
type Country = {
  population: number;
  flags: {
    png: string;
  };
  name: { common: string };
  region: string;
  cca3: string;
  capital: Array<string>;
};
type PropTypes = {
  countries: Array<Country>;
};

const CountryList: FC<PropTypes> = ({ countries }) => {
  const location = useLocation();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {countries.map((country) => (
            <Grid item xs={3} key={country.name.common}>
              <Link
                to={{
                  pathname: "/detail",
                  state: { from: location, countryCode: country.cca3 },
                }}
              >
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={country.flags.png}
                    alt={country.name.common}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {country.name.common}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Population:{" "}
                      {new Intl.NumberFormat("en-US").format(
                        country.population
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Region: {country.region}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Capital: {country.capital}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default CountryList;

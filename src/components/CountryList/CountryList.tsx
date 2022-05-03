import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  CardActions,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Types
type Country = {
  population: number;
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
};
type PropTypes = {
  countries: Array<Country>;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const CountryList: FC<PropTypes> = ({ countries }) => {
  const location = useLocation();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {countries.map((country) => (
            <Grid item xs={3} key={country.population}>
              <Link to={{ pathname: "/detail", state: { from: location } }}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={country.flags.png}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
      {/* <ImageList sx={{ width: 500, height: 450 }}>
        {countries.map((country) => (
          <ImageListItem key={country.population}>
            <img
              src={`${country.flags.png}?w=248&fit=crop&auto=format`}
              srcSet={`${country.flags.png}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={country.name.common}
              loading="lazy"
            />
            <ImageListItemBar
              title={country.name.common}
              subtitle={<span>Population: {country.population}</span>}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList> */}
    </div>
  );
};

export default CountryList;

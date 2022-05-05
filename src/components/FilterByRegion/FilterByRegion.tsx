import { FC, useState } from "react";
import { MenuItem, FormControl, Select } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import s from "./FilterByRegion.module.css";

const ArrowIcon = () => {
  return <FontAwesomeIcon icon={faAngleDown} className={s.icon} />;
};

// Types

type PropTypes = {
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
};

const FilterByRegion: FC<PropTypes> = ({ setSelectedRegion }) => {
  const [region, setRegion] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
    setSelectedRegion(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Filter by Region</em>;
          }
          return selected;
        }}
        IconComponent={ArrowIcon}
        value={region}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="Africa">Africa</MenuItem>
        <MenuItem value="America">America</MenuItem>
        <MenuItem value="Asia">Asia</MenuItem>
        <MenuItem value="Europe">Europe</MenuItem>
        <MenuItem value="Oceania">Oceania</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FilterByRegion;

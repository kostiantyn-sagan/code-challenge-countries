import { useState, FC } from "react";
import SearchIcon from "@mui/icons-material/Search";
import s from "./SearchInput.module.css";

// Types

type PropTypes = {
  onSubmit: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput: FC<PropTypes> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (query.trim() === "") {
      alert("Enter your search term.");
      return;
    }

    onSubmit(query);
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <button type="submit" className={s.button}>
        <SearchIcon />
        <span className={s.buttonLabel}>Search</span>
      </button>

      <input
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search for a country..."
        value={query}
        onChange={handleQueryChange}
      />
    </form>
  );
};

export default SearchInput;

import React from "react";
import styles from "../styles/Search.module.css";

type SearchProps = {
  onUpdate: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ onUpdate }) => {
  return (
    <input
      className={styles.searchBar}
      type="text"
      data-testid="search-input"
      placeholder="Search SE Practices..."
      onChange={(e) => onUpdate(e.target.value)}
    />
  );
};

export default Search;

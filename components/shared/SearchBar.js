import { useDispatch } from "react-redux";
import styles from "../../styles/SearchBar.module.scss";

const SearchBar = ({ searchText, searchTextChange }) => {
  const dispatch = useDispatch();
  return (
    <input
      className={`${styles.searchBar} form-control`}
      type="text"
      placeholder="Search here..."
      // placeholder={placeholder}
      value={searchText}
      onChange={(e) => dispatch(searchTextChange(e.target.value))}
    />
  );
};

export default SearchBar;

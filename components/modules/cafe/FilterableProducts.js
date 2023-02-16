import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  searchTextChange,
} from "../../../store/reducers/productsReducer";
import { useScroll } from "../../../utils/hooks/scroll";
import SearchBar from "../../shared/SearchBar";
import ProductsGrid from "./ProductsGrid";

const FilterableProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const searchText = useSelector((state) => state.products.searchText);
  const productsStatus = useSelector((state) => state.products.status);
  const [productsToDisplay, setProductsToDisplay] = useState([]);

  useScroll(); // hook to scroll to previous scrolled position

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
    setProductsToDisplay(() => filteredProducts(searchText));
  }, [productsStatus, dispatch]);

  useEffect(() => {
    setProductsToDisplay(() => filteredProducts(searchText));
  }, [searchText]); // [searchText] -> will run on 'searchText' state change

  const filteredProducts = (text) => {
    return products.filter((x) =>
      x.name.toLowerCase().includes(text.toLowerCase())
    );
  };

  return (
    <div>
      <SearchBar searchText={searchText} searchTextChange={searchTextChange} />
      <ProductsGrid products={productsToDisplay} />
    </div>
  );
};

export default FilterableProducts;

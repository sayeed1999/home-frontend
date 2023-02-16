import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import Product from "../../../components/modules/cafe/Product";
import SingleInputForm from "../../../components/shared/SingleInputForm";
import {
  fetchProductById,
  giveProductRating,
} from "../../../store/reducers/productsReducer";

const ProductDetail = () => {
  // console.log("product detail rendered");
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  let product = useSelector((state) => state.products.product);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [yourRating, setYourRating] = useState();

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

  useEffect(() => {
    if (product?.ratings && currentUser) {
      const rating = product.ratings.find(
        (x) => x.userid === currentUser.userid
      );
      if (rating) {
        setYourRating(() => rating.star);
      }
    }
  }, [product]);

  const onRatingSubmit = () => {
    if (
      !(Number.isInteger(+yourRating) && +yourRating >= 1 && +yourRating <= 5)
    ) {
      return swal({
        title: "Warning",
        text: "Rating must be an integer between 1-5",
        icon: "warning",
      });
    }
    dispatch(giveProductRating({ productId: product._id, yourRating }));
  };

  // useCallback() memoizes a function
  // useCallback() memoizes a value
  // should i use these here ??

  const calculateOverallRating = () => {
    if (!product?.ratings?.length === 0) return 0.0;

    let sum = 0,
      count = 0;
    product.ratings.forEach((r) => {
      sum += r.star;
      count++;
    });

    return (sum / count).toFixed(1);
  };

  const countUsersForRating = (rating) => {
    return product.ratings.filter((x) => x.star === rating).length; // in js, 4 == '4'
  };

  return (
    <>
      {product && (
        <Product
          product={product}
          render={(props) => (
            <div className="row">
              <div className="col-md-6">{props}</div>
              <div className="col-md-6">
                <b>Ingredients:</b> <br />
                {product.ingredients}
                <br />
                <br />
                <h6>Overall Review: {calculateOverallRating()}</h6>
                {currentUser && (
                  <SingleInputForm
                    type="number"
                    state={yourRating}
                    setState={setYourRating}
                    placeholder="Your rating between 1-5:"
                    onSubmit={onRatingSubmit}
                  />
                )}
                <div>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating}>
                      <Typography variant="caption">
                        Rating given {rating}/5: {countUsersForRating(rating)}{" "}
                        users
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        />
      )}
    </>
  );
};

export default ProductDetail;

import Link from "next/link";
import styles from "../../../styles/ProductWrapper.module.scss";

const ProductWrapper = ({ children, productId }) => {
  return (
    <div>
      {children}
      <p className={styles.addToCartButton}>Order Now</p>
      <Link
        style={{ textDecoration: "none" }}
        href={`/cafe/product/${productId}`}
      >
        <p className={styles.productReview}>Review</p>
      </Link>
    </div>
  );
};

export default ProductWrapper;

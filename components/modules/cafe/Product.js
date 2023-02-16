import styles from "../../../styles/Product.module.scss";

/// 'Render-props pattern' used.
const Product = ({ product, render }) => {
  if (render) {
    return render(getProductComponent(product));
  }
  return getProductComponent(product);
};

const getProductComponent = (product) => {
  return (
    <>
      {product && (
        <div style={{ margin: "10px 0" }}>
          <img
            alt=""
            src={product.img}
            className="img-fluid d-block"
            style={{ objectFit: "cover", height: "250px", width: "100%" }}
          />
          <p className={styles.productName}>{product.name}</p>
          <div className={styles.priceStock}>
            <div> ${product.price} </div>
            <div> {product.stocked ? "In Stock" : "Out Of Stock"} </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;

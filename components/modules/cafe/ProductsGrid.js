import Product from "./Product";
import ProductWrapper from "./ProductWrapper";

const ProductsGrid = ({ products }) => {
  return (
    <div className="row">
      {products &&
        Object.entries(products).map((entry) => (
          <div className="col-md-6" key={entry[0]}>
            {/* Render props pattern used to display products */}
            <Product
              product={entry[1]}
              render={(child) => (
                <ProductWrapper productId={entry[1]._id}>{child}</ProductWrapper>
              )}
            />
            {/* <ProductWrapper productId={entry[0]}>
              <Product product={entry[1]} />
            </ProductWrapper> */}
          </div>
        ))}
    </div>
  );
};

export default ProductsGrid;

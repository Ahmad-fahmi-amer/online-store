import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { Latest } from "../../../../Api/Api";
import SaleProducts from "../saleProducts/SaleProducts";
import SkeletonShow from "../../../Skeleton/Skeleton";
import { Container } from "react-bootstrap/cjs";

export default function ShowLatestProduct() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${Latest}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productShow = products.map((product) => (
    <SaleProducts
      title={product.title}
      description={product.description}
      discount={product.discount}
      img={product.images[0].image}
      price={product.price}
      rating={product.rating}
      id={product.id}
      col="3"
    />
  ));
  return (
    <Container>
      <h1 className="mt-3">Latest Products</h1>
      <div className="d-flex align-item-stretch justify-content-center flex-wrap row-gap mb-5">
        {loading ? (
          <SkeletonShow
            height="300px"
            classes="col-lg-3 col-md-6 col-12"
            length="4"
          />
        ) : (
          productShow
        )}
      </div>
    </Container>
  );
}

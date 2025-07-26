import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { LatestSale } from "../../../../Api/Api";
import SaleProducts from "./SaleProducts";
import SkeletonShow from "../../../Skeleton/Skeleton";

export default function ShowSaleProducts() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${LatestSale}`)
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
      col="6"
      id={product.id}
      sale
    />
  ));
  return (
    <div className="col-lg-6 col-12">
      <div className="ms-md-3">
        <h1>Sale Products</h1>
        <div className="d-flex align-item-stretch justify-content-center flex-wrap row-gap mb-5">
          {loading ? (
            <SkeletonShow height="300px" classes="col-lg-6 col-12" length="2" />
          ) : (
            productShow
          )}
        </div>
      </div>
    </div>
  );
}

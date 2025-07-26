import { useEffect, useState } from "react";
import { Axios } from "../../../../Api/axios";
import { topRated } from "../../../../Api/Api";
import TopRated from "./TopRated";
import SkeletonShow from "../../../Skeleton/Skeleton";

export default function ShowTopRated() {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get(`${topRated}`)
      .then((res) => setProduct(res.data))
      .finally(() => setLoading(false));
  }, []);

  const productShow = products.map((product) => (
    <TopRated
      title={product.title}
      description={product.description}
      discount={product.discount}
      img={product.images[0].image}
      price={product.price}
      rating={product.rating}
      id={product.id}
    />
  ));
  return (
    <div className="col-lg-6 col-12 border border-primary border-5 rounded">
      <div className="ms-md-3">
        <h1>top rated</h1>
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

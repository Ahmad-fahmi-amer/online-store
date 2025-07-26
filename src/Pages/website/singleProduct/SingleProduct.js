import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Container } from "react-bootstrap/cjs";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { cart, PRODUCT } from "../../../Api/Api";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SkeletonShow from "../../../Components/Skeleton/Skeleton";
import { Cart } from "../../../context/CartChangerContext";
import PlusMinusBtn from "../../../Components/website/Btn/PlusMinusBtn";

export default function SingleProduct(props) {
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);
  const [count, setCount] = useState(5);
  const { setIsChange } = useContext(Cart);
  const { id } = useParams();

  const roundStars = Math.round(product.rating);
  const stars = Math.min(roundStars, 5);
  const showGoldStars = Array.from({ length: stars }).map((_, index) => (
    <FontAwesomeIcon color="gold" key={index} icon={solid} />
  ));
  const showEmptyStars = Array.from({ length: 5 - stars }).map((_, index) => (
    <FontAwesomeIcon key={index} icon={regularStar} />
  ));

  useEffect(() => {
    Axios.get(`${PRODUCT}/${id}`)
      .then((res) => {
        setProductImages(
          res.data[0].images.map((img) => {
            return { original: img.image, thumbnail: img.image };
          })
        );
        setProduct(res.data[0]);
      })
      .finally(() => setLoading(false));
  }, []);

  const checkStock = async () => {
    try {
      setLoadingCart(true);
      const getItems = JSON.parse(localStorage.getItem("product")) || [];
      const productCount = getItems.filter((item) => item.id == id)?.[0]?.count;

      console.log(productCount);
      await Axios.post(`${cart}/check`, {
        product_id: product.id,
        count: count + (productCount ? productCount : 0),
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoadingCart(false);
    }
  };

  const handleSave = async () => {
    const check = await checkStock();
    if (check) {
      const getItem = JSON.parse(localStorage.getItem("product")) || [];

      const productExist = getItem.findIndex(
        (pro) => String(pro.id) === String(id)
      );
      if (productExist !== -1) {
        // getItem[productExist].count = count;
        if (getItem[productExist].count) {
          getItem[productExist].count += count;
        } else {
          getItem[productExist].count = count;
        }
      } else {
        if (count > 1) {
          product.count = count;
        }
        getItem.push(product);
      }

      localStorage.setItem("product", JSON.stringify(getItem));
      setIsChange((prev) => !prev);
    }
  };

  return (
    <Container className="mt-5">
      <div className="d-flex align-item-start flex-wrap">
        {loading ? (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <SkeletonShow height="250px" classes="col-12" length="1" />
              <div className="col-12 d-flex mt-1">
                <SkeletonShow height="100px" classes="col-4" length="1" />
                <SkeletonShow height="100px" classes="col-4" length="1" />
                <SkeletonShow height="100px" classes="col-4" length="1" />
              </div>
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <SkeletonShow height="30px" classes="col-8 mb-1" length="1" />
              <SkeletonShow height="30px" classes="col-12 mb-1" length="5" />
              <SkeletonShow height="30px" classes="col-6 mb-1" length="1" />
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-4 col-md-6 col-12">
              <ImageGallery items={productImages} />
            </div>
            <div className="col-lg-8 col-md-6 col-12">
              <div className="ms-5">
                <h1>{product.title}</h1>
                <p style={{ color: "gray" }}>{product.About}</p>
                <h3 className="fw-normal">{product.description}</h3>
                <div className="d-flex align-items-center justify-content-between pt-4 border-top">
                  <div>
                    {showGoldStars}
                    {showEmptyStars}
                    <div className="d-flex align-items-center gap-3">
                      <h5 className="m-0 text-primary">{product.discount}$</h5>
                      <h6
                        className="m-0"
                        style={{
                          color: "gray",
                          textDecoration: "line-through",
                        }}
                      >
                        {product.price}$
                      </h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-4">
                    <PlusMinusBtn setCount={(data) => setCount(data)} />
                    <div onClick={handleSave} className="border p-2 rounded">
                      <img
                        src={require("../../../Assets/Icons/Cart.png")}
                        alt="cart"
                        width="20px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}

import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CATEGORIES } from "../../../Api/Api";
import "./navbar.css";
import StringSlice from "../../../helpers/StringSlice";
import PlusMinusBtn from "../Btn/PlusMinusBtn";
import SkeletonShow from "../../Skeleton/Skeleton";
import { Cart } from "../../../context/CartChangerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { Dropdown, DropdownButton } from "react-bootstrap";
// import Cookie from "cookie-universal";
// import { Navigate } from "react-router-dom";
// import { LOGOUT, USER } from "../../../Api/Api";

export default function NavBar() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5);
  const [products, setProducts] = useState([]);
  const { isChange } = useContext(Cart);

  useEffect(() => {
    Axios.get(`${CATEGORIES}`)
      .then((res) => setCategories(res.data.slice(-8)))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProducts(getProducts);
  }, [isChange]);

  const handleDelete = (id) => {
    const filterProduct = products.filter((product) => product.id !== id);
    setProducts(filterProduct);
    localStorage.setItem("product", JSON.stringify(filterProduct));
  };
  const changeCount = (id, btnCount) => {
    const getProducts = JSON.parse(localStorage.getItem("product")) || [];
    const findProduct = getProducts.find((product) => product.id === id);
    findProduct.count = btnCount;
    localStorage.setItem("product", JSON.stringify(getProducts));
  };

  const productsShow = products?.map((product, key) => (
    <div className="mb-4 position-relative" key={key}>
      <div
        onClick={() => handleDelete(product.id)}
        className="position-absolute top-0 end-0 rounded-circle d-flex
        align-items-center justify-content-center bg-danger text-white"
        style={{ width: "20px", height: "20px", cursor: "pointer" }}
      >
        <FontAwesomeIcon width="10px" icon={faXmark} />
      </div>
      <div className="d-flex align-items-start gap-2 flex-wrap">
        <img
          src={product.images[0].image}
          height="80px"
          style={{ objectFit: "cover" }}
          className="rounded col-sm-3 col-12"
          alt="img"
        />
        <div className="col-sm-6 col-12">
          <h6>{product.title}</h6>
          <p className="m-0 text-truncate">{product.description}</p>
          <div className="d-flex align-items-center gap-3">
            <h5 className="m-0 text-primary">{product.discount}$</h5>
            <h6
              className="m-0"
              style={{ color: "gray", textDecoration: "line-through" }}
            >
              {product.price}$
            </h6>
          </div>
        </div>
        <PlusMinusBtn
          count={product.count || 1}
          setCount={setCount}
          id={product.id}
          changeCount={changeCount}
        />
      </div>
    </div>
  ));

  const categoriesShow = categories.map((category, index) => (
    <div key={index} className="category-box">
      {StringSlice(category.title, 15)}
    </div>
  ));
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const cookie = Cookie();
  // const [name, setName] = useState("");
  // useEffect(() => {
  //   Axios.get(`/${USER}`)
  //     .then((data) => setName(data.data.name))
  //     .catch(() => Navigate("/login", { replace: true }));
  // }, []);
  // async function handleLogout() {
  //   try {
  //     const res = await Axios.get(`/${LOGOUT}`);
  //     cookie.remove("e-commerce");
  //     window.location.pathname = "/login";
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{productsShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <nav className="py-3">
        <Container>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <Link className="col-3" to="/">
              <img
                width="180px"
                height="100px"
                src={require("../../../Assets/Icons/brand.png")}
                alt="logo"
              />
            </Link>
            <div className="col-12 col-md-6 order-md-2 order-3 mt-md-0 mt-3 position-relative">
              <Form.Control
                type="search"
                className="form-control custom-search py-3 rounded-0"
                placeholder="Search Product"
              />
              <button className="btn btn-primary position-absolute top-0 end-0 h-100 line-height-0 px-4 rounded-0 d-flex align-items-center justify-content-center">
                Search
              </button>
            </div>
            <div></div>
            <div className="col-3 d-flex align-items-center justify-content-end gap-4 order-md-3 order-1">
              <div onClick={handleShow}>
                {/* <button
                className="btn btn-primary"
                onClick={handleLogout}
                id="dropdown-basic-button"
                title={name}
              >
                Logout
              </button> */}
                <img
                  width="35px"
                  src={require("../../../Assets/Icons/Cart.png")}
                  alt="cart"
                />
              </div>
              <Link to="/profile">
                <img
                  width="35px"
                  src={require("../../../Assets/Icons/profile.png")}
                  alt="cart"
                />
              </Link>
            </div>
          </div>

          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              {loading ? (
                <SkeletonShow length="8" height="30px" width="80px" />
              ) : (
                categoriesShow
              )}
              <Link className="text-black category-title" to="/categories">
                show All
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
}

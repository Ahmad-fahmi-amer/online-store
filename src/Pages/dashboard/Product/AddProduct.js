import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Loading from "../../../Components/Loading/Loading";
import { CATEGORIES, PRODUCT } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  // constant
  const [form, setForm] = useState({
    category: "Select Category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });

  const dummyForm = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 1234,
    discount: 0,
    About: "dummy",
    stock: 0,
  };

  const [images, setImages] = useState([]);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [categories, setCategories] = useState([]);
  const nav = useNavigate();

  // useRef
  const focus = useRef("");
  const openImage = useRef(null);
  const progress = useRef([]);
  const ids = useRef([]);

  //handle focus
  useEffect(() => {
    focus.current.focus();
  }, []);

  // handle Open Image
  function handleOpenImage() {
    openImage.current.click();
  }

  // get all Categories
  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  // handle edit
  async function handleEdit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      await Axios.post(`${PRODUCT}/edit/${id}`, form);
      nav("/dashboard/products");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  // handle Submit Form
  async function handleSubmitForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dummyForm);
      setId(res.data.id);
    } catch (error) {
      console.log(error);
    }
  }

  // handle change
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setSent(1);
    if (sent !== 1) {
      handleSubmitForm();
    }
  }

  //handle image change

  const j = useRef(-1);
  async function handleImagesChange(e) {
    setImages((prev) => [...prev, ...e.target.files]);

    const imagesAsFiles = e.target.files;

    const data = new FormData();
    for (let i = 0; i < imagesAsFiles.length; i++) {
      j.current++;
      data.append("image", imagesAsFiles[i]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;

            const percent = Math.floor((loaded * 100) / total);

            if (percent % 10 === 0) {
              progress.current[j.current].style.width = `${percent}%`;
              progress.current[j.current].setAttribute(
                "percent",
                `${percent}%`
              );
            }
          },
        });
        ids.current[j.current] = res.data.id;
      } catch (error) {
        console.log(error);
      }
    }
  }

  // map

  //map categories Show
  const categoriesShow = categories.map((item, key) => (
    <option key={key} value={item.id}>
      {item.title}
    </option>
  ));
  //handle delete image
  async function handleDeleteImage(id, img) {
    const findId = ids.current[id];
    try {
      await Axios.delete(`/product-img/${findId}`);
      setImages((prev) => prev.filter((image) => image !== img));
      ids.current = ids.current.filter((i) => i !== findId);
      --j.current;
    } catch (error) {
      console.log(error);
    }
  }

  const imagesShow = images.map((img, key) => (
    <div className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start gap-2">
          <img src={URL.createObjectURL(img)} width="80px" alt=""></img>
          <div>
            <p className="mb-1">{img.name}</p>
            <p>
              {img.size / 1024 < 900
                ? (img.size / 1024).toFixed(2) + "KB"
                : (img.size / (1024 * 1024)).toFixed(2) + "MB"}
            </p>
          </div>
        </div>
        <Button onClick={() => handleDeleteImage(key, img)} variant="danger">
          Delete
        </Button>
      </div>
      <div className="custom-progress mt-3">
        <span
          ref={(e) => (progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-2" onSubmit={handleEdit}>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categories</Form.Label>
          <Form.Select
            ref={focus}
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option disabled>Select Category</option>
            {categoriesShow}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title..."
            required
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="description..."
            required
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="price..."
            required
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="text"
            name="discount"
            value={form.discount}
            onChange={handleChange}
            placeholder="discount..."
            required
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control
            type="text"
            name="About"
            value={form.About}
            onChange={handleChange}
            placeholder="About..."
            required
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="Stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock..."
            required
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control
            ref={openImage}
            hidden
            multiple
            type="file"
            onChange={handleImagesChange}
            disabled={!sent}
          />
        </Form.Group>
        <div
          onClick={handleOpenImage}
          className="d-flex align-items-center justify-content-center flex-column rounded mb-2 gap-2 py-3"
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #0086fe",
            cursor: !sent ? "" : "pointer",
          }}
        >
          <img
            src={require("../../../Assets/Icons/upload.png")}
            width="100px"
            alt="upload"
            style={{ filter: !sent && "grayscale(1)" }}
          />
          <p style={{ color: !sent ? "gray" : "#0086fe" }} className="fw-bold">
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imagesShow}
        </div>
        <button disabled={false} className="btn btn-primary">
          Add Product
        </button>
      </Form>
    </>
  );
}

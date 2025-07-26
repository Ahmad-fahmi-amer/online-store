import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORY } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddCategory() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const focus = useRef("");

  useEffect(() => {
    focus.current.focus()
  },[]);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATEGORY}/add`, form);
      window.location.pathname = "/dashboard/categories";
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  return (
    <>
      {loading && <Loading />}
      <Form className="bg-white w-100 mx-2 p-2" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            ref={focus}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the Title..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            onChange={(e) => setImage(e.target.files.item(0))}
            type="file"
          />
        </Form.Group>
        <button
          disabled={title.length > 1 ? false : true}
          className="btn btn-primary">
          Add Category
        </button>
      </Form>
    </>
  );
}

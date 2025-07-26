import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { CATEGORY, USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";

export default function Category() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const {id} = useParams()
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true)
    Axios.get(`${CATEGORY}/${id}`)
      .then((data) => {
        setTitle(data.data.title);
        setLoading(false)
      })
      .then(() => setDisable(false))
      .catch(()=> nav("/dashboard/category/page/404",{replace:true}))
  }, []);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("image", image);
    try {
      const res = await Axios.post(`${CATEGORY}/edit/${id}`,form);
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
      <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
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
        <button disabled={disable} className="btn btn-primary">
          Save
        </button>
      </Form>
    </>
  );
}

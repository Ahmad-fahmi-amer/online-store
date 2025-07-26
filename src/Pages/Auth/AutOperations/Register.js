import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { REGISTER, baseURl } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const focus = useRef("");

  useEffect(() => {
    focus.current.focus()
  },[]);

  const cookie = Cookie();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURl}/${REGISTER}`, form);
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
      window.location.pathname = "/";
    } catch (err) {
      setLoading(false);
      if (err.response.status === 422) {
        setError("Email is already been taken");
      } else {
        setError("internal server error");
      }
    }
  }
  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handleSubmit}>
            <div className="custom-form">
              <h1>Login</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput">
                <Form.Control
                  ref={focus}
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your username..."
                  required
                />
                <Form.Label>username</Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1">
                <Form.Control
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your Email..."
                  required
                />
                <Form.Label>Email</Form.Label>
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2">
                <Form.Control
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password..."
                  minLength="6"
                  required
                />
                <Form.Label>Password</Form.Label>
              </Form.Group>
              <button className="btn btn-primary">Register</button>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20210313114223%21Google_%22G%22_logo.svg"
                      alt="Sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Register with google</b>
                  </p>
                </a>
              </div>
              {error !== "" && <span className="error">{error}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

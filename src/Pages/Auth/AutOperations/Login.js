import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LOGIN, baseURl } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const cookie = Cookie();

  const focus = useRef("");

  useEffect(() => {
    focus.current.focus()
  },[]);

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
      const res = await axios.post(`${baseURl}/${LOGIN}`, form);
      setLoading(false);
      const token = res.data.token;
      const role = res.data.user.role;
      const go = role === "1995" ? "users" : "writer";
      cookie.set("e-commerce", token);
      window.location.pathname = `/dashboard/${go}`;
    } catch (error) {
      setLoading(false);
      if (error.response.status === 401) {
        setError("wrong email or password");
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
                controlId="exampleForm.ControlInput1">
                <Form.Control
                  ref={focus}
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
              <button className="btn btn-primary">Login</button>
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
                    <b>Sign in with google</b>
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

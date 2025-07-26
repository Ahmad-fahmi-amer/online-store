import { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import Loading from "../../../Components/Loading/Loading";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const focus = useRef("");

  useEffect(() => {
    focus.current.focus()
  },[]);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      window.location.pathname = "/dashboard/users";
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
          <Form.Label>username</Form.Label>
          <Form.Control
            ref={focus}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your username..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password..."
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1996">Writer</option>
            <option value="1999">Product Manger</option>
          </Form.Select>
        </Form.Group>
        <button
          disabled={
            name.length > 3 &&
            email.length > 3 &&
            password.length > 6 &&
            role !== ""
              ? false
              : true
          }
          className="btn btn-primary">
          Add User
        </button>
      </Form>
    </>
  );
}

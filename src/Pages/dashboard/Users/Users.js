import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";

import { Link } from "react-router-dom";
import TableShow from "../../../Components/dashboard/Table";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    Axios.get(`${USER}`).then((data) => setCurrentUser(data.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USERS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setUsers(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  //handle delete
  async function handleDelete(id) {
    try {
      await Axios.delete(`${USER}/${id}`);
      setUsers((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  const header = [
    {
      key: "name",
      name: "username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];

  return (
    <div className="bg-white p-2 w-100 ">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users Page</h1>
        <Link className="btn btn-primary" to="/dashboard/user/add">
          Add User
        </Link>
      </div>
      <TableShow
        page={page}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        header={header}
        data={users}
        delete={handleDelete}
        currentUser={currentUser}
        loading={loading}
        total={total}
        search="name"
        searchLink={USER}
      />
    </div>
  );
}

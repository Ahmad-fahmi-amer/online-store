import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { CATEGORIES, CATEGORY } from "../../../Api/Api";
import { useEffect, useState } from "react";
import TableShow from "../../../Components/dashboard/Table";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${CATEGORIES}?limit=${limit}&page=${page}`)
      .then((data) => {
        setCategories(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);

  async function handleDelete(id) {
    try {
      await Axios.delete(`${CATEGORY}/${id}`);
      setCategories((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }


  const header = [
    { key: "title", name: "title" },
    { key: "image", name: "image" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];
  return (
    <div className="bg-white p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link className="btn btn-primary" to="/dashboard/category/add">
          Add Categories
        </Link>
      </div>
      {/* <Form.Control
        onChange={(e) => setSearch(e.target.value)}
        className="my-2"
        type="search"
        aria-label="input example"
        placeholder="search"
      /> */}
      <TableShow
        page={page}
        header={header}
        data={categories}
        delete={handleDelete}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
        loading={loading}
        total={total}
        search="title"
        searchLink={CATEGORY}
      />
    </div>
  );
}

import { Link } from "react-router-dom";
import { Axios } from "../../../Api/axios";
import { PRODUCT, PRODUCTS } from "../../../Api/Api";
import { useEffect, useState } from "react";
import TableShow from "../../../Components/dashboard/Table";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${PRODUCTS}?limit=${limit}&page=${page}`)
      .then((data) => {
        setProducts(data.data.data);
        setTotal(data.data.total);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [limit, page]);
  async function handleDelete(id) {
    try {
      await Axios.delete(`${PRODUCT}/${id}`);
      setProducts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }
  const header = [
    { key: "images", name: "Images" },
    { key: "title", name: "Title" },
    { key: "description", name: "Description" },
    { key: "price", name: "Price" },
    { key: "rating", name: "Rating" },
    { key: "created_at", name: "Created" },
    { key: "updated_at", name: "Updated" },
  ];
  return (
    <div className="bg-white p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Products Page</h1>
        <Link className="btn btn-primary" to="/dashboard/product/add">
          Add Product
        </Link>
      </div>
      <TableShow
        limit={limit}
        setLimit={setLimit}
        page={page}
        setPage={setPage}
        header={header}
        data={products}
        delete={handleDelete}
        loading={loading}
        total={total}
        search="title"
        searchLink={PRODUCT}
      />
    </div>
  );
}

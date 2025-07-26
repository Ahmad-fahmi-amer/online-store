import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import PaginatedItems from "./pagination/Pagination";
import { useEffect, useState } from "react";
import { Axios } from "../../Api/axios";
import TransformDate from "../../helpers/TransformDate";
export default function TableShow(props) {
  const currentUser = props.currentUser || {
    name: "",
  };
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const filteredDataByDate =
    date.length !== 0
      ? props.data.filter((item) => TransformDate(item.created_at) === date)
      : props.data;

  const filterSearchByDate =
    date.length !== 0
      ? filterData.filter((item) => TransformDate(item.created_at) === date)
      : filterData;
      
  const showWhichData =
    search.length > 0 ? filterSearchByDate : filteredDataByDate;
  //handle search
  async function getSearchedData() {
    try {
      const res = await Axios.post(
        `${props.searchLink}/search?title=${search}`
      );
      setFilterData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setSearchLoading(false);
    }
  }
  useEffect(() => {
    const debounce = setTimeout(() => {
      search.length > 0 ? getSearchedData() : setSearchLoading(false);
    }, 500);

    return () => clearTimeout(debounce);
  }, [search]);
  const headerShow = props.header.map((item) => <th>{item.name}</th>);
  //body show
  const dataShow = showWhichData.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>
      {props.header.map((item2, key2) => (
        <td key={key2}>
          {item2.key === "image" ? (
            <img width="50px" src={item[item2.key]} alt="" />
          ) : item2.key === "images" ? (
            <div className="d-flex align-items-center justify-content-start gap-2 flex-wrap">
              {item[item2.key].map((img) => (
                <img width="50px" src={img.image} alt="" />
              ))}
            </div>
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item[item2.key] === "1995" ? (
            "admin"
          ) : item[item2.key] === "2001" ? (
            "User"
          ) : item[item2.key] === "1996" ? (
            "Writer"
          ) : item[item2.key] === "1999" ? (
            "product Manger"
          ) : (
            item[item2.key]
          )}
          {currentUser && item[item2.key] === currentUser.name && " (you)"}
        </td>
      ))}
      <td>
        <div className="d-flex align-items-center gap-2">
          <Link to={`${item.id}`}>
            <FontAwesomeIcon fontSize="19px" icon={faPenToSquare} />
          </Link>
          {currentUser.name !== item.name && (
            <FontAwesomeIcon
              cursor="pointer"
              onClick={() => props.delete(item.id)}
              fontSize="19px"
              color="red"
              icon={faTrash}
            />
          )}
        </div>
      </td>
    </tr>
  ));
  return (
    <>
      <div className="col-5">
        <Form.Control
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchLoading(true);
          }}
          className="my-2"
          type="search"
          aria-label="input example"
          placeholder="search"
        />
      </div>
      <div className="col-5">
        <Form.Control
          onChange={(e) => {
            setDate(e.target.value);
            setSearchLoading(true);
          }}
          className="my-2"
          type="date"
          aria-label="input example"
          placeholder="search"
        />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            {headerShow}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.loading ? (
            <tr>
              <td className="text-center" colSpan={12}>
                loading...
              </td>
            </tr>
          ) : searchLoading ? (
            <tr>
              <td className="text-center" colSpan={12}>
                searching...
              </td>
            </tr>
          ) : (
            dataShow
          )}
        </tbody>
      </Table>
      <div className="d-flex align-items-center justify-content-end flex-wrap">
        <div className="col-1">
          <Form.Select
            onChange={(e) => props.setLimit(e.target.value)}
            aria-label="Default select example">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </Form.Select>
        </div>
        <PaginatedItems
          itemsPerPage={props.limit}
          data={props.data}
          setPage={props.setPage}
          total={props.total}
        />
      </div>
    </>
  );
}

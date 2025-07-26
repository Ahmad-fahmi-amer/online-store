import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "../../context/MenuContext";
import { useContext, useEffect, useState } from "react";
import { LOGOUT, USER } from "../../Api/Api";
import { Navigate } from "react-router-dom";
import { Axios } from "../../Api/axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from "cookie-universal"
export default function TopBar() {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const [name, setName] = useState("");

  const cookie = Cookie();
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => Navigate("/login", { replace: true }));
  }, []);

  async function handleLogout() {
    try {
      const res = await Axios.get(`/${LOGOUT}`, );
      cookie.remove("e-commerce");
      window.location.pathname = "/login"
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="top-bar">
      <div className="d-flex align-items-center justify-content-between h-100">
        <div className="d-flex align-items-center gap-5">
          <h3>E-Commerce</h3>
          <FontAwesomeIcon
            onClick={() => setIsOpen((prev) => !prev)}
            cursor={"pointer"}
            icon={faBars}
          />
        </div>
        <div>
          <DropdownButton id="dropdown-basic-button" title={name}>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}

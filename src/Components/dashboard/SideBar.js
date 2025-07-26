import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../context/MenuContext";
import { WindowSize } from "../../context/WindowContext";
import { Axios } from "../../Api/axios";
import { USER } from "../../Api/Api";
import { links } from "./NavLink";
export default function SideBar() {
  const menu = useContext(Menu);
  const windowContext = useContext(WindowSize);
  const windowSize = windowContext.windowSize;
  const isOpen = menu.isOpen;
  //user
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigate("/login", { replace: true }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0 ,0 ,0 ,0.2)",
          display: windowSize < "786" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "240px" : "fit-content",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (link, key) =>
            link.role.includes(user.role) && (
              <NavLink
                key={key}
                to={link.path}
                className="d-flex align-items-center gab-2 side-bar-link"
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  style={{
                    padding: isOpen ? "10px 8px 10px 15px" : "10px 13px",
                  }}
                />
                <p
                  style={{
                    display: isOpen ? "block" : "none",
                  }}
                  className="m-2"
                >
                  {link.name}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}

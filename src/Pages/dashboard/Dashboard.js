import { Outlet } from "react-router-dom";
import SideBar from "../../Components/dashboard/SideBar";
import TopBar from "../../Components/dashboard/TopBar";
import "./dashboard.css";
export default function Dashboard() {
    return (<div className="position-relative dashboard">
        <TopBar/>
        <div className="d-flex gap-1" style={{marginTop:"70px"}}>
        <SideBar/>
        <Outlet/>
        </div>
    </div>);
}


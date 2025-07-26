import "./Home.css";
import Landing from "../../../Components/website/Landing/Landing";
import ShowLatestProduct from "../../../Components/website/Products/latestProducts/ShowLatestProducts";
import { Container } from "react-bootstrap/cjs";
import ShowTopRated from "../../../Components/website/Products/topRated/ShowTopRated";
import ShowSaleProduct from "../../../Components/website/Products/saleProducts/ShowSaleProducts";

export default function HomePage() {
  return (
    <div>
      <Landing />
      <ShowLatestProduct />
      <Container>
        <div className="d-flex flex-wrap mt-5">
          <ShowTopRated />
          <ShowSaleProduct />
        </div>
      </Container>
    </div>
  );
}

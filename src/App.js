import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/website/HomePage/HomePage";
import Login from "./Pages/Auth/AutOperations/Login";
import Register from "./Pages/Auth/AutOperations/Register";
import Users from "./Pages/dashboard/Users/Users";
import GoogleCallback from "./Pages/Auth/AutOperations/GoogleCallback";
import Dashboard from "./Pages/dashboard/Dashboard";
import RequireAuth from "./Pages/Auth/Protecting/RequireAuth";
import User from "./Pages/dashboard/Users/User";
import AddUser from "./Pages/dashboard/Users/AddUser";
import Err403 from "./Pages/Auth/Errors/403";
import Writer from "./Pages/dashboard/Writer";
import Err404 from "./Pages/Auth/Errors/404";
import RequireBack from "./Pages/Auth/Protecting/RequireBack";
import Categories from "./Pages/dashboard/Category/Categories";
import AddCategory from "./Pages/dashboard/Category/AddCategory";
import Category from "./Pages/dashboard/Category/Category";
import Products from "./Pages/dashboard/Product/Products";
import Product from "./Pages/dashboard/Product/Product";
import AddProduct from "./Pages/dashboard/Product/AddProduct";
import WebsiteCategories from "./Pages/website/Categories/Categories";
import Website from "./Pages/website/Website";
import SingleProduct from "./Pages/website/singleProduct/SingleProduct";

function App() {
  return (
    <div>
      <Routes>
        {/* public routes */}
        <Route element={<Website />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<WebsiteCategories />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Route>

        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="/*" element={<Err404 />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        {/* protected routes */}
        <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route element={<RequireAuth allowedRole={["1995"]} />}>
              <Route path="users" element={<Users />} />
              <Route path="403" element={<Err403 />} />
              <Route path="users/:id" element={<User />} />
              <Route path="user/add" element={<AddUser />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
              <Route path="writer" element={<Writer />} />
            </Route>
            <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
              {/* categories */}
              <Route path="categories" element={<Categories />} />
              <Route path="categories/:id" element={<Category />} />
              <Route path="category/add" element={<AddCategory />} />
              {/* products */}
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<Product />} />
              <Route path="product/add" element={<AddProduct />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

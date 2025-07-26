import { faPlus, faUsers,faCartShopping, faTruckFast, faFeatherPointed} from "@fortawesome/free-solid-svg-icons";
export const links = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role:"1995"
  },
  {
    name: "Add User",
    path: "/dashboard/user/add",
    icon: faPlus ,
    role:"1995"

  },
  {
    name: "Categories",
    path: "/dashboard/categories",
    icon: faCartShopping,
    role:["1999","1995"]
  },
  {
    name: "Add Category",
    path: "/dashboard/category/add",
    icon: faPlus,
    role:["1999","1995"]
  },
  {
    name: "Writer",
    path: "/dashboard/writer",
    icon: faFeatherPointed,
    role:["1995","1996"]
  },
  {
    name: "Products",
    path: "/dashboard/products",
    icon: faTruckFast,
    role:["1995","1996"]
  },
  {
    name: "Add Product",
    path: "/dashboard/product/add",
    icon: faPlus,
    role:["1999","1995"]
  },
];

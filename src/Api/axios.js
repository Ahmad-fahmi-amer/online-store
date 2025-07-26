import axios from "axios";
import Cookie from "cookie-universal";
import { baseURl } from "./Api";

const cookie = Cookie();
const token = cookie.get("e-commerce");

export const Axios = axios.create({
  baseURL: baseURl,
  headers: { Authorization: `Bearer ${token}` },
});

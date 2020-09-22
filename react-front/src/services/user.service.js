import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class UserService {
  
  getPublicContent() {
    return axios.get(API_URL + "/public");
  }

  getDashboard() {
    return axios.get(API_URL + "/dashboard", { headers: authHeader() });
  }
}

export default new UserService();

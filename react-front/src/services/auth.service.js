import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL + '/auth';

class AuthService {

  /**
   * We register the user object in DB
   */
  signup(username, email, password) {
    return axios.post(API_URL + "/signup", {
      username,
      email,
      password,
    });
  }

  /**
   * We get the user object from local storage
   */
  getLoggedUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  /**
   * Login
   * Setting of the user object in local storage
   * Get the access token
   */
  login(username, password) {
    return axios
      .post(API_URL + "/signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  /**
  * We removes the user object from local storage
  */
  logout() {
    localStorage.removeItem("user");
  }

}

export default new AuthService();

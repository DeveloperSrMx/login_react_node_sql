export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  /**
   * We set bearer token in authorization header
   */
  if (user && user.accessToken) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}

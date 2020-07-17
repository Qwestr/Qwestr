import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default {
  // Login: Called when the user attempts to log in
  login: ({ username, password }) => {
    return api
      .post("/login", {
        username,
        password,
      })
      .then(() => {
        localStorage.setItem("username", username);
      })
  },
  // Logout: Called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  // checkError: Called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // checkAuth: Called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  },
  // getPermissions: Called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};

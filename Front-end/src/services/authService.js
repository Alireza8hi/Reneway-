import jwtDecode from "jwt-decode";
import http from "./httpService";
import config from "../config.json";
import { toast } from "react-toastify";

const apiEndpoint = config.apiUrl + "/api/login";
const tokenKey = "token";

// http.setJwt(getJwt());

export async function login(username, password) {
  return http.post(apiEndpoint, { username, password });
  // console.log(response);

  //localStorage.setItem(tokenKey, jwt.access);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};

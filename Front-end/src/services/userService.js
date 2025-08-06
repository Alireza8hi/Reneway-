import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/api/register";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    password: user.password,
    email: user.email,
    is_business: false,
    phone: user.phoneNumber,
    national_id: user.nationalCode,
    address: user.address,
  });
}

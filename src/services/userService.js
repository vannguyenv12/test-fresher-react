import axios from "./axiosCustomize";

export const fetchAllUsers = () => {
  return axios.get("/users?page=1");
};

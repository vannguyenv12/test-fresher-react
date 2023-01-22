import axios from "./axiosCustomize";

export const fetchAllUsers = (page) => {
  return axios.get(`/users?page=${page}`);
};

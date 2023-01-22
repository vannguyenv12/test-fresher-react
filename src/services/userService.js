import axios from "./axiosCustomize";

export const fetchAllUsers = (page) => {
  return axios.get(`/users?page=${page}`);
};

export const postCreateUser = (name, job) => {
  return axios.post(`/users`, { name, job });
};

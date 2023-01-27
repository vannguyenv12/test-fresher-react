import axios from "./axiosCustomize";

export const fetchAllUsers = (page) => {
  return axios.get(`/users?page=${page}`);
};

export const postCreateUser = (name, job) => {
  return axios.post(`/users`, { name, job });
};

export const putUpdateUser = (id, name, job) => {
  return axios.put(`/users/${id}`, { name, job });
};

export const deleteUser = (id) => {
  return axios.delete(`/users/${id}`);
};

export const loginUser = (email, password) => {
  return axios.post(`/login`, { email, password });
};

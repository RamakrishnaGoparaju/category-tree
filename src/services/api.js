import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (user) => axios.post(`${API_URL}/users/register`, user);
export const login = (user) => axios.post(`${API_URL}/users/login`, user);
export const getCategories = (token) => axios.get(`${API_URL}/categories`, {
  headers: { 'Authorization': token }
});
export const addCategory = (category, token) => axios.post(`${API_URL}/categories`, category, {
  headers: { 'Authorization': token }
});
export const updateCategory = (id, category, token) => axios.put(`${API_URL}/categories/${id}`, category, {
  headers: { 'Authorization': token }
});
export const deleteCategory = (id, token) => axios.delete(`${API_URL}/categories/${id}`, {
  headers: { 'Authorization': token }
});

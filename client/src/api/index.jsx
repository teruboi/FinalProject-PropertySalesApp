import axios from 'axios';

const url = 'http://localhost:3000';

export const getAgent = () => axios.get(`${url}/getagent`)
export const getCatalog = (query) => axios.get(`${url}/catalog${query}`);
export const createPost = (newPost) => axios.post(url, newPost);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
export const updateProduct = (id, updatedProduct) => axios.patch(`${url}/${id}`, updatedProduct);
export const getProduct = (id) => axios.get(`${url}/product/${id}`);
export const deleteProduct = (id) => axios.delete(`${url}/product/delete/${id}`);
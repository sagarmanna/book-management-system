import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://6a1479406c7db8aac054996b.mockapi.io/api/v1/books';

export const getBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addBook = async (book) => {
  const response = await axios.post(API_URL, book);
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await axios.put(`${API_URL}/${id}`, book);
  return response.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

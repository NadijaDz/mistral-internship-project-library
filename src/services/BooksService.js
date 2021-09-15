import axios from "axios";
const url = process.env.REACT_APP_BASE_URL;

const getBooksByFilters = async (params) => {
  return await axios.get(url + "/Books", {
    params: {
      title: params.title,
      page:params.skip,
      pageSize:params.pageSize,
    },
  });
};

const getAllBooks = async () => {
  return await axios.get(url + "/Books/getAllBooks");
};

const getBookById = async (id) => {
  return await axios.get(url + "/Books" + "/" + id);
};

const addBook = async (data) => {
  return await axios.post(url + "/Books", data);
};

const updateBook = async ( id, data) => {
  return await axios.put(url + "/Books" + "/" + id, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deleteBook = async ( id) => {
  return await axios.delete(url + "/Books" + "/" + id);
};

export { getBooksByFilters, getAllBooks, getBookById, addBook, updateBook, deleteBook };

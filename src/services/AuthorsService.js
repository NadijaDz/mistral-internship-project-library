import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const getAuthorsByFilters = async (params) => {
  return await axios.get(url + "/Authors", {
    params: {
      name: params.name,
      page:params.skip,
      pageSize:params.pageSize,
    },
  });
};

const getAllAuthors = async () => {
  return await axios.get(url + "/Authors/getAllAuthors");
};

const getAuthorById = async (id) => {
  return await axios.get(url + "/Authors" + "/" + id);
};

const addAuthor = async (method, data) => {
  return await axios.post(url + method, data);
};

const updateAuthor = async (method, id, data) => {
  return await axios.put(url + method + "/" + id, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const deleteAuthor = async (method, id) => {
  return await axios.delete(url + method + "/" + id);
};

export { getAuthorsByFilters, getAllAuthors, addAuthor, updateAuthor, getAuthorById, deleteAuthor };

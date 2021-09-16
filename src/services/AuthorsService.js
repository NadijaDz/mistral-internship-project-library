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
  return await axios.get(url + "/Authors/GetAllAuthors");
};

const getAuthorById = async (id) => {
  return await axios.get(url + "/Authors" + "/" + id);
};

const addAuthor = async (data) => {
  return await axios.post(url + "/Authors", data);
};

const updateAuthor = async (id, data) => {
  return await axios.put(url + "/Authors" + "/"  + id, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const deleteAuthor = async (id) => {
  return await axios.delete(url + "/Authors" + "/" + id);
};

export { getAuthorsByFilters, getAllAuthors, addAuthor, updateAuthor, getAuthorById, deleteAuthor };

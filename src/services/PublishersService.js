import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const getPublishersByFilters = async (params) => {
  return await axios.get(url + "/Publishers", {
    params: {
      name: params.name,
      page:params.skip,
      pageSize:params.pageSize,
    },
  });
};

const getAllPublishers = async () => {
  return await axios.get(url + "/Publishers/getAllPublishers");
};

const addPublisher = async (data) => {
  return await axios.post(url + "/Publishers", data);
};

const updatePublisher = async (id, data) => {
  return await axios.put(url + "/Publishers" + "/" + id, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const deletePublisher = async (id) => {
  return await axios.delete(url + "/Publishers" + "/" + id);
};

export { getPublishersByFilters, getAllPublishers, addPublisher, updatePublisher, deletePublisher };

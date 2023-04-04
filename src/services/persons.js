import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};
const create = (nameObject) => {
  return axios.post(baseUrl, nameObject);
};

const remove = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

const update = async (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
  const response = await request;
  return response.data;
  //Rmoved this to fix:
  // const response = await request;
  // return request.then((response) => response.data);
};

const personsService = { getAll, create, remove, update };
export default personsService;

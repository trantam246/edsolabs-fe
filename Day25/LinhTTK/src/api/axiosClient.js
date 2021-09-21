import axios from 'axios';

export const getData = (value) => {
  return axios.get(`${process.env.REACT_APP_API}${value}`);
};

export const postData = (value, data) => {
  return axios.post(`${process.env.REACT_APP_API}${value}`, data);
};

export const deleteData = (value, id) => {
  return axios.delete(`${process.env.REACT_APP_API}${value}/${id}`);
};

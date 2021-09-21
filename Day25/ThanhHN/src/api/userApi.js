import axiosClient from './axiosClient';

const userApi = {
  login(dataUser) {
    return axiosClient.get(`${process.env.REACT_APP_URL}/users`, dataUser);
  },
};

export default userApi;

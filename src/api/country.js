import axios from 'axios';

const getList = () => {
  return axios
    .get('/api/all')
    .then((res) => {
      // console.log(res);
      if (res && res.data) {
        return res.data;
      }
      throw new Error('No result');
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};
const searchCountry = (keywords) => {
  return axios
    .get(`/api/name/${keywords}`)
    .then((res) => {
      // console.log(res);
      if (res && res.data) {
        return res.data;
      }
      throw new Error('No such a country');
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
};

export { getList, searchCountry };

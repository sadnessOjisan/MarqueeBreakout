import axios from "axios";
import HOST_URL from '../constants/url'

const TestAPI = {
  test() {
    return axios
      .get(`${HOST_URL}/`)
      .then(response => ({
        payload: response
      }))
      .catch(error => ({
        error
      }));
  },
};

export default TestAPI;

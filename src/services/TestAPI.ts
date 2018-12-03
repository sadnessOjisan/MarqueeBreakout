import axios from "axios";

const TestAPI = {
  test() {
    return axios
      .get("http://localhost:3000/")
      .then(response => ({
        payload: response
      }))
      .catch(error => ({
        error
      }));
  },
};

export default TestAPI;

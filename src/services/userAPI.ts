import axios from "axios";
import HOST_URL from '../constants/url'

const UserAPI = {
    /**
     * 
     * @param uid sub
     * @param name string
     */
  registerUser(uid:string, name:string) {
    return axios
      .post(`${HOST_URL}/register_user`, 
      {
        uid,name
      })
      .then(response => ({
        payload: response
      }))
      .catch(error => ({
        error
      }));
  },
};

export default UserAPI;

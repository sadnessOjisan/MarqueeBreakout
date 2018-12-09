import axios from "axios";

const UserAPI = {
    /**
     * 
     * @param uid sub
     * @param name string
     */
  registerUser(uid:string, name:string) {
    return axios
      .post("http://localhost:3000/register_user", 
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

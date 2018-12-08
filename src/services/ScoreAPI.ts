import axios from "axios";

const ScoreAPI = {
    /**
     * 
     * @param uid sub
     * @param score number
     */
  registerScore(uid:string, score:number) {
    return axios
      .post("http://localhost:3000/register_score", 
      {
        uid,score
      })
      .then(response => ({
        payload: response
      }))
      .catch(error => ({
        error
      }));
  },
};

export default ScoreAPI;

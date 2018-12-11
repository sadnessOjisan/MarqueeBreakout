import axios from "axios";
import HOST_URL from '../constants/url'

const ScoreAPI = {
    /**
     * 
     * @param uid sub
     * @param score number
     */
  registerScore(uid:string, score:number) {
    return axios
      .post(`${HOST_URL}/register_score`, 
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
  /**
   * user idを指定すると自分のhigh scoreを手に入れる
   * @param uid user id
   */
  getMyHighScore(uid:string) {
    return axios
      .get(`${HOST_URL}/my_score`,{
          params: {
              uid: uid
          }
      })
      .then(response => {return response.data})
      .catch(error => ({
        error
      }));
  },
  getScores(){
    return axios
      .get(`${HOST_URL}/scores`)
      .then(response => {return response.data})
      .catch(error => ({
        error
      }));
  }
};

export default ScoreAPI;

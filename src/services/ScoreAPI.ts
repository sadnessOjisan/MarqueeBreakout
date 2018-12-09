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
  /**
   * user idを指定すると自分のhigh scoreを手に入れる
   * @param uid user id
   */
  getMyHighScore(uid:string) {
    return axios
      .get("http://localhost:3000/my_score",{
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
      .get("http://localhost:3000/scores")
      .then(response => {return response.data})
      .catch(error => ({
        error
      }));
  }
};

export default ScoreAPI;

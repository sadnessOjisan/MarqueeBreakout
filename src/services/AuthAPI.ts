// @flow
import Auth0, {UserInfoAuth}  from "../infrastructures/Auth0";
const AuthAPI = {
  login() {
    const auth = new Auth0();
    auth.login(); 
  },
   getProfile(stateHandler) {
    const auth = new UserInfoAuth();
    auth.getProfile(stateHandler); 
  },
};

export default AuthAPI;

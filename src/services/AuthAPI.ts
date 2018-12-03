// @flow
import Auth0 from "../infrastructures/Auth0";

const AuthAPI = {
  login() {
    const auth = new Auth0();
    auth.login(); 
  },
};

export default AuthAPI;

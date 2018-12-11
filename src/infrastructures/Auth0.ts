import * as auth0 from "auth0-js";
import {ROOT} from '../constants/url'

const AUTHZERO_DOMAIN = process.env.AUTHZERO_DOMAIN ? process.env.AUTHZERO_DOMAIN:''
const AUTHZERO_CLIENT_ID = process.env.AUTHZERO_CLIENT_ID ? process.env.AUTHZERO_CLIENT_ID:''

console.log('AUTHZERO_CLIENT_ID: ', AUTHZERO_CLIENT_ID)

export default class Auth {
  auth = new auth0.WebAuth({
    domain: AUTHZERO_DOMAIN,
    clientID: AUTHZERO_CLIENT_ID,
    redirectUri: ROOT,
    audience: "https://marquee-breakout.appspot.com",
    responseType: "token id_token",
    scope: "openid profile"
  });
  login() {
    this.auth.authorize();
  }
  getProfile(token: string) {
    let userProfile;
    if (!userProfile) {
      if (!token) {
        console.log("Access Token must exist to fetch profile");
      }

      this.auth.client.userInfo(token, (err: any, profile: any) => {
        if (profile) {
          userProfile = profile;
          console.log(userProfile);
        }
        console.log(err);
      });
    } else {
      console.log(userProfile);
    }
  }
}

class UserInfoAuth {
  auth = new auth0.WebAuth({
    domain: AUTHZERO_DOMAIN,
    clientID: AUTHZERO_CLIENT_ID,
    redirectUri: ROOT,
    audience: `https://ojisan.auth0.com/userinfo`,
    responseType: "token id_token",
    scope: "openid profile"
  });
  getProfile(stateHandler:any) {
    this.auth.parseHash({ hash: window.location.hash }, (err:any, authResult:any) => {
      if(!authResult) return null;
      this.auth.client.userInfo(authResult.accessToken, (err:any, user:any) => {
        console.log("<this.auth.client.userInfo> user: ", user);
        stateHandler(user)
        return user;
      });
    });
  }
}

export { UserInfoAuth };

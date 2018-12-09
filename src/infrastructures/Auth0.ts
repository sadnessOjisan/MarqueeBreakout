import auth0 from "auth0-js";

export default class Auth {
  auth = new auth0.WebAuth({
    domain: "ojisan.auth0.com",
    clientID: "V2z2B4tlFXHOOBUlaDexq5QIZs6BZVz2",
    redirectUri: "http://localhost:8089",
    audience: "https://marquee-breakout.appspot.com",
    responseType: "token id_token",
    scope: "openid profile"
  });
  signUp() {
    // this.auth.
  }
  login() {
    this.auth.authorize();
  }
  getProfile(token: string) {
    console.log("<getProfile>token: ", token);
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
    domain: "ojisan.auth0.com",
    clientID: "V2z2B4tlFXHOOBUlaDexq5QIZs6BZVz2",
    redirectUri: "http://localhost:8089",
    audience: `https://ojisan.auth0.com/userinfo`,
    responseType: "token id_token",
    scope: "openid profile"
  });
  getProfile(stateHandler:any) {
    this.auth.parseHash({ hash: window.location.hash }, (err:any, authResult:anuy) => {
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

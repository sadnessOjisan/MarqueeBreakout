import auth0 from "auth0-js";

export default class Auth {
   auth = new auth0.WebAuth({
    domain: "ojisan.auth0.com", 
    clientID: "V2z2B4tlFXHOOBUlaDexq5QIZs6BZVz2",
    redirectUri: 'http://localhost:8089',
    audience: "https://marquee-breakout.appspot.com",
    responseType: "token id_token",
    scope: "read add"
  });
  signUp(){
    // this.auth.
  };
  login() {    
    this.auth.authorize();
  };
}

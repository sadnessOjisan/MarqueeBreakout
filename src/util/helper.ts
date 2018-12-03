import axios from 'axios';

export const splitCurrentURL = (delimiter: string) => {
    if(location.href.split(delimiter).length < 2){
        return {}
    }
    console.log(location.href.split(delimiter))
    let url = location.href.split(delimiter)[1];
    console.log("url:", url);
    let params = {};
    url = url.split("&");
    console.log("url2: ", url);
    for (var i = 0; i < url.length; i++) {
      var split_cache = url[i].split("=");
      params[split_cache[0]] = split_cache[1];
    }
    console.log("params: ", params);
    return params;
  };
  
  export const setHeader = (token:string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
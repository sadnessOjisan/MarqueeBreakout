import axios from 'axios';

export const splitCurrentURL = (delimiter: string) => {
    if(location.href.split(delimiter).length < 2){
        return {}
    }
    console.log(location.href.split(delimiter))
    let url = location.href.split(delimiter)[1];
    let params:any = {};
    let urlArray = url.split("&");
    for (var i = 0; i < urlArray.length; i++) {
      var split_cache = urlArray[i].split("=");
      params[split_cache[0]] = split_cache[1];
    }
    console.log("params: ", params);
    return params;
  };
  
  export const setHeader = (token:string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
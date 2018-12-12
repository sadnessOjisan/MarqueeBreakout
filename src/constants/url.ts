let HOST_URL;
let ROOT:string;

const env = process.env.REACT_APP_ENV;

if (env === "production") {
  HOST_URL = "https://marquee-breakout-server-lthcjbuowi.now.sh";
  ROOT = "https://inspiring-galileo-db9414.netlify.com";
} else if (env === "local") {
  HOST_URL = "http://localhost:3000";
  ROOT = "http://localhost:8089";
}

console.log('[url.ts] env: ', env)
console.log('[url.ts] HOST_URL: ', HOST_URL)

export default HOST_URL as string;
export {ROOT};

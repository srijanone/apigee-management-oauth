const Apigee = require("../../dist/index");
const apigee = new Apigee("username", "password");
// const apigee = new Apigee(
//   "username",
//   "password",
//   "https://login.apigee.com/oauth"
//   "oauthusername",
//   "oauthusername"
// );

apigee
  .getAccessToken()
  .then((data) => {
    console.log(data);
    const refreshToken = data.refreshToken;
    apigee
      .refreshAccessToken(refreshToken)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  })
  .catch((error) => console.log(error));

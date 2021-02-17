const Apigee = require("../../dist/index");
const apigee = new Apigee("username", "password");
// const apigee = new Apigee(
//   "username",
//   "password",
//   "https://login.apigee.com/oauth"
//   "oauthusername",
//   "oauthusername"
// );

//  module functionality can be used in Bellow ways:

//  Promise way
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
  

//  Async/Await way
(async () => {
  try {
  //  get access token example
  const accessTokenEntity = await apigee.getAccessToken();
  console.log({ accessTokenEntity });
  
  // to refresh access token example 
    if (accessTokenEntity && accessTokenEntity.refreshToken) {
      const refreshTokenEntity = await apigee.refreshAccessToken(accessTokenEntity.refreshToken)
      console.log({ refreshTokenEntity });
    }
  } catch (err) {
    console.log(err.stack);
  }

})()



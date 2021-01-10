const Apigee = require("../../dist/index");
const apigee = new Apigee("username", "password");

apigee
  .getAccessToken()
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

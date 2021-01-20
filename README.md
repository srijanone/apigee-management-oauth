# apigee-management-oauth

> Apigee Management API Oauth module

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install @srijanone/apigee-management-oauth
```

## Usage

```js
const Apigee = require("@srijanone/apigee-management-oauth");
const apigee = new Apigee("username", "password");

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

```

## See Also

- https://docs.apigee.com/api-platform/system-administration/management-api-overview
- https://docs.apigee.com/api-platform/system-administration/using-oauth2
- https://docs.apigee.com/api-platform/system-administration/management-api-tokens

## License

MIT

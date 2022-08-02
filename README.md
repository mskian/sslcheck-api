# SSLCheck API

![API Test](https://github.com/mskian/sslcheck-api/workflows/API%20Test/badge.svg)  

Simple API to Get the SSL Expiry date, time and Days.

> SSL Expiry date Checker API - Built using Node.js and Express.js  

## Requirements

- Node.js Stable version
- Yarn - For install and update the package
- Web Server with Node.js Support

## usage

- clone to repo

```sh
git clone https://github.com/mskian/sslcheck-api.git
cd sslcheck-api
```

- install packages

```sh
yarn install
```

- Run the API

```sh
yarn start
```

- Test the API on Browser

```sh
http://localhost:3001/google.com
```

```json
[
    {
        "domain": "google.com",
        "issued": "Monday, July 11, 2022 1:50 PM",
        "expires": "Monday, October 3, 2022 1:50 PM",
        "daysleft": 62,
        "provider": "Google Trust Services LLC"
    }
]
```

## Deploy

you can deploy this script on `Vercel.com` for free  

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fmskian%2Fsslcheck-api)  

## Module

Node SSL Checker - <https://github.com/mskian/ssl-checker-node-api>

## LICENSE

MIT

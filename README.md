# SSLCheck API

![API Test](https://github.com/mskian/sslcheck-api/workflows/API%20Test/badge.svg)  

Simple API to Get the SSL Expiry date, time and Days.

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
        "issued": "Tuesday, November 10, 2020 8:04 PM",
        "expires": "Tuesday, February 2, 2021 8:04 PM",
        "daysleft": 28
    }
]
```

## Deploy

you can deploy this script on `Vercel.com` for free  

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fmskian%2Fsslcheck-api)  

## LICENSE

MIT

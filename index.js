const express = require("express");
const moment = require("moment");
const sslChecker = require("ssl-checker-node-api");
const apicache = require("apicache");
const { rateLimit } = require("express-rate-limit");

const app = express();
const port = process.env.PORT || 3000;
const cache = apicache.middleware;

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 40,
  handler: function (req, res) {
    return res.status(429).json([
      {
        domain: "Not Found",
        issued: "Not Found",
        expires: "Not Found",
        daysleft: "Not Found",
        provider: "Not Found",
      },
    ]);
  },
});

app.get("/:domain", cache("1 hour"), apiRequestLimiter, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("X-Frame-Options", "DENY");
  res.header("X-XSS-Protection", "1; mode=block");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("Strict-Transport-Security", "max-age=63072000");
  res.setHeader("Content-Type", "application/json");
  app.disable("x-powered-by");

  const get_domain = req.params.domain;
  sslChecker(get_domain)
    .then((certdata) => {
      var startdate = new Date(certdata.validFrom);
      var enddate = new Date(certdata.validTo);
      var certstart = moment(startdate);
      var certend = moment(enddate);
      var certissuer = certdata.issuer
      var ssldata = [
        {
          domain: get_domain,
          issued: certstart.format("LLLL"),
          expires: certend.format("LLLL"),
          daysleft: certdata.daysRemaining,
          provider: certissuer,
        },
      ];
      res.send(JSON.stringify(ssldata, null, 4));
      console.log(JSON.stringify(ssldata, null, 4));
    })
    .catch((err) => {
      if (err.code === "ENOTFOUND") {
        console.log("Fix Hostname or Provide Correct Domain Name");
        res.json([
          {
            domain: "Not Found",
            issued: "Not Found",
            expires: "Not Found",
            daysleft: "Not Found",
            provider: "Not Found",
          },
        ]);
      } else if (err.code === "ECONNREFUSED") {
        console.log("Fix Hostname or Provide Correct Domain Name");
        res.json([
          {
            domain: "Not Found",
            issued: "Not Found",
            expires: "Not Found",
            daysleft: "Not Found",
            provider: "Not Found",
          },
        ]);
      }
    });
});

app.use("/", function (req, res) {
  res.status(404).json({
    error: 1,
    message: "Page or Data not Found",
  });
});

app.use((err, req, res, next) => {
  if (!err) return next();
  return res.status(403).json({
    error: 1,
    message: "Page or Data not Found",
  });
});

app.listen(port, function () {
  console.log("listening on port " + port);
});

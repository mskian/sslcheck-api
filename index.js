const express = require('express');
const moment = require('moment');
const sslChecker = require('ssl-checker');

const app = express();
const port = 3001;

app.get('/:domain', function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('X-Frame-Options', 'DENY');
    res.header('X-XSS-Protection', '1; mode=block');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Strict-Transport-Security', 'max-age=63072000');
    res.setHeader('Content-Type', 'application/json');
    app.disable('x-powered-by');

    const get_domain = req.params.domain;
    sslChecker(get_domain).then((certdata) => {

        var startdate = new Date(certdata.validFrom);
        var enddate = new Date(certdata.validTo);
        var certstart = moment(startdate);
        var certend = moment(enddate);
        var ssldata = ([{
            domain: get_domain,
            issued: certstart.format('LLLL'),
            expires: certend.format('LLLL'),
            daysleft: certdata.daysRemaining
        }]);
        res.send(JSON.stringify(ssldata, null, 4));
        console.log(JSON.stringify(ssldata, null, 4));

    }).catch((err) => {
        if (err.code === 'ENOTFOUND') {
            console.log('Fix Hostname or Provide Correct Domain Name');
            res.send(JSON.stringify('false'));
        } else if (err.code === 'ECONNREFUSED') {
            console.log('Fix Hostname or Provide Correct Domain Name');
            res.send(JSON.stringify('false'));
        }
    });

});

app.use('/', function(req, res) {
    res.status(404).json({
        error: 1,
        message: 'Enter a valid Domain URL'
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
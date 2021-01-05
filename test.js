const moment = require('moment');
const sslChecker = require('ssl-checker');

const get_domain = 'santhoshveer.com';
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
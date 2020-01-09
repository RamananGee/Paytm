const checksum_lib = require('./Paytm/checksum/checksum.js');

module.exports = (app) => {
    app.get('/payment', (req, res) => {
        let params = {};
        params['MID'] = 'RvzZpV59150866074941';
        params['WEBSITE'] = 'WEBSTAGING';
        params['CHANNEL_ID'] = 'WEB';
        params['INDUSTRY_TYPE_ID'] = 'Retail';
        params['ORDER_ID'] = 'ORD0002';
        params['CUST_ID'] = 'CUST0011';
        params['TXN_AMOUNT'] = '100';
        params['CALLBACK_URL'] = 'https://securegw-stage.paytm.in/order/process';
        params['EMAIL'] = 'xyz@gmail.com';
        params['MOBILE_NO'] = '6380396600';

        checksum_lib.genchecksum(params, '2tC@X9#z6Md8n@Ue', function (err, checksum) {
            let txn_url = "https://securegw-stage.paytm.in/order/process";
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html>');
            res.write('<head>');
            res.write('<title>Merchant Checkout page</title>');
            res.write('</head>');
            res.write('<body>');
            res.write('<center><h1>Please do not refresh this page...</h1></center>');
            res.write('<form method="post" action="' + txn_url + '" name="paytm_form">');
            for (x in params) {
                res.write('<input type="hidden" name="' + x + '"value="' + params[x] + '">');
            }
            res.write('<input type="hidden" name="CHECKSUMHASH" value="' + checksum + '">');
            res.write('</form>');
            res.write('<script type="text/javascript">');
            res.write('document.paytm_form.submit();');
            res.write('</script>');
            res.write('</body>');
            res.write('</html>');
            res.end();

        })

    });
}


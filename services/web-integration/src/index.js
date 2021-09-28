import express from 'express';
import middleware from './middleware';
import productRoute from './productRoute';
import customerRoute from './customerRoute';
import salesOrderRoute from './salesOrderRoute';
const bodyParser = require('body-parser');
import config from './config.json';
import { client } from './client';
import xeroRoute from './xeroRoute';
import crypto from 'crypto';
import producer from './producer';
require('./consumer');

const xero_webhook_key = 'pu4camaJpcyjLs/X2AsNPswFoEgE2Ibu7ho5urN3rX1l3OUt30yExS5M/Lcy+RY3tXWwHgVw0tl156QipkgdTw==';

const app = express();

// api router
const port = process.env.PORT || 4001;
// app.use(bodyParser.json({ limit: '50mb' }));
app.use('/api/v1/', productRoute({ config, client, app }));
app.use('/api/v1/', customerRoute({ config, client, app }));
app.use('/api/v1/', salesOrderRoute({ config, client, app }));

var options = {
  type: 'application/json',
};

// Using the options above, create a bodyParser middleware that returns raw responses.
var itrBodyParser = bodyParser.raw(options);

// Create a route that receives our webhook & pass it our itrBodyParser
app.post('/api/v1/xero', itrBodyParser, function(req, res) {
  console.log('Body: ' + req.body);
  console.log('Body: ' + req.body.toString());
  console.log('Xero Signature: ' + req.headers['x-xero-signature']);
  const jsonBody = JSON.parse(req.body);
  console.log('jsonBody', jsonBody);

  // Create our HMAC hash of the body, using our webhooks key
  let hmac = crypto
    .createHmac('sha256', xero_webhook_key)
    .update(req.body.toString())
    .digest('base64');
  console.log('Resp Signature: ' + hmac);

  if (req.headers['x-xero-signature'] == hmac) {
    if (jsonBody.events.length != 0) {
      if (jsonBody.events[0].resourceId && jsonBody.events[0].eventType === 'UPDATE') {
        producer({ message: { id: jsonBody.events[0].resourceId }, topic: 'XeroWebhook' });
      }
    }
    res.statusCode = 200;
  } else {
    res.statusCode = 401;
  }

  console.log('Response Code: ' + res.statusCode);

  res.send();
});

app.listen(port, function() {
  console.log(`versoin: ${process.env.VERSOIN} is running...`);
  console.log(`Example app listening on port ${port}!`);
});

export default app;

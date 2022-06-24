const { Subscribe } = require('./modules/subscribe-module.js');

const { ConfirmSubscription } = require('./modules/confirm-subscription-module.js');

const { GetInstanceMetadata } = require('./modules/get-instance-metadata-module.js');

const express = require('express');

const util = require('util');

const app = express();

app.use(express.text());

const port = 3000;

const arn = process.argv[2];

app.get('/', (req, res) => {
  try {
    (async function () {
      console.log('Creating subscription');
      const response = await Subscribe('http://' + await GetInstanceMetadata() + ':3000', arn, process.argv[3]);
      console.log('Subscription created');
      res.send(response);
    })();
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
});

app.post('/', (req, res) => {
  var body = JSON.parse(req.body);
  console.log('Entró al POST');

  if(body.Type == 'SubscriptionConfirmation') {
    try {
      (async function () {
        console.log('Confirming subscription');
        const response = await ConfirmSubscription(body.Token, arn);
        console.log('Subscription confirmed');
        res.send('Done!!!');
      })();
    } catch (err) {
      console.log(util.inspect(err, false, null, true));
    }
  } else {
    console.log('NUEVA NOTIFICACION');
    console.log(util.inspect(body.MessageId, false, null, true));
    console.log(util.inspect(body.Message, false, null, true));
    res.send('Done!!!');
  }
})

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`)
})
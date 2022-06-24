const { sns } = require('./sns-client');

const util = require('util');

module.exports.Subscribe = async function (endpoint, arn) {
  const input = {
    TopicArn: arn,
    Protocol: 'http',
    Endpoint: endpoint
  };
  try {
    return await sns.subscribe(input); 
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};
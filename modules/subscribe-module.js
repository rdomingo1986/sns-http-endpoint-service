const { sns } = require('./sns-client');

const util = require('util');

module.exports.Subscribe = async function (endpoint, arn, withParameters) {
  const input = {
    TopicArn: arn,
    Protocol: 'http',
    Endpoint: endpoint
  };
  if(withParameters != undefined) {
    input['Attributes'] = {
      FilterPolicy: JSON.stringify({
        'http_endpoint': ['yes']
      })
    };
  }
  try {
    return await sns.subscribe(input); 
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};
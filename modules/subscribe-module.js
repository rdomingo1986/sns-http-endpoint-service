const { sns } = require('./sns-client');

const util = require('util');

module.exports.Subscribe = async function (endpoint, arn) {
  const input = {
    TopicArn: arn,
    Protocol: 'http',
    Endpoint: endpoint
  };
  if(arn == 'arn:aws:sns:us-east-1:864613434505:awsd-officialcourse-demo-amazon-sns') {
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
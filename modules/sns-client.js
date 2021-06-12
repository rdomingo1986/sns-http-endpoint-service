const { SNS } = require('@aws-sdk/client-sns');

const sns = new SNS({
  region: 'us-east-1'
});

module.exports.sns = sns;
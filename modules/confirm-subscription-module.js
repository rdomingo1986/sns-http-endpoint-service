const { sns } = require('./sns-client');

const util = require('util');

module.exports.ConfirmSubscription = async function (token, arn) {
  try {
    return await sns.confirmSubscription({
      TopicArn: arn,
      Token: token
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};
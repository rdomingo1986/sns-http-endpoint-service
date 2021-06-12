const http = require('http');

module.exports.GetInstanceMetadata = async (url) => {
  return new Promise((resolve, reject) => {
    http.get('http://169.254.169.254/latest/meta-data/public-hostname', (res) => {
        var data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
};
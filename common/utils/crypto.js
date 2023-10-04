const crypto = require('crypto');

function encrypt (data, secret) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', secret, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const encoded = Buffer.from(encrypted).toString('base64');
  return encoded;
}

function decrypt (data, secret) {
  const decoded = Buffer.from(data, 'base64').toString('utf8');
  const iv = crypto.randomBytes(16);
  const decipher = crypto.createDecipheriv('aes-256-gcm', secret, iv);
  let decrypted = decipher.update(decoded, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;

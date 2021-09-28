const { auth } = require('./Queries/xeroAuth');
const { xeroUser } = require('./Queries/user');
const { contact } = require('./Queries/contact');
const { checking } = require('./Queries/check');

const Query = {
  ...auth,
  ...xeroUser,
  ...contact,
  ...checking,
};

module.exports = { Query };

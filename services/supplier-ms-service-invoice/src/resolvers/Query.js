const { invoice } = require('./Queries/invoice');


const Query = {
  ...invoice,
}

module.exports = { Query }
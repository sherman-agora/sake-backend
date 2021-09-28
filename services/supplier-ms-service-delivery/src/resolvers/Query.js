const { deliveryNote } = require('./Queries/deliveryNote');
const { deliveryItem } = require('./Queries/deliveryItem');

const Query = {
  ...deliveryNote,
  ...deliveryItem,
};

module.exports = { Query };

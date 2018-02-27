const Sequelize = require('sequelize')
const db = require('../db')

const Order= db.define('order', {
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('Pending', 'Created', 'Processing', 'Cancelled', 'Completed'),
    allowNull: false
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
},
{ getterMethods: {
  priceTotal: function() {
    const total = 0
    this.getLineItems()
      .then(lineItems => {
        forEach(lineItem => {total += lineItem.price})
      })
    return total;
  },
  quantityTotal: function() {
    return this.getlineItems()
      .then(lineItems => {
        return lineItems.length;
      })
  }
}

})

module.exports = Order



var Customer = require('./Customer');
var OrderItem = require('./OrderItem');

var Order = function(obj) {
  this.no = obj.no;
  this.date = obj.date;
  this.note = obj.note;
  this.customer = new Customer(obj.customer);
  this.cartItemList = [new OrderItem(obj.cartItemList)];
};

Order.prototype.getNo = function() {
  return this.no;
};

Order.prototype.getDate = function() {
  return this.date;
};

Order.prototype.getNote = function() {
  return this.note;
};

Order.prototype.getCustomer = function() {
  return this.customer;
};


Order.prototype.getCartItemList = function() {
  return this.cartItemList;
};

module.exports = Order;
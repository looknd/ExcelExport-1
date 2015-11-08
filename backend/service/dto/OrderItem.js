var OrderItem = function(obj) {
  this.productName = obj.product.name;
  this.productPrice = obj.product.price;
  this.amount = obj.amount;
  this.discount = obj.discount;
};

OrderItem.prototype.getProductName = function() {
  return this.productName;
};

OrderItem.prototype.getProductPrice = function() {
  return this.productPrice;
};

OrderItem.prototype.getAmount = function() {
  return this.amount;
};

OrderItem.prototype.getDiscount = function() {
  return this.discount;
};

module.exports = OrderItem;
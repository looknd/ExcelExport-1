var Customer = function(obj) {
  this.customerName = obj.name;
  this.customerCity = obj.city;
};

Customer.prototype.getName = function() {
  return this.customerName;
};

Customer.prototype.getCity = function() {
  return this.customerCity;
};

module.exports = Customer;
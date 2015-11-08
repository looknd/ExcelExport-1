var ExcelReq = function(order) {
  this.order = order;
};

ExcelReq.prototype.getOrder = function() {
  return this.order;
};

ExcelReq.prototype.default = function() {

};

ExcelReq.prototype.validate = function() {
  if (!this.order.getNo())
    return false;

  // TODO: ....

  return true;
};

module.exports = ExcelReq;
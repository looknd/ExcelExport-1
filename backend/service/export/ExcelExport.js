var excelBuilder = require('msexcel-builder');
var Q = require('q');

module.exports = function (order) {
  var deferred = Q.defer();

  var conf = {};

  conf.stylesXmlFile = "./styles.xml";
  var workbook = excelBuilder.createWorkbook('./backend/resources', order.getNo() + "_" + _convertDate(order.getDate()) + ".xlsx");

  var sheet1 = workbook.createSheet('sheet1', 10, 50);

  sheet1.width(1, 11);
  sheet1.set(1, 1, "Company name");
  sheet1.font(1, 1, {name: 'name', bold: 'true'});
  sheet1.merge({col: 2, row: 1}, {col: 4, row: 1});
  sheet1.set(2, 1, order.getCustomer().getName());
  sheet1.set(5, 1, "Date:");
  sheet1.font(5, 1, {name: 'date', bold: 'true'});
  sheet1.set(6, 1, _convertDateTime(order.getDate()));

  sheet1.set(1, 2, "City:");
  sheet1.font(1, 2, {name: 'city', bold: 'true'});
  sheet1.merge({col: 2, row: 2}, {col: 4, row: 2});
  sheet1.set(2, 2, order.getCustomer().getCity());
  sheet1.set(5, 2, "No:");
  sheet1.font(5, 2, {name: 'no', bold: 'true'});
  sheet1.set(6, 2, order.getNo());

  sheet1.set(1, 4, "Note:");
  sheet1.font(1, 4, {name: 'note', bold: 'true'});
  sheet1.merge({col: 2, row: 4}, {col: 4, row: 4});
  sheet1.set(2, 4, order.getNote());

  sheet1.set(1, 6, "Product name");
  sheet1.align(1, 6, "center");
  sheet1.merge({col: 1, row: 6}, {col: 3, row: 6});
  sheet1.font(1, 6, {name: 'name', bold: 'true'});
  sheet1.set(4, 6, "Amount");
  sheet1.font(4, 6, {name: 'name', bold: 'true'});
  sheet1.set(5, 6, "Price");
  sheet1.font(5, 6, {name: 'name', bold: 'true'});
  sheet1.set(6, 6, "Discount");
  sheet1.font(6, 6, {name: 'name', bold: 'true'});

  var j = 7;
  order.getCartItemList().forEach(function (item) {
    sheet1.merge({col: 1, row: j}, {col: 3, row: j});
    sheet1.set(1, j, item.getProductName());
    //sheet1.align(1, j, 'center');
    sheet1.set(4, j, item.getAmount());
    sheet1.set(5, j, item.getProductPrice());
    sheet1.set(6, j, item.getDiscount());
    j++;
  });

  workbook.save(function (ok) {

    if (!ok) {
      console.log('Excel has been created successfully!');

      var fileName = order.getNo() + "_" + _convertDate(order.getNote()) + ".xlsx";
      var targetPath = './backend/resources/' + fileName;

      deferred.resolve(targetPath);
    } else {
      console.log('Excel couldn\'t be created!');
      workbook.cancel();
      deferred.reject("EXCEL_CREATE_ERROR");
    }
  });

  return deferred.promise;
};

var _convertDate = function (time) {
  var date = new Date(time);

  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1);
};

var _convertDateTime = function (time) {
  var date = new Date(time);

  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate() + 1)
    + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
};
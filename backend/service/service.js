var createExcel = require('./export/ExcelExport');
var Order = require('./dto/Order');
var Request = require('./req/ExcelReq');

exports.createExcel = function (req, res) {
  var data = req.body.data;

  if (!data) {
    res.status(400).send('DATA_EMPTY');
  } else {
    if (typeof data !== 'string')
      res.status(400).send('DATA_NOT_JSON_STRING');

    var order = new Order(JSON.parse(data));
    var request = new Request(order);

    request.default();
    if (!request.validate())
      res.status(400).send('DATA_NOT_VALIDATED');

    createExcel(request.getOrder())
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (error) {
        res.status(503).send(error);
      });
  }
};
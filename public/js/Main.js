var exportExcel = function () {

  var data = {
    "no": "A1",
    "note": "this is a note!",
    "date": 1447004198351,
    "customer": {"name": "customer1", "city": "istanbul"},
    "cartItemList": {"amount": 5, "discount": 5, "product": {"name": "ürün1", "price": "1.5$"}}
  };

  var params = {
    "data": JSON.stringify(data)
  };

  jQuery.ajax({
    url: "http://localhost:3000/export",
    type: "POST",
    data: params,
    success: function (data) {
      alert(data);
    }
  });
};
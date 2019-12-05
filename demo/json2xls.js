// 文件上传
function jsonFileUpload () {
  var el = document.getElementById('jsonUpload');
  el.addEventListener('change', handleFileFn, false);
}

jsonFileUpload();

// handleFileFn 处理上传文件

function handleFileFn (e) {
  var files = e.target.files, f = files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    // console.log(e.target);
    // console.log(strToJson(e.target.result));
    json2Excel(json2Array(strToJson(e.target.result)));
  };
  reader.readAsText(f, "UTF-8");
}

// string 2 json
function strToJson (str) {
  var json = (new Function("return " + str))();
  return json;
}

// json 转 array

function json2Array (json) {
  return Object.keys(json).map(function (key) {
    return { key, value: json[key] }
  });
}

// json 2 excel

function json2Excel (data) {
  var ws = XLSX.utils.json_to_sheet(data);
  var wb =  XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "People");
  XLSX.writeFile(wb, "sheetjs.xlsx");
}

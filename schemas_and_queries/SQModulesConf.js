var request = require('sync-request');

var auth_url = "http://localhost/_/auth/authenticate";
var auth_opt = {
 json: { email: "admin@example.com", password: "password" }
};
var tokenData = JSON.parse( request('POST', auth_url, auth_opt).getBody('utf8'));
var token = tokenData['data']['token'];

// console.log( token );
// var token = "token12345";

collections_url = "http://localhost/_/collections";
collections_opt = {
  headers: { "Authorization": "Bearer " + token}
};

var collectionsData = JSON.parse( request('GET', collections_url, collections_opt).getBody('utf8'));

var data = collectionsData['data'];

var dymods = {};

for (i = 0; i < data.length; i ++) {

  var collection_name = data[i]['collection'];

  var fields = data[i]['fields'];
  var schema = "type " + collection_name + " {";
  var query = '{' + collection_name + ' {';
  for (var field in fields)
  {
    var type = fields[field]['type'];
    if (field == "id") type = "ID";
    // else if (fields[field]['type'] == "integer") type = "Int"
    else type = "String";
    schema = schema + field + ': ' + type + ' ';
    query = query + field + ' ';
  }
  schema = schema +  "} type Query {" + collection_name + "(id: ID): [" + collection_name + "]}";
  query = query + '}}';

  var object = {
    modulename: collection_name,
    Schema: schema,
    Query: query
  };

  var moduleobj = {};
  moduleobj[collection_name] = object;

  Object.assign(dymods, moduleobj);
}

module.exports = dymods;
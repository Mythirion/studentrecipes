var mysql = require("mysql");
var md5 = require("md5");
var moment = require("moment");

var connection = mysql.createPool({
  connectionLimit: 100,
    host: '11.62.0.20',
    user: 'studentrecipes',
    password: 'password123',
    database: 'medivh',
    debug: false
});

exports.add = function(req, res) {
  var query = "insert into ??(??,??,??,??,??) values (default,?,?,?,?)";
  var table = ["users", "username", "password", "email_address", "country_id", req.body.username, md5(req.body.password), req.body.email, req.body.country];
  query = mysql.format(query, table);
  connection.query(query, function(err, rows) {
    if (err) {
      res.json({
        "Error": true,
        "Message": "Error executing SQL query.",
        "Error Code": err.code,
        "Fatal": err.fatal,
        "SQL": err.sql,
        "SQL Message": err.sqlMessage
      });
    } else {
      res.json({
        "Error": false,
        "Message": "New user added."
      });
    }
  });
};

exports.getAll = function(req, res) {
  var query = "select * from ??";
  var table = ["users"];
  query = mysql.format(query, table);
  connection.query(query, function(err, rows) {
    if (err) {
      res.json({
        "Error": true,
        "Message": "Error executing SQL query.",
        "Error Code": err.code,
        "Fatal": err.fatal,
        "SQL": err.sql,
        "SQL Message": err.sqlMessage
      });
    } else {
      res.json({
        "Error": false,
        "Message": "Success",
        "Users": rows
      });
    }
  });
};

exports.getLogin = function(req, res) {
  var query = "select * from ?? where ?? = ? and ?? = ?";
  var table = ["users", "username", req.body.username, "password", md5(req.body.password)];
  query = mysql.format(query, table);
  connection.query(query, function(err, rows) {
    if (err) {
      res.json({
        "Error": true,
        "Message": "Error executing SQL query.",
        "Error Code": err.code,
        "Fatal": err.fatal,
        "SQL": err.sql,
        "SQL Message": err.sqlMessage
      });
    } else {
      res.json({
        "Error": false,
        "Message": "Success",
        "User logged-in": rows
      });
    }
  });
};

exports.getSingle = function(req, res) {
  var query = "select * from ?? where ?? = ?";
  var table = ["users", "userID", req.params.user_id];
  query = mysql.format(query, table);
  connection.query(query, function(err, rows) {
    if (err) {
      res.json({
        "Error": true,
        "Message": "Error executing SQL query.",
        "Error Code": err.code,
        "Fatal": err.fatal,
        "SQL": err.sql,
        "SQL Message": err.sqlMessage
      });
    } else {
      res.json({
        "Error": false,
        "Message": "Success",
        "Users Matched": rows
      });
    }
  });
};

exports.getCountries = function(req, res) {
  var query = "select ?? from ??";
  var table = ["countryname", "countries"];
  query = mysql.format(query, table);
  connection.query(query, function(err, rows) {
    if (err) {
      res.json({
        "Error": true,
        "Message": "Error executing SQL query.",
        "Error Code": err.code,
        "Fatal": err.fatal,
        "SQL": err.sql,
        "SQL Message": err.sqlMessage
      });
    } else {
      res.json({
        "Error": false,
        "Message": "Success",
        "Countries": rows
      });
    }
  });
}

exports.updateUser = function(req, res) {
  var query = "update ?? u join ?? qa set u.?? = ? where u.?? = ? and qa.?? = ?";
  var table = ["users", "userqa", "password", md5(req.body.password), "userID", req.body.user_id, "secretanswer", md5(req.body.secretanswer)];
  query = mysql.format(query, table);
  connection.query(query, function(err, rows) {
    if (err) {
      res.json({
        "Error": true,
        "Message": "Error executing SQL query.",
        "Error Code": err.code,
        "Fatal": err.fatal,
        "SQL": err.sql,
        "SQL Message": err.sqlMessage
      });
    } else {
      res.json({
        "Error": false,
        "Message": "Successfully updated the password for user: " + req.body.user_id
      });
    }
  });
};

exports.delete = function(req, res) {
  var query = "delete from ?? where ?? = ?";
  var table = ["users", "userID", req.params.user_id];
  query = mysql.format(query, table);
  connection.query(query, function(err, rows) {
    if (err) {
      res.json({
        "Error": true,
        "Message": "Error executing SQL query.",
        "Error Code": err.code,
        "Fatal": err.fatal,
        "SQL": err.sql,
        "SQL Message": err.sqlMessage
      });
    } else {
      res.json({
        "Error": false,
        "Message": "Deleted the user with ID: " + req.params.user_id
      });
    }
  });
};

// Secret questions/answers stuff

exports.insertQA = function(req, res) {
  var query = "insert into ?? (??,??,??) values (??, ??, ??)";
  var table = ["userqa", "userid", "secretquestion", "secretanswer", req.body.userid, req.body.secretquestion, md5(req.body.secretanswer)];
  query = mysql.format(query, table);
  connection.query(query, function(err, rows) {
    if (err) {
      res.json({
        "Error": true,
        "Message": "Error executing SQL query.",
        "Error Code": err.code,
        "Fatal": err.fatal,
        "SQL": err.sql,
        "SQL Message": err.sqlMessage
      });
    } else {
      res.json({
        "Error": false,
        "Message": "Deleted the user with ID: " + req.params.user_id
      });
    }
  });
};

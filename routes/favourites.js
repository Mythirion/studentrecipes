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
  var query = "insert into ??(??,??,??,??) values (default,?,?,?)";
  var table = ["userfavourites", "noteID", "recipeID", "userID", "note", req.body.recipe_id, req.body.user_id, req.body.note];
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
        "Message": "Added recipe: " + req.body.recipe_id + " to user: " + req.body.user_id + "'s favourites list."
      });
    }
  });
}

exports.getAll = function (req, res) {
  var query = "select * from ??";
  var table = ["userfavourites"];
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
        "Favourites (recipe_id, user_id)": rows
      });
    }
  });
}

exports.getSingleUser = function (req, res) {
  var query = "select * from ?? where ?? = ?";
  var table = ["userfavourites", "userID", req.body.user_id];
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
        "Favourites of User": rows
      });
    }
  });
}

exports.getSingleRecipe = function (req, res) {
  var query = "select * from ?? where ?? = ?";
  var table = ["userfavourites", "recipeID", req.body.recipe_id];
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
        "Users that Favourited Recipe": rows
      });
    }
  });
}

exports.updateNote = function (req, res) {
  var query = "update ?? set ?? = ? where ?? = ? and ?? = ?";
  var table = ["userfavourites", "note", req.params.note, "recipeID", req.params.recipe_id, "userID", req.params.user_id];
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
        "Users that Favourited Recipe": rows
      });
    }
  });
}

exports.delete = function (req, res) {
  var query = "delete from ?? where ?? = ?";
  var table = ["userfavourites", "favouriteID", req.params.note_id];
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
        "Message": "Deleted the note with ID: " + req.params.note_id
      });
    }
  });
}

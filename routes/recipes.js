var mysql = require("mysql");
var md5 = require("md5");
var moment = require("moment");``

var connection = mysql.createPool({
    connectionLimit: 100,
    host: '11.62.0.20',
    user: 'studentrecipes',
    password: 'password123',
    database: 'medivh',
    debug: false
});

exports.add = function (req, res) {
  var query = "insert into ??(??,??,??,??,??,??) values (default,?,?,?,?,?)";
  var table = ["recipes", "recipeID", "recipeName", "ingredients", "method", "userID", "postedTime", req.body.recipeName, req.body.ingredients, req.body.method, req.body.userID, moment().valueOf()];
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
        "Message": "Added new recipe with name: " + req.body.recipeName
      });
    }
  });
}

exports.getAll = function (req, res) {
  var query = "select ?? as recipeID, ?? as recipeName, ?? as ingredients, ?? as method, ?? as createdBy, date_format(from_unixtime(??/ 1000), '%Y-%m-%d %H:%i:%S') as postedTime from ??";
  var table = ["recipeID", "recipeName", "ingredients", "method", "userID", "postedTime", "recipes"];
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
        "Recipes": rows
      });
    }
  });
}

exports.getSingle = function(req,res) {
  var query = "select * from ?? where ?? = ?";
  var table = ["recipes", "recipeName", req.params.recipe_name];
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
        "Specific Recipes": rows
      });
    }
  });
}

exports.updateName = function (req,res) {
  var query = "update ?? set ?? = ? where ?? = ?";
  var table = ["recipes", "recipeName", req.body.recipe_name, "recipeID", req.body.recipe_id];
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
        "Message": "Successfully updated the recipe name for recipe: " + req.body.recipe_id
      });
    }
  });
}

//Recipe update two

exports.updateIngredients = function (req, res) {
  var query = "update ?? set ?? = ? where ?? = ?";
  var table = ["recipes", "ingredients", req.body.ingredients, "recipeID", req.body.recipe_id];
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
        "Message": "Successfully updated the ingredients for recipe: " + req.body.recipe_id
      });
    }
  });
}

exports.updateMethod = function(req,res) {
  var query = "update ?? set ?? = ? where ?? = ?";
  var table = ["recipes", "method", req.body.method, "recipeID", req.body.recipe_id];
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
        "Message": "Successfully updated the ingredients for recipe: " + req.body.recipe_id
      });
    }
  });
}

exports.delete = function(req, res) {
  var query = "delete from ?? where ?? = ?";
  var table = ["recipes", "recipeID", req.params.recipe_id];
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
        "Message": "Deleted the recipe with ID: " + req.params.recipe_id
      });
    }
  });
}

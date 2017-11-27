var express = require("express");
var mysql = require("mysql");
var md5 = require("md5");
var app = express();
var bodyparser = require("body-parser");
var users = require("./routes/users");
var favourites = require("./routes/favourites");
var recipes = require("./routes/recipes");


app.use(bodyparser.urlencoded({
  extended: true
}));

// User routing
app.post('/api/users', users.add);
app.get('/api/users', users.getAll);
app.get('/api/users', users.getLogin);
app.get('/api/users/:user_id', users.getSingle);
app.get('/api/countries', users.getCountries);
app.put('/api/users', users.updateUser);
app.delete('/api/users/:user_id', users.delete);
app.post('/api/secrets', users.insertQA);

// Recipe routing
app.post('/api/recipes', recipes.add);
app.get('/api/recipes', recipes.getAll);
app.get('/api/recipes/:recipe_id', recipes.getSingle);
app.put('/api/recipes', recipes.updateName);
app.put('/api/recipes', recipes.updateIngredients);
app.put('/api/recipes', recipes.updateMethod);
app.delete('/api/recipes/:recipe_id', recipes.delete);

//User favourites routing
app.post('/api/userfavourites', favourites.add);
app.get('/api/userfavourites', favourites.getAll);
app.get('/api/userfavourites/:user_id', favourites.getSingleUser);
app.get('/api/userfavourites/:recipe_id', favourites.getSingleRecipe);
app.put('/api/userfavourites/:note_id', favourites.updateNote);
app.delete('/api/userfavourites/:note_id', favourites.delete);

app.listen(3000, function() {
  console.log('Server started on port 3000');
});
const controller = require('./../database/controllers/controller.js');
const bodyParser = require('body-parser'); 
const express = require('express'); 
const path = require('path'); 
const app = express(); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname, './../client'))); 

app.get('/inventory', controller.displayAll); 
app.get('/inventory/:id', controller.getSingleItem);
app.post('/inventory', controller.createItem); 
app.put('/inventory/:id', controller.updateItem); 
app.delete('/inventory/:id', controller.removeItem); 
// app.get('/readIventory', controller.readInventory); //This request loaded inventory into database. 
// app.get('/readProducts', controller.readProducts); //This request loaded products into database. 

app.listen(3000, () => { 
  console.log('Listening on port 3000'); 
}); 

module.exports = app;
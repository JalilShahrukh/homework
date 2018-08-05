const controller = require('./../database/controllers/controller.js');
const express = require('express'); 
const path = require('path'); 
const app = express(); 

app.use(express.static(path.join(__dirname, './../client')));  
// app.get('/readIventory', controller.readInventory); //This request loaded inventory into database. 
// app.get('/readProducts', controller.readProducts); //This request loaded products into database. 

app.listen(3000, () => { 
  console.log('Listening on port 3000'); 
}); 
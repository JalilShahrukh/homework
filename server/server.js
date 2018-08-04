const controller = require('./../database/controllers/controller.js');
const express = require('express'); 
const path = require('path'); 
const app = express(); 

app.use(express.static(path.join(__dirname, './../client')));  
app.get('/read', controller.readInventory);

app.listen(3000, () => { 
  console.log('Listening on port 3000'); 
}); 
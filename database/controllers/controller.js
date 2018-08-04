const db = require('./../models/database.js'); 
const $ = jQuery = require('jquery'); 
const parse = require('csv-parse'); 
const fs = require('file-system'); 
const path = require('path'); 
$.csv = require('jquery-csv'); 

const controller = {};

controller.display = () => { 
  
}

const inventory = path.join(__dirname, './../../inventory_data/inventory.csv'); 
controller.readInventory = (req, res) => {
  fs.readFile(inventory, 'UTF-8', function(err, fileData) {
    $.csv.toObjects(fileData, {}, function(err, data) { 
      console.log(data); 
    //   let keys = Object.keys(data[0]); 
    //   for (let i = 0; i < keys.length; i++) { 
    //     console.log(keys[i].trim()); 
    //   }//end for

      db.tx(t => { 
        console.log('Inside of transaction.'); 
        var queries = data.map(i => {  
          console.log(i.product_id); 
          return t.none(`INSERT INTO iventory(product_id, waist, length, style, count) VALUES(${i.product_id.trim()}, ${i.waist.trim()}, ${i.length.trim()}, ${i.style.trim()}, ${i.count.trim()})`, i);
        }); 
        return t.batch(queries);
      }).then((data) => {
        // success
        res.send(data); 
      }).catch(error => {
        // error;
        console.log(error); 
      });//end transaction

    });//end toObjects
  });//end readFile 
}

const products = path.join(__dirname, './../../inventory_data/products.csv'); 
controller.readProducts = () => {

}

controller.getInventory = (req, res) => { 
  console.log('Inside of get Inventory'); 
}

module.exports = controller; 
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
      //console.log(data); 

      db.tx(t => { 
        console.log('Inside of iventory transaction.'); 
        var queries = data.map(i => {  
          var style = `'` + (`${i[" style"].trim()}`) + `'`;
          //The keys stored in the objects have additional spaces in front of them.
          return t.none(`INSERT INTO inventory(product_id, waist, length, style, count) VALUES(${i.product_id}, ${i[" waist"].trim()}, ${i[" length"].trim()}, ${style}, ${i[" count"].trim()})`, i);
        }); 
        return t.batch(queries);
      }).then(() => {
        console.log('Success!');  
      }).catch(error => {
        console.log(error); 
      });

    });
  });
}

const products = path.join(__dirname, './../../inventory_data/products.csv'); 
controller.readProducts = (req, res) => {
  fs.readFile(products, 'UTF-8', function(err, fileData) {
    $.csv.toObjects(fileData, {}, function(err, data) { 
      console.log(data); 

      db.tx(t => { 
        console.log('Inside of product transaction.'); 
        var queries = data.map(i => {  
          var name = `'` + (`${i.product_name.trim()}`) + `'`;
          var image = `'` + (`${i.product_image.trim()}`) + `'`;
          var product = `'` + (`${i.product_description.trim()}`) + `'`;
        
          return t.none(`INSERT INTO products(product_id, product_name, product_image, product_description) VALUES(${i.product_id}, ${name}, ${image}, ${product})`, i);
        }); 
        return t.batch(queries);
      }).then(() => {
        console.log('Success!'); 
      }).catch(error => {
        console.log(error); 
      });

    });
  });
}

controller.getInventory = (req, res) => { 
  console.log('Inside of get Inventory'); 
}

module.exports = controller; 
const db = require('./../models/database.js'); 
const $ = jQuery = require('jquery'); 
const fs = require('file-system'); 
const path = require('path'); 
$.csv = require('jquery-csv'); 

const controller = {};

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

controller.displayAll = (req, res) => { 
  db.tx(t => {
      return t.any('SELECT primary_key, product_id, waist, length, style, count FROM inventory')
    .then((data) => { 
      res.json(data); 
    }).catch((error) => {
      res.send(error);
    });
  });
}

controller.getSingleItem = (req, res) => { 
  var inventoryID = req.params.id;
  db.one('SELECT * FROM inventory where primary_key = $1', inventoryID)
    .then((data) => {
      res.json(data)
    }).catch((error) => {
      res.send(error);
    });
}

controller.createItem = (req, res) => { 
  db.none(`INSERT INTO inventory(product_id, waist, length, style, count) VALUES(${req.body.product_id}, ${req.body.waist}, ${req.body.length}, ${req.body.style}, ${req.body.count})`)
    .then(() => {
      res.json({
        status: 'Success!',
        message: 'Inserted one item.'
      });
    }).catch(function (error) {
      res.send(error);
    });
}

controller.updateItem = (req, res) => {
  var product_id = req.body.product_id, waist = req.body.waist, length = req.body.length, style = req.body.style, count = req.body.count, inventoryID = parseInt(req.params.id);
  db.none(`UPDATE inventory SET product_id=${product_id}, waist=${waist}, length=${length}, style=${style}, count=${count} WHERE primary_key=${inventoryID}`)
      .then(() => {
        res.json({
          status: 'Success!',
          message: 'Updated item.'
        });
      }).catch((error) => {
        res.send(error);
      });
}

controller.removeItem = (req, res) => { 
  var inventoryID = parseInt(req.params.id);
  db.result(`DELETE FROM inventory WHERE primary_key=${inventoryID}`)
    .then((result) => {
      res.json({
        status: 'Success!',
        message: `Removed ${result.rowCount} item.`
      });
    }).catch((error) => {
      res.send(error); 
    });
}

module.exports = controller; 
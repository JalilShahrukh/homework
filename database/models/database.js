const options = { 
  error(error, e) { 
    if (e.cn) { 
      //A connection-related error.
      console.log('CN: ', e.cn); 
      console.log('EVENT: ', error.message); 
    }
  }
}; 

const pgp = require('pg-promise')(options);
const db = pgp('postgres://nbgzymgh:QS5x_sziPSS4XC2owJ4P0qTXeE3Qc654@stampy.db.elephantsql.com:5432/nbgzymgh'); 

db.connect()
  .then((obj) => { 
    console.log('Connected to the database.');
    obj.done(); //
  }).catch((error) => { 
    console.log('Error: ', error.message); 
  }); 

module.exports = db; 
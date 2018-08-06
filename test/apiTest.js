const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('./../server/server.js');

chai.use(chaiHttp);

describe('/GET items', () => { 
  it('API should display all items.', (done) => { 
    chai.request(server)
      .get('/inventory')
      .end((err, res) => { 
        res.should.have.status(200); 
        res.body.should.be.a('array');
        done();  
      })
  }); 
}); 

describe('/GET single item', () => { 
  it('API should get a single item.', (done) => { 
    chai.request(server)
      .get('/inventory/:id')
      .end((err, res) => { 
        res.should.have.status(200); 
        res.body.should.be.a('object');  
        done(); 
      })
  }); 
}); 
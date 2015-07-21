var superagent = require('superagent');
var expect = require('expect.js');

describe('express rest api node api test', function(){
    it('retrieves an object', function(done){
        superagent.get('http://localhost:3000/api/prices')
            .end(function(e, res){
                //console.log(res.body)
                //expect(e).to.eql(null)
                //expect(typeof res.body).to.eql('object')
                //expect(res.body._id.length).to.eql(24)
                //expect(res.body._id).to.eql(id)
                done()
            })
    });   //var id
});
const express = require('express');
const {assert} = require('chai')
const app = require('../server.js')
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Express server', () => {
  let request;

  beforeEach(() => {
    request = chai.request(app);
  });
  it('It runs', (done) => {
    request.get('/').end((err, res) => {

      expect(res).to.have.status(200);

      done();
    });
  })

  it('/post serves yelp data', (done) => {
    //SEV

    //  let yelp = nock('localhost:8080').post('/post', mockplace)
    let mockPlace = [
      {
        name: 'Le Thai',
        coords: {
          lat: 36.168743,
          lng: -115.139866
        }
      }
    ];

    let expected = {
      name: 'Le Thai',
      img: 'https://s3-media1.fl.yelpcdn.com/bphoto/vYnAqILo37UXrNvz_5QX0Q/o.jpg',
      hours: false,
      revcount: 1425,
      rating: 4,
      price: '$$',
      location: '523 Fremont St,Las Vegas, NV 89101',
      phone: '(702) 778-0888',
      url: 'https://www.yelp.com/biz/le-thai-las-vegas?adjust_creative=euqH0_vzVDHpkWNkOrRvRg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=euqH0_vzVDHpkWNkOrRvRg'
    }

    request.post('/post').set('content-type', 'application/json').send(mockPlace).end((err, res) => {

      assert.deepEqual(res.body[0], expected);
      done();
    })

  })
});

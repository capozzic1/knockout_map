const {assert} = require('chai')

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const nock = require('nock'); //mock

chai.use(chaiHttp);

describe('Express server', () => {
  let request;
  let api;
  let mockPlace;
  let expected;
  beforeEach(() => {
    mockPlace = {
      name: 'Le Thai',
      coords: {
        lat: 36.168743,
        lng: -115.139866
      }
    }

    expected = {
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
    api = nock('http://localhost:8080').post('/post', mockPlace).reply(201, expected);
    api = nock('http://localhost:8080').get('/').reply(200);
    request = chai.request('localhost:8080');

  });
  it('It runs', (done) => {
    request.get('/').end((err, res) => {

      expect(res).to.have.status(200);

      done();
    });
  })

  it('/post serves yelp data', (done) => {

    request.post('/post').set('content-type', 'application/json').send(mockPlace).end((err, res) => {

      assert.deepEqual(res.body, expected);
      done();
    })

  })
});

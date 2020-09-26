const request = require('supertest');

const testHelper = require('../../../testCommon');
const seller = require('../../seller/sellerAPI');
const customer = require('../../customer/customerAPI');
const item = require('../itemAPI');

const app = testHelper.server([item, customer, seller]);
const db = testHelper.seeder;

describe('Test itemAPI enpoints', function() {

    let itemId;

    beforeAll(() => {
        db.freshSeed();
    });

    describe('GET /filteredItems', function() {

        it('get search the name and get the items', function(done) {
            request(app)
                .get('/filteredItems')
                .query({ search: 'bluray'})
                .send()
                .expect(200)
                .end((err, res) => {
                    if(err) done();
                    expect(res.body.length).toBeGreaterThan(0);
                    itemId = res.body[0].id;
                    done();
                });
        });
    });

    describe('GET /item', function() {

        it('get a particular item', function(done) {
            request(app)
                .get('/item')
                .send({
                    itemId
                })
                .expect(200)
                .end((err, res) => {
                    if(err) done();
                    expect(res.body.name).toBeTruthy();
                    done();
                });
        });
    });

    describe('test seller auth flows', function() {

        let agent,
            csrfToken;

        beforeAll(async () => {
            agent = request.agent(app);
            const response = await agent
                .post('/sellerLogin')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    email: 'shopping@disney.com',
                    password: 'qwerty'
                })
                .expect(200);

            csrfToken = testHelper.parseCookies(response.headers)['XSRF-TOKEN'].value;
        });

        describe('get /myitems', function() {

            it('should get the items of the seller', function(done) {
                agent
                    .get('/myitems')
                    .set('xsrf-token', csrfToken)
                    .send()
                    .expect(200)
                    .end((err, res)=> {
                        if(err) done(err);
                        expect(res.body.length).toBeGreaterThan(0);
                        done();
                    });
            });

        });

        describe('PUT /item', function() {

            it('should create new item', function(done) {
                agent
                    .put('/item')
                    .set('xsrf-token', csrfToken)
                    .send({
                        name: 'Matrix Reloaded',
                        description: '4K Bluray',
                        price: 42,
                        avgRating: 3.5,
                        numRatings: 2,
                        currency: 'USD',
                        category: 'Entertainment'
                        
                    })
                    .expect(200)
                    .end((err, res) => {
                        if(err) done(err);
                        expect(res.body.name).toEqual('Matrix Reloaded');
                        done();
                    });
            });

        });

        describe('PATCH /item', function() {

            it('should update the item', function(done) {
                agent
                    .patch('/item')
                    .set('xsrf-token', csrfToken)
                    .send({
                        name: 'testName',
                        itemId
                    })
                    .expect(200)
                    .end((err, res) => {
                        if(err) done(err);
                        expect(res.body.name).toEqual('testName');
                        done();
                    });
            });

        });

        describe('DELETE /item', function() {

            it('Should not be able to retrieve the item post deletion', function(done) {
                agent
                    .delete('/item')
                    .set('xsrf-token', csrfToken)
                    .send({
                        itemId
                    })
                    .expect(200)
                    .end(() => {
                        agent
                            .get('/item')
                            .set('xsrf-token', csrfToken)
                            .send({
                                itemId
                            })
                            .expect(404)
                            .end((err, res) => {
                                if(err) done(err);
                                done();
                            });
                    });
            });

        });

    });

});
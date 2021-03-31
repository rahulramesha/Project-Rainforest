const request = require('supertest');

const testHelper = require('../../../testCommon');
const seller = require('../../seller/sellerAPI');
const customer = require('../../customer/customerAPI');
const order = require('../orderAPI');

const app = testHelper.server([order, customer, seller]);
const db = testHelper.seeder;
const ids = testHelper.ids;

describe('test orderAPI endpoints', function() {

    beforeAll(()=> {
        db.freshSeed();
    });

    describe('test the Customer auth flows', function() {

        let agent,
            csrfToken;

        beforeAll(async ()=> {
            agent = request.agent(app);
            const response = await agent
                .post('/localLogin')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    email: 'John@example.com',
                    password: 'qwerty'
                })
                .expect(200);

            csrfToken = testHelper.parseCookies(response.headers)['XSRF-TOKEN'].value;
        });

        describe('GET /myOrders', function() {

            it('should return all my orders', function(done) {
                agent
                    .get('/myOrders')
                    .set('xsrf-token', csrfToken)
                    .send()
                    .expect(200)
                    .end((err, res)=>{
                        if(err) done(err);
                        expect(res.body.length).toBeGreaterThan(0);
                        done();
                    })
            });
        });

        describe('PUT /order', function() {

            it('should create an order', function(done) {
                agent  
                    .put('/order')
                    .set('xsrf-token', csrfToken)
                    .send({
                        contactId: ids.customerContact11,
                        orders: [
                            {
                                contactId: ids.customerContact11,
                                itemId: ids.item11,
                                sellerId: ids.seller1,
                                price: '499',
                                currency: 'INR',
                                paymentMethod: 'POD',
                                status: 'Delivered'
                            }
                        ]
                    })
                    .expect(200)
                    .end((err, res) => {
                        if(err) done(err);
                        expect(res.body[0].itemId).toBe(ids.item11);
                        done();
                    });
            });
        });

        describe('GET /order', function() {

            it('should get a particular order', function(done) {
                agent  
                    .get('/order')
                    .set('xsrf-token', csrfToken)
                    .send({
                        orderId: ids.order1
                    })
                    .expect(200)
                    .end((err, res)=>{
                        if(err) done();
                        expect(res.body.itemId).toBeTruthy();
                        done();
                    });
            });
        });

        describe('PATCH /order', function() {

            it('should update the order', function(done) {
                agent  
                    .patch('/order')
                    .set('xsrf-token', csrfToken)
                    .send({
                        orderId: ids.order1,
                        status: 'Delivered'
                    })
                    .expect(200)
                    .end((err, res)=>{
                        if(err) done();
                        expect(res.body.status).toBe('Delivered');
                        done();
                    });
            });
        });

        describe('DELETE /order', function() {

            it('should not be able delete', function(done) {
                agent  
                    .delete('/order')
                    .set('xsrf-token', csrfToken)
                    .send({
                        orderId: ids.order1
                    })
                    .expect(401)
                    .end((err, res)=>{
                        if(err) done(err);
                        done();
                    });
            });
        });
    });
});
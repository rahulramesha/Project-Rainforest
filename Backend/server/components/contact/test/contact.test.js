const request = require('supertest');

const testHelper = require('../../../testCommon');
const contact = require('../contactAPI');
const customer = require('../../customer/customerAPI');

const app = testHelper.server([contact, customer]);
const db = testHelper.seeder;

describe('Test contactAPI enpoints', function() {

    let agent,
        csrfToken,
        contactId;

    beforeAll(async () => {
        db.freshSeed();
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

    describe('GET /contactsList', function() {

        it('should get contact list of the customer', function(done) {
            agent
                .get('/contactsList')
                .set('xsrf-token', csrfToken)
                .send()
                .expect(200)
                .end((err, res)=> {
                    if(err) done(err);
                    expect(res.body.length).toBeGreaterThan(0);
                    done();
                })
        });
    });

    describe('PUT /contact', function() {

        it('should create new contact for the customer', function(done) {
            agent
                .put('/contact')
                .set('xsrf-token', csrfToken)
                .send({
                    name: 'Work',
                    address1: 'Adrress of Jake',
                    city: 'Washington DC',
                    pincode: 404,
                    country: 'U.S.A',
                    phoneNumber: 2345678921,
                    countryCode: '+ 1'
                })
                .expect(200)
                .end((err, res) => {
                    if(err) done(err);
                    expect(res.body.name).toEqual('Work');
                    contactId = res.body.id;
                    done();
                });
        });
    });

    describe('GET /contact', function() {

        it('', function(done){
            agent
                .get('/contact')
                .set('xsrf-token', csrfToken)
                .send({
                    contactId
                })
                .expect(200)
                .end((err, res) => {
                    if(err) done(err);
                    expect(res.body.name).toBeTruthy();
                    done();
                });
        });
    });

    describe('PATCH /contact', function() {

        it('', function(done){
            agent
                .patch('/contact')
                .set('xsrf-token', csrfToken)
                .send({
                    name: 'testName',
                    contactId
                })
                .expect(200)
                .end((err, res) => {
                    if(err) done(err);
                    expect(res.body.name).toEqual('testName');
                    done();
                });
        });
    });

    describe('DELETE /contact', function() {

        it('', function(done){
            agent
                .delete('/contact')
                .set('xsrf-token', csrfToken)
                .send({
                    contactId
                })
                .expect(200)
                .end(() => {
                    agent
                        .get('/contact')
                        .set('xsrf-token', csrfToken)
                        .send({
                            contactId
                        })
                        .expect(404)
                        .end((err, res) => {
                            if(err) done(err);
                            done();
                        })
                });
        });
    });

});

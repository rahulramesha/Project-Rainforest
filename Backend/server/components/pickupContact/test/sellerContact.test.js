const request = require('supertest');

const testHelper = require('../../../testCommon');
const contact = require('../sellerContactAPI');
const seller = require('../../seller/sellerAPI');

const app = testHelper.server([contact, seller]);
const db = testHelper.seeder;

describe('Test sellerContactAPI enpoints', function() {

    let agent,
        csrfToken,
        sellerContactId;

    beforeAll(async () => {
        db.freshSeed();
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

    describe('GET /sellerContactsList', function() {

        it('should get contact list of the seller', function(done) {
            agent
                .get('/sellerContactsList')
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

    describe('PUT /sellerContact', function() {

        it('should create new contact for the seller', function(done) {
            agent
                .put('/sellerContact')
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
                    sellerContactId = res.body.id;
                    done();
                });
        });
    });

    describe('GET /sellerContact', function() {

        it('should get a particular contact', function(done){
            agent
                .get('/sellerContact')
                .set('xsrf-token', csrfToken)
                .send({
                    sellerContactId
                })
                .expect(200)
                .end((err, res) => {
                    if(err) done(err);
                    expect(res.body.name).toBeTruthy();
                    done();
                });
        });
    });

    describe('PATCH /sellerContact', function() {

        it('should update the particular contact', function(done){
            agent
                .patch('/sellerContact')
                .set('xsrf-token', csrfToken)
                .send({
                    name: 'testName',
                    sellerContactId
                })
                .expect(200)
                .end((err, res) => {
                    if(err) done(err);
                    expect(res.body.name).toEqual('testName');
                    done();
                });
        });
    });

    describe('DELETE /sellerContact', function() {

        it('should delete the particular contact', function(done){
            agent
                .delete('/sellerContact')
                .set('xsrf-token', csrfToken)
                .send({
                    sellerContactId
                })
                .expect(200)
                .end(() => {
                    agent
                        .get('/sellerContact')
                        .set('xsrf-token', csrfToken)
                        .send({
                            sellerContactId
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

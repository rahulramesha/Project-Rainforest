const request = require('supertest');

const testHelper = require('../../../testCommon');
const seller = require('../sellerAPI');

const app = testHelper.server([seller]);
const db = testHelper.seeder;

describe('Test sellerAPI enpoints', function() {

    beforeAll(() => {
        db.freshSeed();
    });


    describe('GET /sellerLogin', function() {

        it('responds with html', function(done) {
            request(app)
                .get('/sellerLogin')
                .expect('Content-Type', 'text/html; charset=UTF-8')
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    done();
                });
        });
    });

    describe('GET /sellerSignup', function() {

        it('responds with html', function(done) {
            request(app)
                .get('/sellerSignup')
                .expect('Content-Type', 'text/html; charset=UTF-8')
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    done();
                });
        });
    });


    describe('PUT /sellerSignup', function() {

        it('responds with auth cookies', function(done) {
            request(app)
                .put('/sellerSignup')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    name: 'name',
                    email: 'email@example.com',
                    password: 'qwerty',
                    primaryPhoneNumber: 123456789,
                    countryCode: '+ 1'
                })
                .expect(201)
                .end(function(err, res) {
                    if(err) return done(err);
                    expect(res.headers['set-cookie'].length).toBe(4);
                    done();
                });
        });
    });

    describe('POST /sellerLogin', function() {

        it('responds with auth cookies', function(done) {
            request(app)
                .post('/sellerLogin')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    email: 'shopping@disney.com',
                    password: 'qwerty'
                })
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    expect(res.headers['set-cookie'].length).toBe(4);
                    done();
                });
        });
    });
    
    describe('Testing Auth flows', function() {

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

        describe('GET /sellerProfile', () => {

            it('should respond with profile', (done) => {
                agent
                    .get('/sellerProfile')
                    .set('xsrf-token', csrfToken)
                    .send()
                    .expect(200)
                    .end(( err, res) => {
                        if(err) done(err);
                        expect(res.body.email).toBe('shopping@disney.com');
                        done();
                    });
            });

        });

        describe('POST /sellerLogout', ()=> {

            it('should not be able to get Profile', (done) => {
                agent
                    .post('/sellerLogout')
                    .set('xsrf-token', csrfToken)
                    .send()
                    .expect(200)
                    .end(() => {
                        agent
                        .get('/sellerProfile')
                        .set('xsrf-token', csrfToken)
                        .send()
                        .expect(401)
                        .end((err, res) => {
                            if(err) done(err);
                            done();
                        });
                    });
            });
        });

        describe('DELETE /sellerDelete', ()=> {

            it('should not be able to get the profile after deletion', (done) => {
                agent
                    .delete('/sellerDelete')
                    .set('xsrf-token', csrfToken)
                    .send()
                    .expect(200)
                    .end(() => {
                        agent
                        .get('/sellerProfile')
                        .set('xsrf-token', csrfToken)
                        .send()
                        .expect(401)
                        .end((err, res) => {
                            if(err) done(err);
                            done();
                        });
                    });
            });
        });

    });

});

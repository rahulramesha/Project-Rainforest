const request = require('supertest');

const testHelper = require('../../../testCommon');
const customer = require('../customerAPI');

const app = testHelper.server([customer]);
const db = testHelper.seeder;

describe('Test customerAPI enpoints', function() {

    beforeAll(() => {
        db.freshSeed();
    });


    describe('GET /login', function() {

        it('responds with html', function(done) {
            request(app)
                .get('/login')
                .expect('Content-Type', 'text/html; charset=UTF-8')
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    done();
                });
        });
    });

    describe('GET /signup', function() {

        it('responds with html', function(done) {
            request(app)
                .get('/signup')
                .expect('Content-Type', 'text/html; charset=UTF-8')
                .expect(200)
                .end(function(err, res) {
                    if(err) return done(err);
                    done();
                });
        });
    });


    describe('PUT /signup', function() {

        it('responds with auth cookies', function(done) {
            request(app)
                .put('/signup')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    firstName: 'name',
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

    describe('POST /localLogin', function() {

        it('responds with auth cookies', function(done) {
            request(app)
                .post('/localLogin')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    email: 'John@example.com',
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
                .post('/localLogin')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send({
                    email: 'John@example.com',
                    password: 'qwerty'
                })
                .expect(200);

            csrfToken = testHelper.parseCookies(response.headers)['XSRF-TOKEN'].value;
        });

        describe('GET /profile', ()=>{

            it('should respond with profile', (done) => {
                agent
                    .get('/profile')
                    .set('xsrf-token', csrfToken)
                    .send()
                    .expect(200)
                    .end(( err, res) => {
                        if(err) done(err);
                        expect(res.body.email).toBe('John@example.com');
                        done();
                    });
            });

        });

        describe('POST /logout', ()=> {

            it('should not be able to get Profile', (done) => {
                agent
                    .post('/logout')
                    .set('xsrf-token', csrfToken)
                    .send()
                    .expect(200)
                    .end(() => {
                        agent
                        .get('/profile')
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

        describe('DELETE /delete', ()=> {

            it('should not be able to get the profile after deletion', (done) => {
                agent
                    .delete('/delete')
                    .set('xsrf-token', csrfToken)
                    .send()
                    .expect(200)
                    .end(() => {
                        agent
                        .get('/profile')
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

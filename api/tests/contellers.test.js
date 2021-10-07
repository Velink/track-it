const controller = require('../controllers/userRoutes') 

const User = require('../models/user');

const mockSend = jest.fn();
const mockJson = jest.fn();
const request = require("supertest");
const server = require('../server')

const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }




describe('Endpoints', () => {
    let api;


    beforeAll(() => {
        api = server.listen(5000, () =>
            console.log('Test server running on port 5000')
        );
    });

    afterAll((done) => {
        console.log('Gracefully stopping test server');
        api.close(done);
    });




    test('get status 200 for get to /', done => {
        request(api).get('/').expect(200, done)
    });

    test('get status 200 for get to /login', done => {
        request(api).get('/login').expect(200, done)
    });

    test('get status 401 when token is not used for post to /login', done => {
        request(api).post('/login').expect(401, done)
    });

    test('get status 401 when token is not used for get to /user', done => {
        request(api).get('/user').expect(401, done)
    });

    test('get status 200 for post to /register', done => {
        request(api).post('/register').expect(200, done)
    });

    test('get status 401 for unauthorized request', done => {
        request(api).get('/user/max@max.com/choose_habits').expect(401, done)
    });

    test('get status 401 for unauthorized patch request', done => {
        let testUser = {"email": 'max2@max2.com', "newHabitsArr" :[{"habitName" : "newtesthabit","frequency":5}]}
        request(api).patch('/user/max@max.com/choose_habits').send(testUser).expect(401, done)
    });

    test('get status 401 for unauthorized request for particular habit', done => {
        request(api).get('/user/max@max.com/walking').expect(401, done)
    });

    test('get status 401 for unauthorized request for post', done => {
        request(api).post('/user').expect(401, done)
    });
})



   
    

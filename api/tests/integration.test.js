const { initTest } = require('./testDb/initTest.js')
const app = require('../server')
const request = require('supertest')
const authenticateToken = require('../middleware/tokenAuth')


const jsonwebtoken = require("jsonwebtoken");
// for hashing the password successfully when we create users
const bcrypt = require("bcrypt");
let auth = {};


const dbTestName = "test"
let token;

describe('integration tests', () => {
    let api;
    beforeAll(async () => {
        api = app.listen(5001, () => console.log('Test server running on port 5001'))
    });

    afterAll(async () => {
        console.log('Closing test server')
        await api.close()
    });
    beforeEach(async () => {
        // connect to the test DB 
        console.log("before each")
        const testclient = await initTest();
        console.log("after init")
        // reset test tb
        await testclient.db(dbTestName).collection('users').deleteMany({})
       // add one test user
        await testclient.db(dbTestName).collection('users').insertMany([
          {username: 'test1234',
          email: 'test1234@gmail.com',
          hash: "$2a$10$lO8b55Yw/tRDAEP/MQv2luciHZeYkkS9lF3jOjIu4W9j17V0RpEdW",
        habits:[
              {habit_name:"walking",
              frequency:3,
              completed_days:[1,0,1,1,1,0,0]},
              {habit_name:"swimming",
              frequency: 2, completed_days:[1,1,1,0,1,0,0]},
              {habit_name: "cycling",
              frequency:1,
              completed_days:[0,0,0,0,0,0,0]}]}

        ])
        console.log("before token")
       // log in test  user to get 


     
       request(app).post('/login').send({
          email:'test1234@gmail.com',
          password: "test1234" ,
        })
        .end((err, response) => {
          token = response.body; 
        
        });
        
    
 
    })
    it('should return a list of habits with frequencies ', async () => {
        //  add token to req??
        
            return request(app).get('/user/test1234@gmail.com/choose_habits')
              .set('Authorization', `Bearer ${auth.token}`)
              .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(res.body.habits).toHaveLength(3);
              });



    });
})

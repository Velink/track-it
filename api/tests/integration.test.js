const { initTest } = require('./testDb/initTest.js')
const app = require('../server')
const request = require('supertest')
const authenticateToken = require('../middleware/tokenAuth')
require('dotenv').config();
const jwt = require('jsonwebtoken');
// for hashing the password successfully when we create users
const bcrypt = require("bcryptjs");
let auth = {};
let resp;


const dbTestName = "test"
let token1;
let token2;
let mytoken;

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
// insert one test user
        await testclient.db(dbTestName).collection('users').insertMany([
          {username: 'test1234',
          email: 'test1234@gmail.com',
          hash: "",
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
//  generating hash  for test user    
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash("test1234", salt);
        console.log("hashed ",hashed)
        await testclient.db(dbTestName).collection('users').
        findOneAndUpdate({ email: { $eq: "test1234@gmail.com"}},{ $set: { hash: `${hashed}` } })
//  check if hashed is correct      
        const authed = await bcrypt.compare("test1234", hashed);
        console.log(authed);
/*    
// -----trying to generate token ---------------------------------
app.post('/login', async (req, res) => {
    try {
       // const user = await User.findByEmail(req.body.email) // finds unique username in database. we will add validation so that usernames are unique
       // if (!user) { throw new Error('No user with this email') }
        const authed = await bcrypt.compare("test1234", hashed);
        console.log(authed);
        if (authed) {
            const payload = { name: "test1234", email: "test1234@gmail.com" }
            console.log(payload);
            const sendToken = (err, token) => {
                if (err) { throw new Error('Error in token generation') }
                res.status(200).json({
                    success: true,
                    token: "Bearer " + token,
                });
            } //access token formed using payload+header
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, sendToken) // sendToken sends token to client side, stored in local storage
           
        } else {
            throw new Error('User could not be authenticated') //password incorrect
        }
    } catch (err) {
        res.status(401).json({ err });
    }
})

async function requestLogin(e) {
    try {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;


        const loginData = {
            email: email,
            password: password
        }

        console.log(JSON.stringify(loginData));
        console.log(loginData);

        let options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            },
        }

        const response = await fetch(`http://localhost:5001/login`, options);
        const data = await response.json();
        if (!data.success) { throw new Error('Login not authorised'); }
        return data.token;

    } catch (e) {
        console.log(e);
    }

}
 mytoken = await requestLogin()
console.log("my token", mytoken)

// ------------------------------------------------------------
  //  console.log("send token", sendToken)
   //     console.log("jwt1", qw)
    //    console.log("jwt" ,jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, sendToken))
    
//  ----- trying toget token with supertest 
        request(app).post('/login').send({
          email:'test1234@gmail.com',
          password: "test1234",
        }).end((err, response) => {
          token1 = response.body.token; 
          resp = response.body
        });
        
      //  console.log("res body", resp)
       // console.log("token1 ", token1)
        //console.log("token2 ", token2)
        */
 
    })

    it('should return a list of habits with frequencies ', async () => {
        //  add token to req??
        
            return request(app).get('/user/test1234@gmail.com/choose_habits')
              .set('Authorization', `Bearer ${auth.token}`)
            //  .auth('test1234@gmail.com', 'test1234')
              .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
                expect(res.body.habits).toHaveLength(3);
              });
            
            });

        it('should  not return a list of habits or unauthorised user', async () => {
                //  add token to req??
                
                    return request(app).get('/user/test1234@gmail.com/choose_habits')
                     // .set('Authorization', `Bearer ${auth.token}`)
                     // .auth('test1234@gmail.com', 'test1235')
                      .then((response) => {
                        expect(response.statusCode).toBe(401);
                
                      });
                    });   
         
        it('should  not return a dashboard data for unauthorised user ', async () => {
            //  add token to req??
            
                return request(app).get('/user/test1234@gmail.com/dashboard')
                 // .set('Authorization', `Bearer ${auth.token}`)
                  //.auth('test1234@gmail.com', 'test1235')
                  .then((response) => {
                    expect(response.statusCode).toBe(401);
            
                    
                });
            });
              
        it('should  not return a dashboard data  for unauthorised user ', async () => {
            //  add token to req??
            
                return request(app).get('/user/test1234@gmail.com/walking')
                 // .set('Authorization', `Bearer ${auth.token}`)
                 // .auth('test1234@gmail.com', 'test1235')
                  .then((response) => {
                    expect(response.statusCode).toBe(401);
            
                    
                });

            }); 
            
            it('should return a list of habits with frequencies for authorised user ', async () => {
                
                await request(api)
                .post('/register')
                .send({
                    email: 'max@max.com',
                    username: 'super_max',
                    password: 'password123',
                    passwordcon: 'password123'
                }).set('Content-Type', 'application/json')

              //login  
                let loginRes = await request(api)
            .post('/login')
            .send({
                email: 'max@max.com',
                password: 'password123'
            })
            .set('Content-Type', 'application/json')
            const token = loginRes.body.token.split(' ')[1];
            //console.log('res', res.body)
           //console.log('token', token)

            // request data
            let chooseHabitsRes = await request(api)
            .get('/user/max@max.com/choose_habits')
            .set('Content-Type', 'application/json')
            .set('auth-token', token)
        expect(chooseHabitsRes.statusCode).toEqual(201)

            });

 
            it('should return a dashboard data  for authorised user ', async () => {
                
                await request(api)
                .post('/register')
                .send({
                    email: 'max@max.com',
                    username: 'super_max',
                    password: 'password123',
                    passwordcon: 'password123'
                }).set('Content-Type', 'application/json')

              //login  
                let loginRes = await request(api)
            .post('/login')
            .send({
                email: 'max@max.com',
                password: 'password123'
            })
            .set('Content-Type', 'application/json')
            const token = loginRes.body.token;
            //console.log('res', res.body)
           //console.log('token', token)

            // request data
            let chooseHabitsRes = await request(api)
            .get('/user/max@max.com/dashboard')
            .set('Content-Type', 'application/json')
            .set('Authorization', token)
        expect(chooseHabitsRes.statusCode).toEqual(200)

            });
            


            
            it('should   ', async () => {
                
                 
                
                    });
    
       
                
            
            
})

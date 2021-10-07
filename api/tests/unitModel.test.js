const User = require('../models/user')
jest.mock('../models/user')

const mongodb = require('mongodb')
jest.mock('mongodb');

const db = require('../dbConfig/init');


 describe('User unit tests', ()=>{

    beforeEach(() => jest.clearAllMocks())
    
    afterAll(() => jest.resetAllMocks())
 
 
    test('it resolves with all users on successful db query', async () => {
       // what function from mongodb  to spyOn????
        jest.spyOn(db, find)
            .mockResolvedValueOnce({ });
        const all = await User.findHabitsForUser;
        expect(all).toHaveLength(1)
    })

    // create
    // findHabitsForUser
    // updateHabitsForUser
    // findDataHabit
    //updateDataHabit
    //deleteHabit


 })
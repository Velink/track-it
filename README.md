#  Work-in-progress README
## Requirements from the Project Brief
#### Functionality for users:
1. **Users should be able to login** 
   -  (home page - excalidraw page 1 - "login or register")
3. **Users should be able to choose a habit they want to track (e.g water, exercise, 8 hours of sleep) and choose the frequency at which they want to track the habit**
   - (excalidraw page 4-5 - user should see it after successful registration and user should be able to open it from the "User's dashboard" page)
   - !!  to discuss  -  choose habits and frequency on the same page?
5. **Users should be able to track a habit and mark it as complete for the day**  
   - user should be able to click on the habit card on the "User's Dashboard" (excalidraw p.6) and should see the "Habit page"(excalidraw p.7) with data for the current week and  highlighted editable 'today' box 
   - !! to discuss - is it possible to edit previous days??
6. **Users should be able to see if they have completed a habit for the day and see their most recent completion streak** 
   - "Habit page" (excalidraw page 7)
   - !! to discuss - should "complete for today" functionality be also available on the "User's Dashboard" page?? 

#### Technical requirements:
5. Data should be persisted in a database
6. Minimum 60% test coverage with an aim of 80%

# Data model draft  - !! to discuss
```
{
   user_id: 123frt4567,
   username: "eledoro",
   email: "me@eledoro.com"
   password: "supersecrethashedpassword",
   habits: [
              { habit_name: "run 3K",
                habit_frequency: [
                   { frq: 2,
                     freq_setup_date: 2.09.2021
                   },
                   { frq: 3,
                     freq_setup_date: 5.10.2021
                    }
                ],
               habit_completed_days:[ 2.09.2021, 4.09.2021, 10.09.2021]
             },
              { habit_name: "water 2L",
                habit_frequency: [
                {frq: 4,
                 freq_setup_date: 7.09.2021
                 },
                 {frq: 7,
                 freq_setup_date: 5.10.2021
                 }
               ],
               habit_completed_days:[ 11.09.2021, 12.09.2021, 13.09.2021]
             }
             ] 
   }
```
# API Design Draft - !! to discuss

| Path  |  HTTP verb |  Action in contollers  |  data in req  from client  |  data in res form server |  ent from  |
|-------|------------|------------------------|----------------------------|--------------------------|------------|
| /register|  POST | create | username, password, email, token |   |   Registration page (excalidraw p.2)  | 
| /login | POST  |   | token, username, password  | token   |  Main (excalidraw. p1) |
| /:username/choose_habits   | GET|  findHabitsForUser     | username | list of habits with frequencies | Choose habits page (excalidraw p.4)   |
| /:username/choose_habits   | PATCH|  updateHabitsForUser   | username,list of habits with frequencies| username, list of habits with frequencies | Choose habits page (excalidraw p.4)  |
| /:username/dashboard/:week | GET |   | username, week number| username, list of habits with frequencies and count of days when competed on the week  | User's dashboard (excalidraw p.6)   |
| /:username/:habit/:week    | GET |   | username,habit name, week number   | username, habit name, week number, days of the week when completed | Habit page (excalidraw p.7)|
| /:username/:habit/:week    | PATCH | updateCompleted  | username,habit name, week number, today date (to mark as completed)|  | Habit page (excalidraw p.7) |




# TO DO:
##  Server
 1. Create an entrypoint - *index.js* 
 2. Create a server app - *server.js*
 3. Implement VCM - create Controllers:
    - 3.1 routs for Users:
      - 3.1.1 POST new user at   '/register'
      - 3.1.2 GET user by username  
      - 3.1.3 PATCH  edit username or email   **optional**
    - 3.2 rout for Habits:
    
    

 4. Implement VCM  - create Models:
    - 4.1 class ***User***, including methods for:
      -  4.1.1  regersting/creating a new user  - API endpoint '/register' -  **must**
      -  4.1.2  finding user's data by username  - **must**
      -  4.1.3  update user's list of habits - **must**
      -  4.1.4  update user's username, email or password  - **optional** 
    - 4.2 class ***Habit***, including methods for:
      - 4.2.1  
       
 5. Write unit tests for models (all funcs from  4.1 and 4.2)  - **must**
 6. Writre unit tests for controllers   - **must**
 7. Integration tests:
    - 7.1 config  and seed test DB
    - 7.2 Write test
 9. Move server code to separate repo
 10. Deploy server on heroku - **must**

## Client
1. create ***Main page (login/register)*** (excalidraw page 1):
  - 1.1 funcs for rendering Login form  - **must**
  - 1.2 funcs for input validation (? can be used for Registration as well)
  - 1.3 fetchers for sending Login details - **must**   (
  - 1.4 auth & aith functionality - **must?**
2. create ***Registration page*** (excalidraw page 2):
  - 2.1 funcs for rendering Registration form  - **must**
  - 2.2 fetchers for creating a new User  (API endpoint '/register')  - **must**
3. create ***Choose habits*** page (excalidraw page 4-5 ?? should it be one page??):
  - 4.1 funcs for rendering  - **must** 
  - 4.2 fetchers for updating User's data - must

4. create page ***User's Dashboard*** (excalidraw page 6):
  - 3.1 funcs for rendering Dashboards - **must**
  - 3.2 fetchers   - **must**
  - 3.3 "see previous week" functionality  - **optional**
5. create ***Habit page*** page (excalidraw page 7):
  - 4.1 funcs for rendering  - **must** 
  - 4.2 fetchers for updating User's data - **must**
  - 4.3 "see previous week" functionality  - **optional**
6. Write client tests ...
7. Deploy on Netlify 
  
## Database
1. Config mongoDB database
2. Seed some data for the demo
3. Deploy to ?? AWS or ?? Heroku

#  Ideal Timeline  - !! to discuss
## Monday 4.10:
  - Server - all **must** functionality 
  - Client  - all **must** functionality 
  - Database - config
## Tuesday 5.10:
  - Server - **some** tests and deploy -  5,6,7  and 9,10
  - Database - deploy with some data
  - Client  - deploy with **must** functionality
## Wednsday 6.10:
  - Optional functionality
  - Bug fix
  - start on styling
## Thursday 7.10
  - presentation
  - seed data for the demo
  - more tests
  - styling






          







#  FINAL README DRAFT
# track-it
Habit Tracker App

## Description / Requirements
#### Functionality for users:
- Users should be able to login
- Users should be able to choose a habit they want to track (e.g water, exercise, 8 hours of sleep) and choose the frequency at which they want to track the habit
- Users should be able to track a habit and mark it as complete for the day
- Users should be able to see if they have completed a habit for the day and see their most recent completion streak

#### Technical requirements:
- Data should be persisted in a database
- Minimum 60% test coverage with an aim of 80%

# Installation & usage

# Technologies
Used VCM 

 + node
 + cors
 + express
 + bcrypt
 + jsonwebtoken
 + mongodb
 + mongoose
 ### Development
 + jest
 + nodemon
 + supertest 

# Wins & Challenges
## Wins
## Cahllenges

# Future features

# Authors 
 
# Licence



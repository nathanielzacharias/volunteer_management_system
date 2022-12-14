# VolunteerMe : a volunteer management system
This is a volunteer management system.  
It allows Event Admins to create Events and Roles for which volunteers are needed.  
Volunteers may view the Events and sign up for Roles.

## Link to hosted app
Link: https://p2-volunteer-management-system.herokuapp.com/

## Tech stack
The technologies used in this app are:  
- node js
- express js
- ejs 
- mongoDB
- mongo Atlas 
- mongoose
- dot env
- bcrypt
- Skeleton (CSS)

## Approach taken
The approach was to build a simple, usable app fit for purpose.  
  
UI/UX considerations included:
- allow users to browse Events without need for Login
- keeping the visual palette flat and grey
- centered fields and F-shaped forms for good flow
  
Development focused first on giving the Events full CRUD functionality with 7 RESTful routes before adding other features.  

## Unsolved problems
- [x] CSS styling is currently broken
- [ ] DB Events does not include Users who have volunteered
- [ ] Do not show Create new event button 
- [ ] Grant user privileges of Admin or Volunteer

## User stories
1. Admin: land on Events, click on Create New Event, is prompted for Login, after Login is shown Create New Event form.
2. Volunteer: land on Events, clicks on Add to Profile, is prompted for Login, after Login is shown Events again. 

### Notes to self
- I underestimated the task and complexity of this.
- I need to ask others sooner. Communication and Collaboration are key. 




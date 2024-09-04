PHASE 1 - CHAT APPLICATION 

1. Project Overview
This is the Phase 1 implementation of a chat application built using the MEAN stack (MongoDB, Express, Angular, Node.js) with Socket.io for real-time communication (functions are implemented in Phase 2). 

In Phase 1, it focus on on user authentication, user role management (Super Admin, Group Admin, and User), group and channel creation, and storing data in local storage.
The data is periodically saved to a JSON file and loaded upon server start and the system will handle the most simple basic of user login, logout and role base views. 

2. Git Repository Layout and Version Control
(The layout below is provided my basic set up for this assignment)

/client - Angular frontend
    /src
      /app
        /components  - Angular components
        /services    - Services for API calls and data handling
        /models      - Data models for users, groups, and channels
      /assets
      /environments
      index.html
      main.ts
      app.module.ts
/server - Node.js backend
    /routes          - REST API routes
    /data            - JSON file for data persistence
    server.js        - Express server with Socket.io and PeerJS setup
    package.json
README.md

Version Control: 
For version control, I implemented 3 main stratergy to up keep and maintain the project. 
 
 Branching out different function, set up and development. THe main branch will hold the stable versio of the application while other branch will contain further develop feature and debugging fix. 

 Frequency Commitment. Any major update, change or delete to the project will be describe in paragpraph and push to ensure clarity. 

 Having different sources computer manage and pull request collaboraing for review before merging change into main branch. 

 3. Data structure 
the application use the different key structure to store local data into JSON file.

User structure 

{
  "username": "user1",
  "email": "user1@example.com",
  "role": "SuperAdmin", // or like "GroupAdmin", "User"
  "groups": ["group1", "group2"]
}

Group structure 

{
  "name": "group1",
  "channels": ["channel1", "channel2"],
  "members": ["user1", "user2"]
}

Channel Structure

{
  "name": "channel1",
  "group": "group1",
  "members": ["user1", "user2"]
}

Overall, these structure are convert into the JSON format and store in a local file which then loaded on server when startup. 

4. REST API 

The angular front end is communicates with teh Nodejs server through REST API. THe routes below are: 

User routes: 

POST /api/users - Create a new user.

Parameters: { "username": "user1", "email": "user1@example.com", "role": "User" }
Returns: 201 Created if successful, or 400 if the username already exists.
DELETE /api/users/:username - Delete a user by username.

Parameters: username in the URL.
Returns: 200 OK if successful.
Group Routes:

POST /api/groups - Create a new group.

Parameters: { "name": "group1" }
Returns: 201 Created if successful.
DELETE /api/groups/:groupName - Delete a group by name.

Parameters: groupName in the URL.
Returns: 200 OK if successful.
Channel Routes:

POST /api/groups/:groupName/channels - Add a channel to a group.

Parameters: { "name": "channel1" } in the body.
Returns: 201 Created if successful.
DELETE /api/groups/:groupName/channels/:channelName - Delete a channel from a group.

Parameters: groupName, channelName in the URL.
Returns: 200 OK if successful.

(the angualar routes above are what expected but are not fully tested)

5. Angular Architecture 

Components: 

AppComponent: they contain the main root of the component, and handling layout and navigation. 

LoginComponent: Allow user to login, logout and store user login data in local storage and give role-base navigation for user. 

GroupComponent: Displays avaiable group, channel and allow admin to create, manage and operate them will full functionality. 

UserComponent: They display all the list of user for the Super Admin and allowing them to create and delete users out of the group or channel. 

Service: 
AuthService: this will handle user login, logout and authentication. - the user will use their local storage for their current loggin data. 

GroupService: Manage group and and channel creation. 
They will send API requests to the backend for managing groups and channels. 

UserService: They will handle user creation and deletion of Super Admins. 

Model: 
User represents a user with properties like "username", "email", "role", and "group". 

Group represent properties like name, channel, and member 

Channel propeties like name, group, and members. 

6. Local storage Implementation 

Login: When a user log in, their username is store in a local storage. the system check the local to determine of the user is in and display their personal group and channel. 

Logout: When they log out, their username is remove from the storage and then redirected back to the login page. 

Group and Channels: Group and channel are stored in local storage and periodically save to JSON file for persistence check across session. Ensure structure integrity. 




Additonal information: 
Known Issue: The project will run and post in VSCode but it will run into issue when the 30 second time out happen due to userline issue i'm trying to resolve. 

- install npm and run cd client because angular json file is in client. 

run server through node server.js 

cd client then 
ng serve to run frontend angular 
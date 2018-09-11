# Lattis-API-Design
A demo API design 

## This repository is under active development.

### Please move into develop branch to see the development cycle.

#### Task List

- [x] Register User
- [x] Login User
- [x] jwt token for user authentication
- [x] Add Lock
- [x] Update Lock
- [x] Delete Lock
- [x] Update User
- [x] Get User info with locks
- [x] bcrypt Password (insert and retrieve)
- [x] Delete User

### Details on REST API endpoints

`/api/register` : Register a User (do not require a token).
`/api/login` : Login with the registered user (required username and password and x-access-token) **x-access-token will be generated here.
`/api/user/:id` : Update a user with id (x-access token required).
`/api/user/:id` : Delete a user (x-access token required).
`/api/addLock` : Register a lock (x-access token required).
`/api/updateLock`: Update the details of the lock (lockname x-access token required).
`/api/deleteLock`: Delete the lock created earlier (x-access token required).
`/api/me` : List the logged in user's info including the lockname (x-access token required)
`/api/list`: List all the users with usernames (x-access token required)
# Prerequisites:

- Node.Js v20.10.0
- npm v10.4.0
- docker 24.0.6

Steps to run the app:

1. npm install
2. npm run dbup &nbsp;-> creates postgresql DB in docker

debug mode: 
<br/>&nbsp;3. npm run debug &nbsp;-> runs the app using ts-node

build mode: 
<br/>&nbsp;3. npm run build &nbsp; -> transpiles ts to commonJs in dist folder <br/>&nbsp;4. npm run start &nbsp;-> runs transpiled app from dist folder




# API DOCUMENTATION
```
@authenticated(JWT)
POST /api/lists     -> Creates new list.
body: {
    "name": string(min:3, max:255)  REQUIRED
}

@authenticated(JWT)
POST /api/lists/:listId/users     -> Shares list(if you have access to it) to another user specified in request body
params: {
    listId: int(min:1)  REQUIRED
}
body: {
    "userId": int(min:1)    REQUIRED
}

GET /api/lists/:listId      -> Get specified list and its items
params: {
    listId: int(min:1)  REQUIRED
}

-----------------------

POST /api/auth/register     -> Register new user
body: {
    "email": string(email)    REQUIRED
    "password": string(min:6, max:255)   REQUIRED
}

POST /api/auth/login     -> User login
body: {
    "email": string(email)    REQUIRED
    "password": string(min:6, max:255)   REQUIRED
}

-----------------------

@authenticated(JWT)
POST /api/items        ->   Creates item in list
body: {
    "listId": int(min:1)    REQUIRED
    "title": string(min:3, max:255)   REQUIRED
    "deadline": string(Date ISO8601)   REQUIRED
    "text": string(min:3, max:1000)  REQUIRED
}

@authenticated(JWT)
PATCH /api/items/:itemId        -> Updates flag in specified item
params:{
    "listId": int(min:1)    REQUIRED
}
body: {
    "flag": string(ENUM("ACTIVE","DONE","CANCELED"))    REQUIRED
}
```

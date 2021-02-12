# Note-keeping 
An app to keep track of notes using NestJS and React. View demo [here](https://notekeepr-app.herokuapp.com/)

## Technologies used
* Nestjs
* GraphQL
* Apollo-client
* React
* Redux
* Draftjs
* Bootstrap

## Prerequisites  
* NPM,  yarn package manager
* PostgreSQL (Datasource used)

## Installation

Fork the repo, then run:

`git clone https://github.com/YourUserName/note-keeping.git`

Next, install all dependencies:

`npm install`

Create .env file in client folder:

`SERVER_URI=http://localhost:9000/graphql`

Create .env file in note-keeping folder:

`
PORT=9000
DB_HOST=YOUR_DB_HOST
DB_PORT=YOUR_DB_PORT
DB_USERNAME=YOUR_DB_USERNAME
DB_PASSWORD=YOUR_DB_PASSWORD
DB_DATABASE=YOUR_DB_DATABASE
JWT_SECRET=YOUR_JWT_KEY
`

To run the app, navigate to note-keeping directory and run: 

`npm run start` or `nest start`
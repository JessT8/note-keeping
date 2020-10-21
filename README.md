# Note-keeping
An app to keep track of notes using NestJS and React

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

Create .env file in client src folder:

`SERVER_URI=http://localhost:9000/graphql`

Create .env file in server src folder:

`
PORT=9000
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
`

To run the app, navigate to server directory and run: 

`npm run start` or `nest start`

Open another terminal, navigate to the client directory and run:

`npm run start`
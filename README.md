# Node Js Authentication
This is a user authentication app using Node.js, Express, Passport and Mongoose.

Version 1.0.0

# Installation

    npm install
    
# Usage

    node app
    
Open with "localhost:3000/" url in your browser.

# Registration

 localhost:3000/register 
User can register here with proper email.

In this it has required validation through node js , proper email validation through node js and password comparing validation using Node js 

To store user data MongoDb is used and mongoose package of Node js.

# Login

<localhost:3000/login>
User can login with correct username and password.
User can only vist other pages if logged-in.

For Authentication Passport package is used.

Middlerware is set to check on every page user is logged-in or not using Node js

Ejs is template engine used in this app.

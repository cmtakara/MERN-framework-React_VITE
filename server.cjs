require("dotenv").config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

// Connect to the database
require('./config/database.cjs')

const app = express();


//middleware
// create a dev logger using morgan
app.use(logger('dev'));
// allows express to send and receive JSON information
// to be able to parse incoming JSON data
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
// === will add this back in when we have an .ico for our favicon
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));

// this syntax is for create-react-app, so need to change 'build' to 'dist'
// app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'dist')));

// checkToken Middleware. (Sets the req.user & req.exp properties on the request object)
app.use(require('./config/checkToken.cjs'));

// Put API routes here, before the "catch all" route
app.get('/api/test', (req, res) => {
  res.send('You just hit a API route');
});

const userRouter = require('./routes/api/users.cjs');
//Router setup
// If the request starts with /api/users/ it directs the request to the userRouter (ln. 28)
app.use('/api/users', userRouter);

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });


// can update to have .env with the PORT
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Express app is running on port: ${PORT}`);
})

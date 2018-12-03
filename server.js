var express = require('express');
var firebase = require("firebase-admin");
const bodyParser = require('body-parser');
var serviceAccount = require("./serviceAccountKey.json");

// Setup firebase credentials
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://golf-logger-3dce5.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("stats_table");
var entriesRef = ref.child("entries");
// define the Express app
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

// Express only serves static assets in production
console.log("NODE_ENV: ", process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  
  // Return the main index.html, so react-router render the route in the client
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('frontend/build', 'index.html'));
  });
}

// retrieve Basic message
app.get('/', (req, res) =>{
    res.send('You are now using the site')
})

//Retrieve all the user data
app.get('/:user', (req, res) => {
    let name = req.params.user;
    // let course = req.query.course;
    // let date = req.query.date;
    // let score = req.query.score;
    // console.log("Username: " + name + " Course name: " + course +
    //             " Date of score: " + date + " Score: " + score);
    //console.log("User: " + name);
    // res.json(req.query);
    ref.once("value", function(snapshot) {
        console.log(snapshot.val());
    })
})

// Insert a new score
app.get('/:user/add', (req, res) => {
    let name = req.params.user;
    let course = req.query.course;
    let date = req.query.date;
    let score = req.query.score;
    // console.log("Username: " + name + ", Course name: " + course +
    //             ", Date of score: " + date + ", Score: " + score);
    // res.json(req.query);
    entriesRef.push({
        username: name,
        course_name: course,
        date_score: date,
        score: score
    })
})

// start the server
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`);
});
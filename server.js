//import dependencies
const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
const mysql = require('mysql')
// const helmet = require('helmet');
// const morgan = require('morgan');

// define the Express app
const app = express();

app.set('port', (process.env.PORT || 5000));


// // enhance your app security with Helmet
// app.use(helmet());

// // use bodyParser to parse application/json content-type
// app.use(bodyParser.json());


// // log HTTP requests
// app.use(morgan('combined'));

//Connect to mySQL database
const connection = mysql.createConnection({
  host: 'localhost',  //Change this
  user: 'zbridwel@sppinsweb01.itap.purdue.edu',  //Change this
  password: '',       //Change this
  database: 'mydb.ics.purdue.edu'  //Change this
})

connection.connect(err => {
  if(err) {
      return err;
  }
})

// // enable all CORS requests
// app.use(cors());

// retrieve Basic message
app.get('/', (req, res) =>{
  res.send('You are now using the site')
})

//Retrieve all the user data
app.get('/user', (req, res) => {
  const name_id = req.query.name;
  const SELECT_ALL_USER_QUERY = `SELECT * FROM golf_table where name=${name_id}`;
  connection.query(SELECT_ALL_USER_QUERY, (err, results) => {
      if(err) {
          return res.send(err)
      } else {
          return res.json({
              data: results
          })
      }
  })
})

// Insert a new score
app.get('/user/add', (req, res) => {
  const{ name, course, date, score } = req.query
  const INSERT_SCORE_QUERY = `INSERT INTO golf_table(name, course, date, score) VALUES('${name}', '${course}', '${date}', '${score}')`
  connection.query(INSERT_SCORE_QUERY, (err, results) => {
      if(err) {
          return res.send(err)
      } else {
          return res.send('Score addition was a success')
      }
  })
})

// // insert a new entry
// app.post('/', (req, res) => {
//   const {userID, course, date, score} = req.body;
//   const newEntry = {
//     userID,
//     course,
//     date,
//     score,
//   };
//   entries.push(newEntry);
//   res.status(200).send();
// });

// start the server
app.listen(app.get('port'), () => {
  console.log(`listening on port ${app.get('port')}`);
});
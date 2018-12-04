var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://golf-logger-3dce5.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("entries_table");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

//var entriesRef = ref.child("entries");
ref.push({
    username: "zbridwell",
    course_name: "West Chase",
    date_score: "2017-09-02",
    score: "67"
});
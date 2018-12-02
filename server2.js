var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://golf-logger-3dce5.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("stats_table");
ref.once("value", function(snapshot) {
    console.log(snapshot.val());
});

var entriesRef = ref.child("entries");
entriesRef.set({
    entry2: {
        username: "skrishnakumar",
        course_name: "Augusta",
        date_score: "2018-10-24",
        score: "78"
    },
    entry3: {
        username: "skrishnakumar",
        course_name: "West Chase",
        date_score: "2018-04-24",
        score: "72"
    }
});
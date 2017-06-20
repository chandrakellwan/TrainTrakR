// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCY_ZkAulaPgqw-u3MWr19jlqJf692e144",
    authDomain: "mytrainschedule-e81d7.firebaseapp.com",
    databaseURL: "https://mytrainschedule-e81d7.firebaseio.com",
    projectId: "mytrainschedule-e81d7",
    storageBucket: "mytrainschedule-e81d7.appspot.com",
    messagingSenderId: "881198669814"
  };
  firebase.initializeApp(config);


  // Make variable to reference database
  var database = firebase.database();

  // Declare variables
  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";
  var totalBilled = "";

//on click function  
$("#addEmployeeBtn").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#firstTrain-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Code for handling the push
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

});











database.ref().on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().frequency);
    console.log(childSnapshot.val().firstTrain);
    // console.log(childSnapshot.val());

    var frequency = childSnapshot.val().frequency;
    console.log(frequency);
    // var trainArrive = moment(childSnapshot.val().firstTrain, "HH:mma");
    var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment().format("hh:mm");
    console.log(currentTime);

    var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(moment(timeDifference).format("hh:mm"));

    var tRemainder = timeDifference % frequency
    console.log(tRemainder);

    var tMinuetsTillTrain = frequency - tRemainder;
    console.log(tMinuetsTillTrain);

    var nextTrain = moment().add(tMinuetsTillTrain, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    console.log(nextTrain);


   $("tbody").append("<tr><td> " + childSnapshot.val().trainName +
        "</td><td>" + childSnapshot.val().destination +
        " </td><td> " + childSnapshot.val().frequency +
        "</td><td> " + nextTrain +
        "</td><td> " + tMinuetsTillTrain + "</td></tr>");

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});



























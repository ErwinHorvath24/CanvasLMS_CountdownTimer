// Java Countdown Timer


// Set cache settings
// var meta = document.createElement('meta');
// meta.httpEquiv = "Cache-Control";
// meta.content = "no-cache, no-store, must-revalidate";
// document.getElementsByTagName('head')[0].appendChild(meta);
//
// var meta1 = document.createElement('meta');
// meta1.httpEquiv = "Pragma";
// meta1.content = "no-cache";
// document.getElementsByTagName('head')[0].appendChild(meta1);
//
// var meta2 = document.createElement('meta');
// meta2.httpEquiv = "Expires";
// meta2.content = "0";
// document.getElementsByTagName('head')[0].appendChild(meta2);

// Set zoom settings
// var meta = document.createElement('meta');
// meta.name = "viewport";
// meta.content = "user-scalable=no, width=device-width";
// document.getElementsByTagName('head')[0].appendChild(meta);

// Variable initializations
var loggedinUser = "";
var submdate = "";
var newdate = "";
var taken = false;

// Set page for code to run on
if (window.location.href == 'https://fit.instructure.com/courses/533668') {
  // Get user's id
  loggedinUser = ENV.current_user.id;
  // hide side bar from home page
  document.getElementById("right-side-wrapper").style.display = "none";

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var students = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint | Get submission date for quiz
    students.open('GET', 'https://fit.instructure.com/api/v1/courses/533668/quizzes/830697/submissions', true);
    // Add authorization
    students.setRequestHeader("Authorization", "Bearer 1059~YUDPosfOLaWfQf4XVAsPavyXFYNjGnRHzqSbQuwFs6eQDANaeShDaGPVEDufVAEj");
    // Send request
    students.send();

    // Do this with response...
    students.onload = function () {
      var data = JSON.parse(this.response);

      var i;
      // save ids and submission dates from response in an array
      for (i = 0; i < data.quiz_submissions.length; i++) {

        if (data.quiz_submissions[i].user_id == loggedinUser) {
          taken = true;
          submdate = data.quiz_submissions[i].finished_at;

          break;
        }
      }

      if (taken) {
        // Convert original date to Date object
        var ogdate = new Date(submdate);

        // Format submission date
        var year = ogdate.getFullYear();
        var month = ogdate.getMonth()+1;
        var dt = ogdate.getDate();
        if (dt < 10) {
          dt = '0' + dt;
        }
        if (month < 10) {
          month = '0' + month;
        }

        // Set deadline to 180 days after submission date
        newdate = new Date(ogdate); //deadline
        newdate.setDate(newdate.getDate() + 180);

        // Convert deadline to milliseconds
        var countDownDate = new Date(newdate).getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

          // Get todays date and time
          var now = new Date().getTime();

          // Find the distance between now and the count down date
          var distance = countDownDate - now;

          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);

          // Display the result in the element with id="demo"
          document.getElementById("timerFrontPageRBT").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s remaining";

          // Send warning when 30 days remain


          // If the count down is finished, write some text
          if (distance < 0) {
            clearInterval(x);

            // Deactivate user

            document.getElementById("timerFrontPageRBT").innerHTML = "Time is up!";
          }
        }, 1000);

      } else {
          document.getElementById("timerFrontPageRBT").innerHTML = "Countdown timer starts on Pre-course Survey submission";
      }


    };

} else {
  // --- test ---
  console.log("No timers on this page!");

}

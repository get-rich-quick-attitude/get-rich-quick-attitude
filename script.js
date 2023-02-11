$(document).ready(function() {
  var count = 0; //Variable to keep track of each passing second
  var total; // Total background color to show (total)
  var countdown; // Used to begin the countdown interval
  var pomTime = 1500; // Default session length in seconds
  var restTime = 300; // Default rest/break length in seconds
  var remainingTime = 1500; // A variable used to set the countdown interval. Changes between pomTime and restTime
  var timeToRest = false; // Used as a means to determine if it is a time to rest or not

  // Ticking audio source: https://kahimyang.com/resources/sound/click.mp3
  // Playing audio in jQuery Source: https://kahimyang.com/kauswagan/code-blogs/1652/how-to-play-a-sound-when-an-element-is-clicked-in-html-page
  var tickSound = document.createElement("audio");
  tickSound.src = "https://kahimyang.com/resources/sound/click.mp3";
  tickSound.volume = 0.05;
  tickSound.autoPlay = false;
  tickSound.preLoad = true;

  // Alarm/ringing audio source: http://www.orangefreesounds.com/short-ringtone-for-notification/
  var alarmSound = document.createElement("audio");
  alarmSound.src =
    "http://www.orangefreesounds.com/wp-content/uploads/2016/12/Short-ringtone-for-notification.mp3";
  alarmSound.volume = 0.2;
  alarmSound.autoPlay = false;
  alarmSound.preLoad = true;

  // Display the current times for the pomodoro clock and time adjusters on page load.
  $("#restTime").html(timeConversion(restTime));
  $("#pomTime").html(timeConversion(pomTime));
  $("#clock").html(timeConversion(remainingTime - count));

  // On clicking the element with this class the ticking sound will muted or unmuted.
  // An icon showcasing this change will appear on-screen
  $(".playSound").click(function() {
    if (tickSound.volume > 0) {
      tickSound.volume = 0.0;
      $("#sound").removeClass("fa-volume-off");
      $("#sound").addClass("fa-volume-up");
    } else {
      tickSound.volume = 0.1;
      $("#sound").addClass("fa-volume-off");
      $("#sound").removeClass("fa-volume-up");
    }
  });

  // Change the number seconds to minutes and seconds that are two digits in length
  // Source that helped with string format: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  function timeConversion(t) {
     var mins = ("00" + (Math.floor(t / 60)).toString()).substr(-2);
     var secs = ("00" + (t % 60).toString()).substr(-2);
     return mins + ":" + secs;
  }

  // This function is called when a session or break period has finished.
  // It will reveal elements hidden after a completed countdown (down for visual effect)
  // Additionally it will begin a new countdown and display the type of countdown (session or break)
  function startAgain() {
    $("#reset, #clock").show();
    $("#clock").html(timeConversion(remainingTime - count));
    if(!timeToRest){
      $("#timerName").html("Session");
    }
    else{
      $("#timerName").html("Break");
      countdown = setInterval(function() {
        tick(remainingTime);
      }, 1000);
    }
  }

  // When called, this function will remove the color that has filled the pomodoro circle during a countdown period
  function empty() {
    $("#backdrop").height("100%");
  }

  // The following "Up" and "Down" function are used to increase or decrease session or break lengths
  // There are maximum and minimum values (1 - 5 mins for breaks and 5 - 25 mins for sessions)
  $("#restDown").click(function() {
    if (restTime > 30) {
      restTime -= 30;
      $("#restTime").html(timeConversion(restTime));
    }
  });

  $("#restUp").click(function() {
    if (restTime < 300) {
      restTime += 30;
      $("#restTime").html(timeConversion(restTime));
    }
  });

  $("#pomDown").click(function() {
    if (pomTime > 30) {
      pomTime -= 30;
      $("#pomTime").html(timeConversion(pomTime));
      $("#clock").html(timeConversion(pomTime));
    }
  });

  $("#pomUp").click(function() {
    if (pomTime < 3600) {
      pomTime += 30;
      $("#pomTime").html(timeConversion(pomTime));
      $("#clock").html(timeConversion(pomTime));
    }
  });

  // Upon clicking the element with this id, a session will begin and several elements will be hidden for visual effect
  // A stop button will appear to reset the session or end a break
  // Timing events documentation: https://www.w3schools.com/js/js_timing.asp
  $("#begin").click(function() {
    remainingTime = pomTime;
    $("#clock").html(timeConversion(remainingTime - count));
    countdown = setInterval(function() {
      tick(pomTime);
    }, 1000);
    $("#begin, .adjustTime").hide();
    $("#reset").show();
  });

  // Upon clicking the element with this id, a session will be reset. Breaks will be ended. The background will be cleared. 
  $("#reset").click(function() {
    empty();
    count = 0;
    $("#reset").hide();
    $("#begin, .adjustTime").show();
    remainingTime = pomTime;
    clearInterval(countdown);
    $("#timerName").html("Session");
    $("#clock").html(timeConversion(remainingTime - count));
    timeToRest = false;
  });

  // This function is executed every second during a session or a break
  function tick(t) {
    if (count < remainingTime) {
      count++; // Records each passing second
      tickSound.play(); // Plays a ticking noise
      total = (100 - count / t * 100).toString() + "%"; // Determines what percentage of time has elapsed and turns it into a string
      $("#clock").html(timeConversion(remainingTime - count)); // Updates the remaining time on-screen
      $("#backdrop").height(total); // Uses the total variable to display a color change within the circle for one to visualize the amount of elapsed time
    } else { // Perform these actions in the event that the timer reaches zero
      count = 0;
      empty();
      $("#reset, #clock").hide();
      alarmSound.play(); // Play an alarm/ringing sound to indicate that a countdown has been completed.
      clearInterval(countdown); // Ends the countdown
      setTimeout(startAgain, 3000); // Calls the startAgain function after 3 seconds
      if (timeToRest) { // Update the on-screen text to indicate that a countdown has completed. Switch the remaining time to the upcoming countdown
        $("#timerName").html("Break Complete!");
        remainingTime = pomTime;
        timeToRest = false;
      } else {
        $("#timerName").html("Session Complete!");
        remainingTime = restTime;
        timeToRest = true;
      }
    }
  }
});

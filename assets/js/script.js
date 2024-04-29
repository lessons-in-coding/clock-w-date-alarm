var alarmTime = null;
      var alarmSound = document.getElementById("alarmSound");

      function updateTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12; // handle midnight
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        var timeString = hours + ":" + minutes + ":" + seconds + " " + ampm;
        document.getElementById("time").innerHTML = timeString;

        var dateString = now.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        document.getElementById("date").innerHTML = dateString;

        // Check alarm if set
        if (alarmTime) {
          var alarmHours = alarmTime.getHours();
          var alarmMinutes = alarmTime.getMinutes();
          if (hours === alarmHours && minutes === alarmMinutes) {
            playAlarmSound();
            removeAlarm(); // Remove alarm after playing sound
          }
        }

        setTimeout(updateTime, 1000);
      }

      function setAlarm() {
        var userTime = prompt("Enter the time for the alarm (HH:MM AM/PM):");
        if (userTime) {
          var timeComponents = userTime.split(":");
          var hours = parseInt(timeComponents[0]);
          var minutesAmPm = timeComponents[1].split(" ");
          var minutes = parseInt(minutesAmPm[0]);
          var ampm = minutesAmPm[1].toUpperCase();
          if (ampm === "PM") {
            hours += 12;
          }
          alarmTime = new Date();
          alarmTime.setHours(hours);
          alarmTime.setMinutes(minutes);
          alert("Alarm set for " + userTime);
        }
      }

      function removeAlarm() {
        alarmTime = null;
        alert("Alarm removed");
      }

      function checkAlarm() {
        if (alarmTime) {
          playAlarmSound();
        } else {
          alert("No alarm set");
        }
      }

      function playAlarmSound() {
        alarmSound.play();
      }

      updateTime();
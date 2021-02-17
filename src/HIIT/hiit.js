
$(document).ready(function() {
  $('button#start').on('click', function (event) {
    event.preventDefault();
    const eTimer = () => {
      const timerElement = document.getElementById("e-timer");
      const progressBar = document.getElementById("e-progressBar")
      let timerCounter = progressBar.max;
      const interval = setInterval(() => {
        if (timerCounter === 0) {
          $('#exercise-div').toggle();
          $('#rest-div').toggle();
          rTimer();
          clearInterval(interval);
        }
        timerCounter = timerCounter - 1;
            
        timerElement.innerText = timerCounter + "s";
        progressBar.value = timerCounter;
      }, 1000);
    }
    
    const rTimer = () => {
      const timerElement = document.getElementById("r-timer");
      const progressBar = document.getElementById("r-progressBar")
      let timerCounter = progressBar.max;
      const interval = setInterval(() => {
        if (timerCounter === 0 && sets === 1) {
          $('.u-center-text').html(`You've completed ${totalSets} sets`)
          $('#rest-div, #exercise-div').hide();
          $('#complete-div').show();
        } else if (timerCounter === 0) {
            sets -- 
            $('#exercise-div').toggle();
            $('#rest-div').toggle();
            eTimer();
            clearInterval(interval);
        }
        timerCounter = timerCounter - 1;
        
        timerElement.innerText = timerCounter + "s";
        progressBar.value = timerCounter;
      }, 1000);
    }
    const exercise = $('#exercise').val()
    const rest = $('#rest').val();
    const totalSets = $('#sets').val()
    let sets = parseInt($('#sets').val());
    
    
    $('#e-timer').html(exercise)
    $('#r-timer').html(rest)
    document.getElementById("e-progressBar").max = exercise ;
    document.getElementById("e-progressBar").value = exercise;
    document.getElementById("r-progressBar").max = rest ;
    document.getElementById("r-progressBar").value = rest;
    $('#exercise-div').toggle();
    $('#setup').toggle();
    eTimer();
  })
});
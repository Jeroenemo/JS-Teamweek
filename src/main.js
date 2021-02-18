import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './css/hiit-styles.css';
import ExerciseService from './services/exercise-service.js';


function addImages(imagesArray) {
  imagesArray.forEach(function(imageObject) {
    $('.exercise-description').append(`<img class="workout-image" src="${imageObject.image}">`);
  });
}


function getExercises(response) {
  for (let i = 0; i < response.results.length; i++) {
    if (response.results[i].description.length > 20) {
      $('#unordered').append(`<li id='exercise-${response.results[i].id}'>${response.results[i].name}</li>`);
      $("#exercise-list").on("click", `#exercise-${response.results[i].id}`, function() {
        $('.exercise-description').html(`<h2>${response.results[i].name}</h2><p>${response.results[i].description}</p>`);
        addImages(response.results[i].images);
      });
    }
  }
}

$('form#category-select').submit(function(event) {
  event.preventDefault();
  $('#exercise-header').hide();
  $('#unordered').html("");
  $('.exercise-description').html("");
  const categoryUrl = `&category=${$('#category').val()}`;
  (async function() {
    const response = await ExerciseService.getExercise(categoryUrl);
    getExercises(response);
    $('#exercise-header').show();
  })();
});

//HIIT LOGIC
$('button#start').on('click', function(event) {
  event.preventDefault();
  const exerciseTimer = () => {
    const timerElement = document.getElementById("exercise-timer");
    const progressBar = document.getElementById("exercise-progressBar");
    let timerCounter = progressBar.max;
    const interval = setInterval(() => {
      if (timerCounter === 0) {
        $('#exercise-div').toggle();
        $('#rest-div').toggle();
        clearInterval(interval);
        restTimer();
        timerCounter = progressBar.max + 1;
      }
      timerCounter = timerCounter - 1;

      timerElement.innerText = timerCounter;
      progressBar.value = timerCounter;
    }, 1000);
  };

  const restTimer = () => {
    const timerElement = document.getElementById("rest-timer");
    const progressBar = document.getElementById("rest-progressBar");
    let timerCounter = progressBar.max;
    const interval = setInterval(() => {
      if (timerCounter === 0 && sets === 1) {
        $('.complete-text').html(`You've completed ${totalSets} sets`);
        $('#rest-div, #exercise-div').hide();
        $('#complete-div').show();
      } else if (timerCounter === 0) {
        sets--;
        $('#exercise-div').toggle();
        $('#rest-div').toggle();
        clearInterval(interval);
        exerciseTimer();
        timerCounter = progressBar.max +1;
      }
      timerCounter = timerCounter - 1;

      timerElement.innerText = timerCounter;
      progressBar.value = timerCounter;
    }, 1000);
  };
  const exercise = $('#exercise').val();
  const rest = $('#rest').val();
  const totalSets = $('#sets').val();
  let sets = parseInt($('#sets').val());


  $('#exercise-timer').html(exercise);
  $('#rest-timer').html(rest);
  document.getElementById("exercise-progressBar").max = exercise;
  document.getElementById("exercise-progressBar").value = exercise;
  document.getElementById("rest-progressBar").max = rest;
  document.getElementById("rest-progressBar").value = rest;
  $('#exercise-div').toggle();
  $('#setup').toggle();
  exerciseTimer();
});

//sexyDoll logic
$(document).ready(function() {
  $(".maleDiv").hide();
  $(".femaleDiv").hide();
  $('.bodyImg').click(function() {
    const gender = $('input:radio[name=gender]:checked').val();
    if (gender === "male") {
      $(".maleDiv").show();
      $(".femaleDiv").hide();
    } else {
      $(".femaleDiv").show();
      $(".maleDiv").hide();
    }
  });

  function showExercise(response) {
    if (response.count) {
      for (let i = 0; i < response.results.length; i++) {
        $('.output').append(`<li class="description" id="${response.results[i].id}">${response.results[i].name}</li>`);
        $('.output').on('click', `#${response.results[i].id}`, function() {
          $('.desc').empty();
          $('.desc').html(`${response.results[i].description}`);
        });
      }
    }
  }


  $('.show').click(function() {
    const target = `&muscles=${$(this).attr('id')}`;
    ExerciseService.getExercise(target)
      .then(function(response) {
        $('.output, .desc').empty();
        showExercise(response);
      });
  });
});
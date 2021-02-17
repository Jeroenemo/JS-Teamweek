import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './HIIT/hiit-styles.css';
import ExerciseService from './services/exercise-service.js';


function addImages(imagesArray) {
  imagesArray.forEach(function(imageObject) {
    $('.exercise-description').append(`<img src="${imageObject.image}">`);
  });
}


function getExercises(response){
  for(let i = 0; i < response.results.length; i++){
    if (response.results[i].description.length > 20) {
      $('#exercise-list-contents').append(`<p id='exercise-${response.results[i].id}'>${response.results[i].name}</p>`);
      $("#exercise-list").on("click",`#exercise-${response.results[i].id}`, function() {
        $('#exercise-list').slideToggle();
        $('.exercise-description').html(`<h2>${response.results[i].name}</h2><p>${response.results[i].description}</p>`);
        addImages(response.results[i].images);
        $('.exercise-description').slideToggle();
      });
    }
  }
}

$('form#category-select').submit(function(event) {
  event.preventDefault();
  $('#exercise-list-contents').html("");
  const categoryUrl = `&category=${$('#category').val()}`;
  (async function() {
    const response = await ExerciseService.getExercise(categoryUrl);
    getExercises(response);
  })();
  
});


$('button#start').on('click', function (event) {
  event.preventDefault();
  const eTimer = () => {
    const timerElement = document.getElementById("e-timer");
    const progressBar = document.getElementById("e-progressBar");
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
  };
  
  const rTimer = () => {
    const timerElement = document.getElementById("r-timer");
    const progressBar = document.getElementById("r-progressBar");
    let timerCounter = progressBar.max;
    const interval = setInterval(() => {
      if (timerCounter === 0 && sets === 1) {
        $('.u-center-text').html(`You've completed ${totalSets} sets`);
        $('#rest-div, #exercise-div').hide();
        $('#complete-div').show();
      } else if (timerCounter === 0) {
        sets --; 
        $('#exercise-div').toggle();
        $('#rest-div').toggle();
        eTimer();
        clearInterval(interval);
      }
      timerCounter = timerCounter - 1;
      
      timerElement.innerText = timerCounter + "s";
      progressBar.value = timerCounter;
    }, 1000);
  };
  const exercise = $('#exercise').val();
  const rest = $('#rest').val();
  const totalSets = $('#sets').val();
  let sets = parseInt($('#sets').val());
  
  
  $('#e-timer').html(exercise);
  $('#r-timer').html(rest);
  document.getElementById("e-progressBar").max = exercise ;
  document.getElementById("e-progressBar").value = exercise;
  document.getElementById("r-progressBar").max = rest ;
  document.getElementById("r-progressBar").value = rest;
  $('#exercise-div').toggle();
  $('#setup').toggle();
  eTimer();
});


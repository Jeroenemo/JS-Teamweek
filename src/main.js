import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExerciseService from './services/exercise-service.js';

function getExercises(response) {
  response.results.forEach(function(exerciseObject) {
    $('#exercise-list').append(`<p>${exerciseObject.name}</p>`);
  });
}

$('form#category-select').submit(function(event) {
  event.preventDefault();
  $('#exercise-list').html("");
  const categoryUrl = `&category=${$('#category').val()}`;
  (async function() {
    const response = await ExerciseService.getExercise(categoryUrl);
    getExercises(response);
    console.log(response);
  })();
});
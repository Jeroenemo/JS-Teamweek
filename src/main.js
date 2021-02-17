import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
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
    console.log(response);
  })();
});
export default class ExerciseService {
  static getExercise(target) {
    return fetch(`https://wger.de/api/v2/exercise/?language=2${target}`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json();
      })
      .catch(function(error) {
        return Error(error);
      });
  }
}
export default class MuscleService {
  static getMuscle(target) {
    return fetch(`https://wger.de/api/v2/exercise/?muscles=${target}&?language=2`)
      .then(function(response) {
        if (!response.ok) {
          throw Error(response.status);
        }
        return response.json()
      })
      .catch(function(error) {
        return Error(error);
      })
  }
}
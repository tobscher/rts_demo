var matchServices = angular.module('matchServices', ['ngResource']);

matchServices.factory('Match', ['$resource',
function($resource){
  return $resource('/api/matches', {}, {
    query: {method:'GET', isArray:true}
  });
}]);

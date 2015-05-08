angular.module('learningfuze.filters', [])
.filter('decode', function(){
  var lessthan = /&#60;/g;
  var greaterthan = /&#62;/g;
  return function(data){
    return String(data).replace(lessthan, '<').replace(greaterthan, '>');
  };  
})
.filter('trusted', ['$sce', function($sce){
  return function(text) {
    return $sce.trustAsHtml(text);
  };
}]);
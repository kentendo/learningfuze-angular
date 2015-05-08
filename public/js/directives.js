angular.module('learningfuze.directives', [])
.directive('menu', function(){
  return {
    restrict: 'A',
    templateUrl: 'templates/menu.html',
    controller: function($scope){
      this.onClick = function(sequenceIndex, taskIndex){
        $scope.setSequenceTask(sequenceIndex, taskIndex);
      };
    },
    controllerAs: 'menuController'
  };
})
.directive('menuSequence', function(){
  return {
    replace:true,
    restrict: 'E',
    templateUrl: 'templates/menu-sequence.html'
  };
})
.directive('lessonBoard', function(){
  return {
    restrict: 'A',
    templateUrl: 'templates/lesson-board.html'
  };
});

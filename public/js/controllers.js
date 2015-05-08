angular.module('learningfuze.controllers', ['learningfuze.config', 'learningfuze.filters'])
.controller('LessonController', ['$scope', '$filter', '$timeout', 'LessonConfig', function($scope, $filter, $timeout,LessonConfig){
  
  $scope.output = LessonConfig.defaultOutput;
  $scope.currentSequenceIndex;
  $scope.currentSequence;
  $scope.currentTaskIndex;
  $scope.currentTask;
  $scope.markers = [];
   
  $scope.setSequenceTask = function(sequenceIndex, taskIndex){
    $scope.setSequence(sequenceIndex);
    $scope.setTask(taskIndex);
  };
  
  $scope.setSequence = function(sequenceIndex){
    if(!$scope.set) return;
    if(!$scope.set.sequences[sequenceIndex]) return;
    $scope.currentSequenceIndex = sequenceIndex;
    $scope.currentSequence = $scope.set.sequences[sequenceIndex];
  };
  
  $scope.setTask = function(taskIndex){
    // if the currentSequence hasn't been set we need to exit
    if(!$scope.currentSequence) return;
    // clear the editor and set focus
    $scope.editor.setValue('');
    // check if this task exists
    if(!$scope.set.sequences[$scope.currentSequenceIndex].tasks[taskIndex]) return;
    $scope.currentTaskIndex = taskIndex;
    $scope.currentTask = $scope.currentSequence.tasks[taskIndex];
   
    // set focus on the editor to be nice
    if($scope.currentTask.options.type === 'code'){
      $timeout(function(){
        // hack to delay this
        $scope.editor.focus();
      });      
    }
    $scope.updateOutput();
  };
  
  $scope.updateOutput = function(){
    if(!$scope.currentTask) return;
    // always show at least one line
    var lines = $scope.currentTask.lines;
    var validLines = $scope.getValidLineCount();
    // always using an array
    if(typeof lines === 'string') lines = [lines];
    // output the lines with a br tag between them
    $scope.output = lines.slice(0, validLines+1).join('<br>');
  };
  
  $scope.updateEditor = function(){
    if(!$scope.currentTask) return;
    // need to load this class
    var Range = ace.require('ace/range').Range;
    // clear markers
    
    for(var j in $scope.markers)
      $scope.editor.session.removeMarker($scope.markers[j]);
    $scope.markers = [];
    
    var len = $scope.editor.session.getLength();
    for(var i = 0; i < len; i++){
      var lineClass = ($scope.isValidLine(i)) ? 'ace_valid_line' : 'ace_invalid_line';
      // need to store this marker id to clear them out later
      var markerId = $scope.editor.session.addMarker(new Range(i, 0, i, 10), lineClass, "fullLine");
      $scope.markers.push(markerId);
    }
  };
  
  $scope.getValidLineCount = function(){
    var count = 0;
    for(var i in $scope.currentTask.lines)
      if($scope.isValidLine(i)) count++;
    return count;
  };
  
  $scope.isValidLine = function(i){
    return $filter('decode')($scope.currentTask.lines[i]) === $scope.editor.session.getLine(i);
  };
  
  $scope.isCurrentTaskComplete = function(){
    // info tasks are always done
    if($scope.currentTask.options.type === 'info') return true; 
    // if all the lines are valid then task is complete
    if($scope.getValidLineCount() == $scope.currentTask.lines.length) return true;
    return false;
  };
  
  $scope.isCurrentSequenceComplete = function(){
    for(var i in $scope.currentSequence.tasks)
      if(!$scope.currentSequence.tasks[i].complete) 
        return false;
    return true;
  };
  
  $scope.update = function(){
    $scope.updateOutput();
    $scope.updateEditor();
  };
  
  $scope.onTaskComplete = function(){
    $scope.currentSequence.tasks[$scope.currentTaskIndex].complete = true;
    if($scope.currentTask.options.type === 'code')
      confirm(LessonConfig.taskCompleteMessage);
    
    // check if Sequence is complete
    if($scope.isCurrentSequenceComplete())
      $scope.onSequenceComplete();
    else 
      $scope.setTask($scope.currentTaskIndex + 1);
    
  };
  
  $scope.onSequenceComplete = function(){
    $scope.currentSequence.complete = true;
    confirm(LessonConfig.sequenceCompleteMessage);  
  };
  
  // event from ace editor
  $scope.onAceChange = function(){
    $scope.update();
  };
  
  // body keyup handler
  $scope.onKeyUp = function(event){
    // haven't picked a task yet let's just pick the first task in the first sequence
    if(!$scope.currentTask) return $scope.setSequenceTask(0, 0);
    if($scope.isCurrentTaskComplete())
      $scope.onTaskComplete();
  };
  
}]);

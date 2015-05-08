angular.module('learningfuze.services', [])
.provider('LessonService', function(){
  this.lessonUrl = 'sequence_sample.json.txt';
  this.setLessonUrl = function(newUrl) {
    if(newUrl) this.lessonUrl = newUrl;
  };
  
  this.$get = function($http) {
    var self = this;
    var service = {
      getLesson: function(){
        return $http({
          method: 'get',
          url: self.lessonUrl
        });
      }
    };
    return service;
  };
});

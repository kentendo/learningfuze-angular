angular.module('learningfuze.config', [])
.constant('LessonConfig', {
  'editorTheme': 'ace/theme/eclipse',
  'lessonUrl': 'sequence_sample.json.txt',
  'defaultSet': 0,
  'defaultOutput': 'Choose the Intro task from a sequence dropdown above.',
  'taskCompleteMessage': 'You did it!',
  'sequenceCompleteMessage': 'You really did it!'
});
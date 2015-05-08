angular.module('learningfuze.config', [])
.constant('LessonConfig', {
  'editorTheme': 'ace/theme/eclipse',
  'lessonUrl': 'https://gist.githubusercontent.com/thireven/841b585de43a7d708bff/raw/abe8f8ceacff3817fb3ee5bf8219408819563629/sequence_sample.json',
  'defaultSet': 0,
  'defaultOutput': 'Choose the Intro task from a sequence dropdown above.',
  'taskCompleteMessage': 'Task complete!',
  'sequenceCompleteMessage': 'Sequence complete!'
});
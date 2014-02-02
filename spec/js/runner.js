(function() {
  var jasmineEnv = jasmine.getEnv();

  var tapReporter = new jasmine.TapReporter();
  jasmineEnv.addReporter(tapReporter);
  jasmineEnv.execute();

})();
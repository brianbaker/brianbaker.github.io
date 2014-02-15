// layer file for io_github_brianbaker_helloworld app
define('io_github_brianbaker_helloworld-layer', function() {

  define('jquery-1.11.0', ['//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'], function(jQuery) {
    return jQuery.noConflict(true);
  });
  
  console.log('a');
  define('io_github_brianbaker_helloworld', [
    'F2/Events',
    'F2/Constants',
    'jquery-1.11.0'
  ], function(Events, Constants, $) {
  console.log('b');
    return function() {
      return {
        init: function() {
          console.log(Events, Constants, $);
        },
        dispose: function() {
        }
      };
    };
  });
  console.log('c');
});

// layer file for io_github_brianbaker_helloworld app
define('io_github_brianbaker_helloworld-layer', function() {

  define('jquery-1.11.0', ['//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'], function(jQuery) {
    return jQuery.noConflict(true);
  });

});

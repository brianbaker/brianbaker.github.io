define([
  'F2/Events',
  'F2/Constants',
  'jquery-1.11.0'
], function(Events, Constants, $) {

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

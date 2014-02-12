define([
  'F2/Events',
  'F2/Constants'
], function(Events, Constants) {

  return function() {
    return {
      init: function() {
        console.log(Events, Constants);
      },
      dispose: function() {
      }
    };
  };
});

define('F2/Events', [], function() { 
    return {
        emit: function() { }
    };
});

define('F2/Constants', [], function() {
    return {
        foo: 'bar'
    };
});

define('F2/Container', [
    'F2/Events',
    'F2/Constants'
], function(Events, Constants) {
    return {
        load: function() { }
    }
});

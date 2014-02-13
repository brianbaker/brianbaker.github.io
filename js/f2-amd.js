// F2 Layer that can be require'd first and then afterwards all of the modules within
// will be loaded and ready to go for the App and Container to use.
define('F2', function() {
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
		var _apps = {};
		
		return {
			load: function(config) {
				require([config.manifestUrl], function(manifest) {
					console.log(manifest);
					var dependencies = [].concat(manifest.scripts);
					dependencies.push(manifest.appClass);
					require(dependencies, function() {
						console.log(arguments);
					});
				});
			}
		}
	});
});

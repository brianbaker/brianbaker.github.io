// F2 Layer that can be require'd first and then afterwards all of the modules within
// will be loaded and ready to go for the App and Container to use.
define('F2', function() {
	
	// https://gist.github.com/millermedeiros/1255010
	define('f2-json', ['//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.js'], function(text){
	
		var jsonParse = (typeof JSON !== 'undefined' && typeof JSON.parse === 'function')? JSON.parse : function(val){
				return eval('('+ val +')'); //quick and dirty
			},
			buildMap = {};
		
		//API
		return {
		
			load : function(name, req, onLoad, config) {
				text.get(req.toUrl(name), function(data){
					if (config.isBuild) {
						buildMap[name] = data;
						onLoad(data);
					} else {
						onLoad(jsonParse(data));
					}
				});
			},
		
			//write method based on RequireJS official text plugin by James Burke
			//https://github.com/jrburke/requirejs/blob/master/text.js
			write : function(pluginName, moduleName, write){
				if(moduleName in buildMap){
					var content = buildMap[moduleName];
					write('define("'+ pluginName +'!'+ moduleName +'", function(){ return '+ content +';});\n');
				}
			}
		
		};
	});
	
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
				require(['f2-json!' + config.manifestUrl], function(manifest) {
					console.log('Manifest', manifest);
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

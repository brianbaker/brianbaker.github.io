// F2 Layer that can be require'd first and then afterwards all of the modules within
// will be loaded and ready to go for the App and Container to use.
define('F2', function() {
	
	/** @license
	 * RequireJS plugin for async dependency load like JSONP and Google Maps
	 * Author: Miller Medeiros
	 * Version: 0.1.1 (2011/11/17)
	 * Released under the MIT license
	 */
	define('jsonp', function(){

		var DEFAULT_PARAM_NAME = 'callback',
			_uid = 0;
		
		function injectScript(src){
			var s, t;
			s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = src;
			t = document.getElementsByTagName('script')[0]; t.parentNode.insertBefore(s,t);
		}
		
		function formatUrl(name, id){
			var paramRegex = /!(.+)/,
				url = name.replace(paramRegex, ''),
				param = (paramRegex.test(name))? name.replace(/.+!|:.+/g, '') : DEFAULT_PARAM_NAME;
			url += (url.indexOf('?') < 0)? '?' : '&';
			return url + param +'='+ id;
		}
		
		function uid(name) {
			var paramRegex = /!(.+)/,
				url = name.replace(paramRegex, ''),
				id =  ('F2_' + Math.floor(Math.random() * 1000000));
				
			if (paramRegex.test(name)) {
				name = name.replace(/.+!/, '');
				id = name.indexOf(':') < 0 ? id : name.split(':')[1];
			}
			
			return id;
		//	_uid += 1;
		//	return '__async_req_'+ _uid +'__';
		}
		
		return{
			load : function(name, req, onLoad, config){
				if(config.isBuild){
					onLoad(null); //avoid errors on the optimizer
				}else{
					var id = uid(name);
					//create a global variable that stores onLoad so callback
					//function can define new module after async load
					window[id] = onLoad;
					injectScript(formatUrl(name, id));
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
				var manifestUrl = config.manifestUrl;
				manifestUrl += (config.jsonpCallback
					? ('!callback:' + config.jsonpCallback)
					: '');
				
				// grab the manifest
				require(['jsonp!' + manifestUrl], function(manifest) {
					
					require.config({paths: manifest.scripts});
					
					var dependencies = [];
					for (var s in manifest.scripts) {
						dependencies.push(s);
					}
					console.log(dependencies);
					
					// load the layers
					require(dependencies, function() {
						console.log('Dependency Arguments:', arguments);
						
						// load the app
						//require([config.id], function(app) {
						//	console.log(app);
						//});
					});
				});
			}
		}
	});
});

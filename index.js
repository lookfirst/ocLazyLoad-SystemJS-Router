import 'angular';
import 'angular-ui-router';
import 'ui-router-extras/release/modular/ct-ui-router-extras.core';
import 'ui-router-extras/release/modular/ct-ui-router-extras.future';
import 'oclazyload';

module.exports = function(angularModule, futureRoutes) {

	angularModule.requires.push('ui.router');
	angularModule.requires.push('ct.ui.router.extras.core');
	angularModule.requires.push('ct.ui.router.extras.future');
	angularModule.requires.push('oc.lazyLoad');

	var RouterConfig = ['$ocLazyLoadProvider', '$stateProvider', '$futureStateProvider',
		function($ocLazyLoadProvider, $stateProvider, $futureStateProvider) {

			$futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState',
				function($q, $ocLazyLoad, futureState) {

					var def = $q.defer();

					System.import(futureState.src).then(loaded => {
						var newModule = loaded;
						if (!loaded.name) {
							var key = Object.keys(loaded);
							newModule = loaded[key[0]];
						}

						$ocLazyLoad.load(newModule).then(function() {
							def.resolve();
						}, function(err) {
							throw err;
						});
					});

					return def.promise;
				}
			]);

			futureRoutes.forEach(function(r) {
				$futureStateProvider.futureState(r);
			});
		}
	];

	return RouterConfig;
}

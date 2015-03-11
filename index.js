System.register(["angular", "angular-ui-router", "ui-router-extras/release/modular/ct-ui-router-extras.core", "ui-router-extras/release/modular/ct-ui-router-extras.future", "oclazyload"], function (_export) {
	return {
		setters: [function (_angular) {}, function (_angularUiRouter) {}, function (_uiRouterExtrasReleaseModularCtUiRouterExtrasCore) {}, function (_uiRouterExtrasReleaseModularCtUiRouterExtrasFuture) {}, function (_oclazyload) {}],
		execute: function () {
			"use strict";

			_export("default", function (angularModule, futureRoutes) {

				angularModule.requires.push("ui.router");
				angularModule.requires.push("ct.ui.router.extras.core");
				angularModule.requires.push("ct.ui.router.extras.future");
				angularModule.requires.push("oc.lazyLoad");

				var RouterConfig = ["$ocLazyLoadProvider", "$stateProvider", "$futureStateProvider", function ($ocLazyLoadProvider, $stateProvider, $futureStateProvider) {

					$futureStateProvider.stateFactory("load", ["$q", "$ocLazyLoad", "futureState", function ($q, $ocLazyLoad, futureState) {

						var def = $q.defer();

						System["import"](futureState.src).then(function (loaded) {
							var newModule = loaded;
							if (!loaded.name) {
								var key = Object.keys(loaded);
								newModule = loaded[key[0]];
							}

							$ocLazyLoad.load(newModule).then(function () {
								def.resolve();
							}, function (err) {
								throw err;
							});
						});

						return def.promise;
					}]);

					futureRoutes.forEach(function (r) {
						$futureStateProvider.futureState(r);
					});
				}];

				return RouterConfig;
			});
		}
	};
});

'use strict';

module.exports = function (app) {
	app.directive('createMakeupDirective', function() {
		return {
			restrict: 'A',
			templateUrl: '/templates/makeups/create_makeup_directive.html',
			replace: true
		};
	});
};
'use strict';

module.exports = function (app) {
	app.directive('dummyDirective', function() { //has to be camelCase, dont name it w ng
		return {
			restrict: 'A', //attribute 
			template: '<p>{{someVal}}</p><input type="text" data-ng-model="someVal">',
			scope: {}
		};
	});
};
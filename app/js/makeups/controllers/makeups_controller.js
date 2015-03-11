'use strict';

module.exports = function(app) {
	app.controller('makeupsController', ['$scope', 'resource', function($scope, resource) {
		
		$scope.makeups = [];

		var Makeup = resource('makeups');

		$scope.getAll = function() {
			Makeup.getAll(function(data) {
				$scope.makeups = data;
			});
		};

		$scope.create = function(makeup) {
			Makeup.create(makeup, function(data) {
				$scope.makeups.push(data);
			});
		};

		$scope.save = function(makeup) {
			Makeup.save(makeup, function() {
				makeup.editing = false;
			});
		};

		$scope.remove = function(makeup) {
			Makeup.remove(makeup, function() {
				$scope.makeups.splice($scope.makeups.indexOf(makeup), 1);
			});
		};
		
		$scope.editToggle = function(makeup) {
			if(makeup.editing) {
				makeup.brand = makeup.oldBrand;
				makeup.editing = false;
			} else {
				makeup.oldBrand = makeup.brand;
				makeup.editing = true;
			}
		};
	}]);
};



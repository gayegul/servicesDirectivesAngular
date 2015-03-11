'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('makeups controller', function() {
	var $ControllerConstructor;
	var $httpBackend;
	var $scope;

	beforeEach(angular.mock.module('makeupsApp'));

	beforeEach(angular.mock.inject(function($rootScope, $controller) {
		$scope = $rootScope.$new();
		$ControllerConstructor = $controller;
	}));

	it('should be able to create a controller', function() {
		var makeupsController = $ControllerConstructor('makeupsController', {$scope: $scope});
		expect(typeof makeupsController).toBe('object');
		expect(Array.isArray($scope.makeups)).toBe(true);
	});

	describe('REST request', function() {
		beforeEach(angular.mock.inject(function(_$httpBackend_) {
			$httpBackend = _$httpBackend_;
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should have a getAll function', function() {
			$httpBackend.expectGET('/api/v1/makeups').respond(200, [{brand: 'test brand'}]); //brand yerine noteBody
			
			var makeupsController = $ControllerConstructor('makeupsController', {$scope: $scope});
			$scope.getAll();
			$httpBackend.flush();

			expect($scope.makeups[0].brand).toBe('test brand');

		});	

		it('should be able to save', function() {
			$httpBackend.expectPOST('/api/v1/makeups').respond(200, {_id: 1, brand: 'test brand'});
			
			//$scope.makeups = [];
			var makeupsController = $ControllerConstructor('makeupsController', {$scope: $scope});
			$scope.create({brand: 'test brand'});
			$httpBackend.flush();

			expect($scope.makeups[0]._id).toBe(1);
		});

		it('should be able to save makeup changes', function() {
			$httpBackend.expectPUT('/api/v1/makeups/1').respond(200);

			var makeupsController = $ControllerConstructor('makeupsController', {$scope: $scope});
			var makeup = {brand: 'test brand', _id: 1, editing: true};
			$scope.save(makeup);
			$httpBackend.flush();

			expect(makeup.editing).toBe(false);
		});

		it('should be able to delete a makeup', function() {
			$httpBackend.expectDELETE('/api/v1/makeups/1').respond(200);

			$ControllerConstructor('makeupsController', {$scope: $scope});
			var makeup = {brand: 'test brand', _id: 1, editing: true};
			$scope.makeups.push(makeup);
			$scope.remove(makeup);
			$httpBackend.flush();

			expect($scope.makeups.length).toBe(0);
		});
	});
});


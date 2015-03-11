'use strict';

require('angular/angular');

var makeupsApp = angular.module('makeupsApp', []);

//services
require('./services/resource_service')(makeupsApp);

//controllers
require('./makeups/controllers/makeups_controller')(makeupsApp);

//directives
require('./directives/dummy_directive')(makeupsApp);
require('./directives/create_resource_directive')(makeupsApp);
require('./makeups/directives/create_makeup_directive_one')(makeupsApp);
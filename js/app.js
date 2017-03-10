//主模块 用来调用其他模块
(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular
		.module('todoApp',[
			'todoApp.dataService',
			'todoApp.controller'
			])
		// .controller('TodoController',['$scope','$location',TodoController])


})(angular);

(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular
		.module('todoApp',[])
		.controller('TodoController',['$scope',TodoController])

	function TodoController($scope){
		var vm = $scope;

		// 展示任务列表
		var task = [
			{id:0,name:'抽烟',isCompleted:false},
			{id:1,name:'喝酒',isCompleted:true},
			{id:1,name:'烫头',isCompleted:true}
		]

		vm.taskList = task
	}
})(window);

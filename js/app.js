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
			{id:2,name:'烫头',isCompleted:true},
			{id:3,name:'唱歌',isCompleted:false},
			{id:7,name:'旅游',isCompleted:true}
		]

		vm.taskList = task;
		vm.newTask = '';


		var id = 0;
		vm.add = function(){
			if(vm.newTask.trim() === '' ){
				return;
			}
			//判断id
			var len = vm.taskList.length;
			if( len === 0 ){
				id = 1;
			}else{
				id = vm.taskList[len-1].id+1;
			}
			vm.taskList.push(
					{id:id,name:vm.newTask,isCompleted:false}
				)
			vm.newTask = '';
			console.log(len)
		}
		vm.remove = function(id){
			vm.taskList.forEach(function(v,i){
				if(v.id === id){
					vm.taskList.splice(i,1)
				}
			})
		}
		vm.edit = function( id ){
			vm.editId = id;
		}
		vm.upload = function( id ){
			vm.editId = null;
		}
	}
})(window);

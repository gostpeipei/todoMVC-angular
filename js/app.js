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
		vm.allCompleted = false;
		vm.isShow = false;

		//添加功能
		vm.add = function(){
			if(vm.newTask.trim() === '' ){
				return;
			}
			var id = 0;
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
		}

		//删除功能
		vm.remove = function(id){
			vm.taskList.forEach(function(v,i){
				if(v.id === id){
					vm.taskList.splice(i,1)
				}
			})
		}


		//编辑功能
		vm.edit = function( id ){
			vm.editId = id;
		}
		vm.upload = function( id ){
			vm.editId = null;
		}


		//全选功能
		// 一 change事件方法
		// vm.allchecked = function(){
		// 	vm.taskList.forEach(function(v,i){
		// 		v.isCompleted = vm.allCompleted
		// 	})
		// }

		//二  监视
		vm.$watch('allCompleted',function( newV,oldV ){
			if( newV === oldV ){
				return;
			}
			vm.taskList.forEach(function(v,i){
				v.isCompleted = newV
			})
		})

		//清除已完成任务
		//有未完成的任务,就让按钮显示
		vm.$watch('taskList',function( newV,oldV ){
			var temp = false;
			for(var i=0;i<vm.taskList.length;i++){
				if(vm.taskList[i].isCompleted){
					temp = true;
					break;
				}
			}
			vm.isShow = temp;
		},true)
		vm.clearCompleted = function(){
			//保存未完成的任务
			var temp = [];
			for(var i=0;i<vm.taskList.length;i++){
				if( !vm.taskList[i].isCompleted ){
					temp.push(vm.taskList[i])
				}
			}
			vm.taskList = temp;
		}
	}
})(window);

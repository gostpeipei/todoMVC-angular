(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular
		.module('todoApp',[])
		.controller('TodoController',['$scope','$location',TodoController])

	function TodoController($scope,$location){
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
		//一 监视
		//
		// vm.isShow = false;
		// vm.$watch('taskList',function( newV,oldV ){
		// 	var temp = false;
		// 	for(var i=0;i<vm.taskList.length;i++){
		// 		if(vm.taskList[i].isCompleted){
		// 			temp = true;
		// 			break;
		// 		}
		// 	}
		// 	vm.isShow = temp;
		// },true)

		//二 isShow为函数时
		vm.isShow = function(){
			var temp = false;
			for(var i=0;i<vm.taskList.length;i++){
				if(vm.taskList[i].isCompleted){
					temp = true;
					break;
				}
			}
			return temp;
		}
		//清除完成的任务
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

		//显示未完成的任务数
		vm.getUncompleted = function(){
			var count = 0;
			vm.taskList.forEach(function(value){
				if( !value.isCompleted ){
					count++;
				}
			})
			return count;
		}

		//切换不同任务的显示状态
		//利用过滤器
		// vm.isSelected = { isCompleted : undefined } //全部匹配
		// vm.isSelected = { isCompleted : false } //匹配未完成的
		// vm.isSelected = { isCompleted : true } //匹配完成的
		// vm.showAll = function(){
		// 	vm.isSelected = { isCompleted : undefined }
		// }
		// vm.showUncompleted = function(){
		// 	vm.isSelected = { isCompleted : false }
		// }
		// vm.showCompleted = function(){
		// 	vm.isSelected = { isCompleted : true }
		// }
		//给按钮加类


		//刷新仍保存显示状态
		//根据url变化 hash值不同,来展示不同状态
		//不能通过location.hash直接获取,需要注入$location
		//$location.url() 获取url中#后面的字符串
		//$watch 只能监视$scope中的属性
		$scope.location = $location;
		vm.$watch('location.url()',function( newV,oldV ){
			console.log(newV.slice(1));
			// if( newV.slice(1) === '' ){
			// 	vm.isSelected = { isCompleted : undefined }
			// }
			// if( newV.slice(1) === 'active' ){
			// 	vm.isSelected = { isCompleted : false }
			// }
			// if( newV.slice(1) === 'completed' ){
			// 	vm.isSelected = { isCompleted : true }
			// }

			//有监事时候  点击的事件就可以取消了
			switch (newV){
				case '/':
				vm.isSelected = { isCompleted : undefined };
				break;
				case '/active':
				vm.isSelected = { isCompleted : false };
				break;
				case '/completed':
				vm.isSelected = { isCompleted : true };
				break;
			}
		})
	}
})(window);

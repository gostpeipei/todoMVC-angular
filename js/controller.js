'use strict';
(function(angular){
	angular
		.module('todoApp.controller',[])
		.controller('TodoController',['$scope','$location','DataService',TodoController])

		function TodoController( $scope,$location,DataService ){
			var vm = $scope;

			//添加任务
			vm.taskList = DataService.getData(); //通过方法获取
			vm.checkedAll = DataService.isAllCompleted(); //初始化全选按钮

			vm.newTask = '';
			vm.add = function(){
				if(vm.newTask === ''){
					return;
				}
				DataService.setData(vm.newTask);
				vm.checkedAll = DataService.isAllCompleted();
				vm.newTask = '';
			}

			//删除任务
			// vm.remove = DataService.remove;
			vm.remove = function( id ){
				DataService.remove(id);
				vm.checkedAll = DataService.isAllCompleted();
			}

			//修改任务
			vm.edit = function( id ){
				vm.editId = id;
			}
			vm.upload = function(){
				DataService.save()
				vm.editId = 0;
			}

			//全选任务
			vm.allCompleted = function(){
				DataService.allCompleted( vm.checkedAll )
				// DataService.save()
			}

			//保存单选状态
			vm.toggleItem = function(){
				vm.checkedAll = DataService.isAllCompleted();
				DataService.save()
			}

			//清除已完成的任务
			vm.show = function(){
				return DataService.show();
			}
			vm.clearCompleted = function(){
				DataService.clearCompleted();
				// vm.taskList = DataService.getData()
				vm.checkedAll = DataService.isAllCompleted();
			};


			//显示未完成任务数量
			vm.getUnCompleted = function(){
				return DataService.getUnCompleted();
			}
			//切换显示状态并记录,刷新不会变
			//引入$location
			//利用过滤
			vm.location = $location;
			vm.$watch('location.url()',function( newVal,oldVal ){
				switch (newVal){
					case '/':
						vm.completedStatus = { isCompleted: undefined };
						break;
					case '/active':
						vm.completedStatus = { isCompleted: false };
						break;
					case '/completed':
						vm.completedStatus = { isCompleted: true };
						break;
				}
			})
		}
})(angular)
'use strict';
(function(angular){
	angular
<<<<<<< HEAD
		.module('todoApp.controller',['ngRoute'])
		.config(['$routeProvider',function($routeProvider){
			$routeProvider
				.when('/:status?',{
					// templateUrl: 'routeTpl',
					templateUrl: './views/views.html',
					controller: 'TodoController'
				})
		}])
		.controller('TodoController',['$scope','$routeParams','DataService',TodoController])

		function TodoController( $scope,$routeParams,DataService ){
=======
		.module('todoApp.controller',[])
		.controller('TodoController',['$scope','$location','DataService',TodoController])

		function TodoController( $scope,$location,DataService ){
>>>>>>> 26289fb8c029f06d34feec13f9a6799ef6a83c18
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
<<<<<<< HEAD
				DataService.save()
=======
				// DataService.save()
>>>>>>> 26289fb8c029f06d34feec13f9a6799ef6a83c18
			}

			//保存单选状态
			vm.toggleItem = function(){
<<<<<<< HEAD
				console.log(1)
=======
>>>>>>> 26289fb8c029f06d34feec13f9a6799ef6a83c18
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
<<<<<<< HEAD
			// vm.location = $location;
			// vm.$watch('location.url()',function( newVal,oldVal ){
			// 	switch (newVal){
			// 		case '/':
			// 			vm.completedStatus = { isCompleted: undefined };
			// 			break;
			// 		case '/active':
			// 			vm.completedStatus = { isCompleted: false };
			// 			break;
			// 		case '/completed':
			// 			vm.completedStatus = { isCompleted: true };
			// 			break;
			// 	}
			// })
			// console.log($routeParams.status)
			switch ( $routeParams.status ){
				case 'active':
					vm.completedStatus = { isCompleted: false }
					break;
				case 'completed':
					vm.completedStatus = { isCompleted: true }
					break;
				default:
					vm.completedStatus = { isCompleted: undefined }
			}
=======
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
>>>>>>> 26289fb8c029f06d34feec13f9a6799ef6a83c18
		}
})(angular)
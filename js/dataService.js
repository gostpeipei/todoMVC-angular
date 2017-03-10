'use strict';
//提供数据服务
(function(angular){
	angular
		.module('todoApp.dataService',[])
		.service('DataService', ['$window',function($window){
			console.log('数据服务模块')

			// var list = [
			// 	{id:1,name:'旅游',isCompleted:false},
			// 	{id:2,name:'做饭',isCompleted:false},
			// 	{id:3,name:'跑步',isCompleted:true},
			// 	{id:4,name:'唱歌',isCompleted:true}
			// ]
			// 利用localstorage
			// 注入$window
			var localStorage = $window.localStorage;

			//获取数据
			var dataStr = localStorage.getItem('todo');
			var list = JSON.parse( dataStr ) || [];

			this.taskList = list;

			//添加数据
			this.setData = function( name ){
				var len = this.taskList.length;
				var id = 0;
				if( len === 0 ){
					id=1
				}else{
					id=this.taskList[len-1].id + 1;
				}
				this.taskList.push({id:id,name:name,isCompleted:false});
				this.save()
			}

			//保存数据
			this.save = function (){
				localStorage.setItem('todo',JSON.stringify( this.taskList ))
			}

			this.getData = function(){
				return this.taskList;
			}

			//删除数据
			this.remove = function( id ){
				var that = this
				this.taskList.forEach(function(value,index){
					if(value.id === id){
						that.taskList.splice(index,1)
					}
				})
				this.save()
			}

			//切换全选状态
			this.allCompleted = function( checkedAll ){
				this.taskList.forEach(function(val){
					val.isCompleted = checkedAll
				})
				this.save()
			}
			//全选按钮跟随下面变化
			this.isAllCompleted = function(){
				var count = 0;
				this.taskList.forEach(function(val){
					if( val.isCompleted ){
						count++
					}
				})
				// console.log('count:'+count)
				if( count === this.taskList.length && count !== 0 ){
					return true;
				}
				return false;
			}



			//清除已完成的任务
			//clear按钮显示
			this.show = function(){
				var temp = false;
				this.taskList.forEach(function( val,idx ){
					if( val.isCompleted ){
						temp = true;
					}
				})
				return temp;
			};
			this.clearCompleted = function(){
				var unCompleted = [];
				this.taskList.forEach(function( val,idx ){
					if( !val.isCompleted ){
						unCompleted.push(val)
					}
				})
				// this.taskList = unCompleted;

				//引用类型的问题 直接赋值会改变引用
				//先清空
				this.taskList.length = 0;
				[].push.apply(this.taskList,unCompleted);
				this.save();
			}

			//获取未完成任务数量
			this.getUnCompleted = function(){
				var count = 0;
				this.taskList.forEach(function(val,idx){
					if( !val.isCompleted ){
						count++
					}
				})
				return count;
			}	

			
		}])
})(angular)
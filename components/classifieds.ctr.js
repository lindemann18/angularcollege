(function(){
	'use strict';
	angular.module("ngClassifieds")
	.controller("classifiedsCtrl",function($scope,$state,$http,classifiedsFactory,$mdSidenav,$mdToast,$mdDialog){
		var vm 				= this;
		vm.openSidebar      = openSidebar;
		vm.closeSidebar     = closeSidebar;
		vm.saveClassified   = saveClassified;
		vm.editClassified   = editClassified;
		vm.showToast        = showToast;
		vm.saveEdit         = saveEdit;
		vm.getCategories    = getCategories;
		vm.deleteClassified = deleteClassified;
		vm.classifieds;
		vm.categories;
		vm.editing;
		vm.classified;

		/*classifiedsFactory.getClassifieds().then(function(classifieds){
			vm.classifieds = classifieds.data;
			vm.categories  = vm.getCategories($scope.classifieds);
		});*/

		vm.classifieds = classifiedsFactory.ref;
		vm.classifieds.$loaded().then(function(classifieds){
			vm.categories = getCategories(classifieds);
		});

		$scope.$on('newClassified',function(event,classified){
			console.log(event);
			vm.classifieds.$add(classified);
			//classified.id = vm.classifieds.length+1;
			//vm.classifieds.push(classified);
			showToast('Classified saved!');
			vm.classified = {};
		});

		$scope.$on("editSaved",function(event,message){
			showToast(message);
		});

		function openSidebar(){
			$state.go('classifieds.new');
		}	
		
		function closeSidebar(){
			$mdSidenav("left").close();
		}	


		function showToast (content)
		{
			$mdToast.show(
				$mdToast.simple().content(content).position('top, right')
				.hideDelay(3000)
			);
		}

		function saveClassified(classified){

			if(classified){
				classified.contact = contact;
				vm.classifieds.push(classified);
				vm.classified = {}; 
				vm.closeSidebar();	
				vm.showToast("classified Saved!");
				
			}//if
		}

		function editClassified(classified)
		{
			/*vm.editing = true;
			openSidebar();
			vm.classified = classified;*/
			$state.go("classifieds.edit",{id:classified.$id});
		}

		function saveEdit(){
			vm.editing = false;
			vm.classified = {};
			closeSidebar();
			$scope.showToast("classified Edited!");
		}

		function getCategories(classifieds){
			var categories = [];
			angular.forEach(classifieds,function(item){
				angular.forEach(item.categories,function(category){
					categories.push(category);
				});
			});
			return _.uniq(categories);
		}

		function deleteClassified(event,classified){
			var confirm = $mdDialog.confirm().title("Are you sure u want to delete: "+classified.title+"?")
			.ok("Yes")
			.cancel("No")
			.targetEvent(event);
			$mdDialog.show(confirm).then(function(){
				/*var index = vm.classifieds.indexOf(classified);
				vm.classifieds.splice(index,1);	*/
				vm.classifieds.$remove(classified);
				showToast("classified deleted!");
			},function(){

			});
			
		}
	});	
})();
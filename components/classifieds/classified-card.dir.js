(function(){
	'use strict';
	angular
	.module("ngClassifieds")
	.directive("classifiedCard",function(){
		return  {
			templateUrl:"components/classifieds/classified-card.tpl.html",
			scope:{
				classifieds:"=classifieds",
				classifiedsFilter:"=classifiedsFilter",
				category:"=category"
			},
			controller:ClassifiedCardController,
			controllerAs:"vm"
		}
		function ClassifiedCardController($state,$scope,$mdDialog)
		{
			var vm = this;
			vm.editClassified = editClassified;
			vm.deleteClassified = deleteClassified;

			// Editing
			function editClassified(classified)
			{
				/*vm.editing = true;
				openSidebar();
				vm.classified = classified;*/
				$state.go("classifieds.edit",{id:classified.$id});
			}
			// Delete
			function deleteClassified(event,classified)
			{
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
			function showToast (content)
			{
				$mdToast.show(
					$mdToast.simple().content(content).position('top, right')
					.hideDelay(3000)
				);
			}
		}//Classifeid Controller
	});
})();
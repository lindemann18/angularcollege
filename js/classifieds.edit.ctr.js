(function(){
	'use strict';
	angular.module('ngClassifieds')
	.controller('editClassifiedCtrl',function($scope,$mdSidenav,classifiedsFactory,$timeout,$state){
		var vm = this;
		vm.closeSidebar   = closeSidebar;
		vm.saveEdit 	  = saveEdit;
		vm.classifieds    = classifiedsFactory.ref;
		vm.classified     = vm.classifieds.$getRecord($state.params.id);

		$timeout(function(){
			$mdSidenav('left').open();
		});
		
		var contact = {
			name:"ryan cheknie",
			phone:"555555",
			email:"a@a.com"
		};

		$scope.$watch('vm.sidenavOpen',function(sidenav){
			if(sidenav===false)
			{
				$mdSidenav('left').close().then(function(){
					$state.go('classifieds')
				});
			}
		});

		function closeSidebar(){
			vm.sidenavOpen = false;
		}

		function saveClassified(classified){
			if(classified){
				classified.contact = contact;
				$scope.$emit('newClassified',classified);
				vm.sidenavOpen = false;
			}
		}

		function saveEdit(){
			vm.classifieds.$save(vm.classified).then(function(){
				vm.sidenavOpen = false;
				$scope.$emit('editSaved',"Edit Saved!");
			});
			
		}

	})
})();
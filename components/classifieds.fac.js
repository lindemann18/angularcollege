(function(){
	'use strict';
	angular.module("ngClassifieds")
	.factory("classifiedsFactory",function($http,$firebaseArray){
		function getClassifieds(){
			return $http.get('data/classifieds.json');
		}

		var ref = new Firebase('https://chuvacaangular.firebaseio.com');

		return{
			ref: $firebaseArray(ref)
		}
	});
})();
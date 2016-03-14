angular.module("ngClassifieds",['ngMaterial','ui.router','firebase'])
.config(function($mdThemingProvider,$stateProvider){
	$mdThemingProvider.theme('default')
	.primaryPalette('teal')
	.accentPalette('orange');
	$stateProvider
	.state('classifieds',{
		url:'/classifieds',
		templateUrl:'components/classifieds/classifieds.tpl.html',
		controller:'classifiedsCtrl as vm'
	})
	.state('classifieds.new',{
		url:'/new',
		templateUrl:'components/classifieds/classifieds.new.tpl.html',
		controller:'newClassifiedCtrl as vm'
	})
	.state('classifieds.edit',{
		url:'/edit/:id',
		templateUrl:'components/classifieds/classifieds.edit.tpl.html',
		controller:'editClassifiedCtrl as vm',
		params:{classified:null}
	})
})
.directive("helloWorld",function(){
	return{
		template:"<h1>{{message}}</h1>"
	}
});
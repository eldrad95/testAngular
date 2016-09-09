'use strict';
var myWebPart = angular.module('MyWebPart',['ui.bootstrap']).directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                    scope.$apply(function(){
                        scope.$eval(attrs.ngEnter, {'event': event});
                    });

                    event.preventDefault();
                }
            });
        };
    });

myWebPart.factory('Values', function(){
	var ob = {}
	ob.topValues = {};
	ob.CustordValues = {};
	ob.setValues = function(newobj) {
		ob.topValues = newobj;

	};
	ob.getValues = function() {
		return ob.topValues;
	}
	ob.setCustOrdValues = function(newobj) {
		ob.CustordValues = newobj;
	}
	ob.getCustOrdValues = function(newobj){
		return ob.CustordValues;
	}
	return ob;
	
});

myWebPart.service('test',function(){
	var test = this;
	test.infoBoxValues = [];
	test.CustordValues = [];
});

myWebPart.controller('infoBox', function( $interval, Values, test){
	var infoBox = this;
	// $scope.getData = function() {
	// 	$scope.Values = Values.getValues();
	// }
	// $interval($scope.getData,500);
	infoBox.Values = test.infoBoxValues;
});


myWebPart.controller('custOrdTable',function($interval,Values, test) {
	var custOrdTable = this;
	custOrdTable.CustOrds =test.CustordValues;
	});

myWebPart.controller('searchController', function($http, Values,test){
	var searchController = this;
	searchController.headerTitle = 'Product Description...';
	var Researchitems = [];
	var data ;
	var testdata = test;
	searchController.search = function(Searchinput) {
		if (Searchinput != '')
		{
			if (Researchitems.indexOf(Searchinput) == -1)
			{
				Researchitems.push(Searchinput);
			}
			var url = '../AngularService/WebServiceAngular.FleetSpecService.svc/FleetSpecService/?product=' + Searchinput;
			var custordUrl = '../AngularService/WebServiceAngular.FleetSpecService.svc/FleetSpecService/custord?product=' + Searchinput;
			var retourData;
			$http.get(url)
			.success(function succesCallBack(response) {
				angular.copy(response, testdata.infoBoxValues);
				searchController.headerTitle = testdata.infoBoxValues[0].descrip;
			},function errorCallBack(response){
				alert(response.data);
			});
			$http.get(custordUrl).success(function succesCallBack(response) {
				angular.copy(response, testdata.CustordValues);
			},function errorCallBack(response){
				alter(response.data);
			});
		}
	}

	searchController.previous = function() {
		if(searchController.searchInput !== '' && Researchitems.indexOf(searchController.searchInput) > 0)
		{
			searchController.searchInput = Researchitems[Researchitems.indexOf(searchController.searchInput) -1] ;
		}
		else if (Researchitems.indexOf(searchController.searchInput) == 0)
		{
			return;
		}
		else {
			searchController.searchInput = Researchitems[Researchitems.length -1 ];
		}
	}

	searchController.next = function() {
		if(searchController.searchInput !== '' && Researchitems.indexOf(searchController.searchInput) < Researchitems.length -1)
		{
			searchController.searchInput = Researchitems[Researchitems.indexOf(searchController.searchInput) +1] ;
		}
		else {
			searchController.searchInput = '';
		}
	}
	
});

//transform json request in url request for services. 
// var	serialize = function(obj) {
//   var str = [];
//   for(var p in obj)
//     if (obj.hasOwnProperty(p)) {
//       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//     }
//   console.log(str.join("&"));
//   return str.join("&");

// }
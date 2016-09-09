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

myWebPart.controller('infoBox', function($scope, $interval, Values){
	$scope.getData = function() {
		$scope.Values = Values.getValues();
	}
	$interval($scope.getData,500);
});


myWebPart.controller('custOrdTable',function($scope,$interval,Values) {
	$scope.getData= function(){
		$scope.CustOrds = Values.getCustOrdValues();
	}
	$interval($scope.getData,500);
	});

myWebPart.controller('searchController', function($scope,$http, Values){
	$scope.headerTitle = 'Product Description...';
	var Researchitems = [];
	var data ;
	$scope.search = function(Searchinput) {
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
				Values.setValues(response);
				$scope.headerTitle = Values.getValues()[0].descrip;
			},function errorCallBack(response){
				alert(response.data);
			});
			$http.get(custordUrl).success(function succesCallBack(response) {
				Values.setCustOrdValues(response);
			},function errorCallBack(response){
				alter(response.data);
			});
		}
	}

	$scope.previous = function() {
		if($scope.searchInput !== '' && Researchitems.indexOf($scope.searchInput) > 0)
		{
			$scope.searchInput = Researchitems[Researchitems.indexOf($scope.searchInput) -1] ;
		}
		else if (Researchitems.indexOf($scope.searchInput) == 0)
		{
			return;
		}
		else {
			$scope.searchInput = Researchitems[Researchitems.length -1 ];
		}
	}

	$scope.next = function() {
		if($scope.searchInput !== '' && Researchitems.indexOf($scope.searchInput) < Researchitems.length -1)
		{
			$scope.searchInput = Researchitems[Researchitems.indexOf($scope.searchInput) +1] ;
		}
		else {
			$scope.searchInput = '';
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
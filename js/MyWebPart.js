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
	ob.eastValues = {};
	ob.setValues = function(newobj) {
		ob.eastValues = newobj;

	};
	ob.getValues = function() {
		return ob.eastValues;
	}
	return ob;
	
});

myWebPart.controller('infoBox', function($scope, $interval, Values){
	$scope.getData = function() {
		$scope.Values = Values.getValues();
	}
	$interval($scope.getData,500);
});

myWebPart.controller('searchController', function($scope,$http, Values){
	$scope.headerTitle = 'Product Description...';
	var Researchitems = [];
	var data ;
	$scope.search = function(Searchinput) {
		if (searchInput != '')
		{
			if (Researchitems.indexOf(Searchinput) == -1)
			{
				Researchitems.push(Searchinput);
			}
			var url = '../AngularService/WebServiceAngular.FleetSpecService.svc/FleetSpecService/?product=' 
			+ Searchinput;
			var retourData;
			$http.get(url)
			.success(function succesCallBack(response) {
				Values.setValues(response);
				$scope.headerTitle = Values.getValues()[0].descrip;
			},function errorCallBack(response){
				alert(response.data);
			})
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
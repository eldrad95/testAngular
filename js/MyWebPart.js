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
	ob.seteastValues = function(newobj) {
		ob.eastValues = newobj;

	};
	// this.getDatas = function() {
	// 	return datas;
	// }
	ob.getEastValues = function() {
		return ob.eastValues;
	}
	return ob;
	
});



// var infoBoxEast = 
myWebPart.controller('infoBoxEast', function($scope, $interval, Values){
	$scope.getData = function() {
		$scope.Values = Values.getEastValues();
	}
	$interval($scope.getData,1000);
	$scope.city = 'Farnham';
});
myWebPart.controller('infoBoxWest', function($scope, $interval, Values){
	$scope.getData = function() {
		$scope.Values = Values.getEastValues();
	}
	$interval($scope.getData,1000);
	$scope.city = 'Montreal';
});


// var searchModule = 
myWebPart.controller('searchController', function($scope,$http, Values){
	$scope.headerTitle = 'Product Description...';
	var data ;
	$scope.search = function(Searchinput) {
		var url = '../Fleetspec/php/connectdb-east.php';
		var data = {'product': Searchinput };
		var retourData;
		$http({
			url: url,
			method : 'Post',
			headers : {  'Content-type' : 'application/x-www-form-urlencoded'},
			data: data,
			transformRequest : serialize
		}).success(function succesCallBack(response) {
			Values.seteastValues(response[0]);
			$scope.headerTitle = Values.eastValues.Descrip_east;
		},function errorCallBack(response){
			alert(response.data);
		})
	}
});


var	serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}


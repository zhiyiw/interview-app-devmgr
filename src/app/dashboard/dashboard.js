angular.module('dashboard', ['resources.devices', 'filters.formatting'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'app/dashboard/dashboard.tpl.html',
    controller: 'DashboardCtrl',
    resolve:{
      devices: ['Devices', function (Devices) {
        return Devices.all();
      }],
      cputop: ['Devices', function (Devices) {
        return Devices.cputop();
      }],
      memtop: ['Devices', function (Devices) {
        return Devices.memtop();
      }],
      txtop: ['Devices', function (Devices) {
        return Devices.txtop();
      }],
      rxtop: ['Devices', function (Devices) {
        return Devices.rxtop();
      }]
    }
  });
}])

.controller('DashboardCtrl', ['$scope', '$location', 'devices', 'cputop', 'memtop', 'txtop', 'rxtop', function ($scope, $location, devices, cputop, memtop, txtop, rxtop) {
  $scope.dataTable = [cputop, memtop, txtop, rxtop, devices];
  $scope.tablename = ['CPU', 'Memory', 'TX', 'RX', 'Devices'];
  $scope.editItem = function (item) {
    item.editing = true; 
  };
  $scope.doneEditing = function (item) {
    item.editing = false;
    var newOwner = item.owner;
    var ipAddress = item.ip;
    $scope.dataTable.forEach( function(panelData) {
      panelData.forEach( function(data) {
        if( ipAddress === data.ip) {
          data.owner = newOwner;
        }
      })
    })
  };
}]);
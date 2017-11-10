var myApp = angular.module('myApp', []);

myApp.controller("AppCtrl", function ($scope, $http) {

    var refresh = function () {
        $http.get('/contactList')
            .then(function (response) {
                console.log("Data received !!");
                $scope.contactList = response.data;
                $scope.contact = {};
            });
    };
    refresh();

    $scope.addContact = function () {
        console.log($scope.contact);
        $http.post('/contactList', [$scope.contact])
            .then(function (response) {
                console.log(response.data);
                refresh();
            });
    };

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/contactList/' + id)
            .then(function (response) {
                console.log(response.data);
                refresh();
            });
       
    };

    $scope.edit = function (id) {
        console.log(id);
        $http.get('/contactList/' + id)
            .then(function (response) {
                $scope.contact = response.data;
            });
    };

    $scope.update = function () {
        console.log($scope.contact._id);
        $http.put('/contactList/' + $scope.contact._id, $scope.contact)
            .then(function (response) {
                console.log(response.data);
                refresh();
            });
    };

    $scope.deselect = function () {
        $scope.contact = {};
    };
});
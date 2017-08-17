angular
    .module('app')
    .controller('userListController', userListController);

userListController.$inject = ['userService', '$scope', '$uibModal', '$location'];

function userListController(userService, $scope, $uibModal, $location) {

    var vm = this;

    vm.newUser = {
        login: null,
        name: null,
        last_name: null,
        email: null
    };

    vm.users = [];
    vm.submitted = null;
    vm.isUniqueLogin = null;

    vm.direction = 'inc';
    vm.columnName;
    vm.comparator;
    vm.currentUserIdForDelete;
    vm.currentUserNameForDelete;


    vm.viewby = '' + 5;
    vm.bigCurrentPage = 1;
    vm.maxSize = 5;
    vm.itemsPerPage = vm.viewby * 1;
    vm.addTriangleClass = -1;

    function setItemsPerPage(num) {
        vm.itemsPerPage = num;
        vm.bigCurrentPage = 1;
    }

    init();

    //public methods

    vm.createUser = createUser;
    vm.deleteUser = deleteUser;
    vm.checkLogIn = checkLogIn;
    vm.setItemsPerPage = setItemsPerPage;
    vm.goToBlockEdit = goToBlockEdit;

    // vm.changeDirection = changeDirection;
    vm.numericComparator = numericComparator;
    vm.wordComparator = wordComparator;
    vm.sortBy = sortBy;


    vm.openModalWindow   = openModalWindow;


    $scope.animationsEnabled = true;


    function openModalWindow(userId, userName) {
        vm.currentUserIdForDelete = userId;
        vm.currentUserNameForDelete = userName;
        open();

    }


    function open(size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'html/modal/userListModal.htm',
            controller: 'userListModalCtrl',
            size: size,
            resolve: {
                userName: function () {
                    return vm.currentUserNameForDelete;
                }
            }
        });

        modalInstance.result.then(
            function () {
                console.log('deleteUserId');
                deleteUser(vm.currentUserIdForDelete);
            },
            function () {
                console.log('delete was canceled')
            });
    }





    var columnForChoicingComparator = [
        {
            columnName: 'login',
            comparator: wordComparator
        },
        {
            columnName: 'name',
            comparator: wordComparator
        },
        {
            columnName: 'last_name',
            comparator: numericComparator
        },
        {
            columnName: 'e-mail',
            comparator: wordComparator
        }
    ];


    function sortBy(columnName) {

        if (vm.direction == 'inc') {
            vm.direction = 'dec';
            vm.addTriangleClass = 1;
        } else {
            vm.direction = 'inc';
            vm.addTriangleClass = 0;
        }

        vm.columnName = columnName;
        for (var i = 0; i < columnForChoicingComparator.length; i++) {
            if (columnForChoicingComparator[i].columnName == columnName) {
                vm.comparator = columnForChoicingComparator[i].comparator
            }
        }

    }


    function numericComparator(word1, word2) {
        return word1.value * 1 > word2.value * 1 ? -1 : 1
    }

    function wordComparator(word1, word2) {
        return word1.value > word2.value ? -1 : 1
    }

    // function changeDirection() {
    //     if (vm.direction == 'inc') {
    //         return vm.direction = 'dec';
    //     }
    //     return vm.direction = 'inc'
    // }


    function init() {
        userService.getAll()
            .then(function (response) {
                    vm.users = response.data.data;
                    vm.bigTotalItems = vm.users.length;


                },
                function (response) {
                    console.error(response);
                });

    }

    function checkLogIn() {
        userService.checkLogIn(vm.newUser.login)
            .then(function (response) {


                    if (response.data.data == 'true') {
                        console.log('log in does not exist');
                        vm.isUniqueLogin = true;
                        $scope.addUser.login.$setValidity('loginUnique', true);


                    } else {
                        console.log('log in exist');
                        vm.isUniqueLogin = false;
                        $scope.addUser.login.$setValidity('loginUnique', false);

                    }

                    init();
                },
                function (response) {
                    console.error(response);
                    console.log(response.data);
                });

    }


    function createUser() {

        if ($scope.addUser.$valid) {

            console.log('send data to server');
            vm.submitted = false;

            userService.createUser(vm.newUser)
                .then(function (response) {

                        vm.newUser = {
                            login: null,
                            name: null,
                            last_name: null,
                            email: null
                        };

                        init();
                    },
                    function (response) {
                        console.error(response);
                    });

        } else {
            console.log(' don`t send data to server');
            vm.submitted = true;

        }

    }


    function deleteUser(userId) {

        userService.deleteUser(userId)
            .then(function (response) {
                    init();
                },
                function (response) {
                    console.error(response);
                });
    }


    // $location
    function goToBlockEdit(path) {
        $location.path('/admin/user/'+path);
    }

};
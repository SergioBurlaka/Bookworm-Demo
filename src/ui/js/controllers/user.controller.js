
angular
    .module('app')
    .controller('userController', userController);

userController.$inject = ['userService', '$routeParams', 'notificationService'];

function userController (userService, $routeParams, notificationService) {

    var vm = this;

    vm.user = {};

    init();

    //public methods
    vm.updateUser = updateUser;



    function init() {
        var id = $routeParams.userId;

        userService.getUserById(id)
            .then(function (response) {
                vm.user = response.data.data;
            },
                function (response) {
            });

    }



    function updateUser() {
        userService.updateUser(vm.user)
            .then(function (response) {
                   var text =  'User data has been updated.';
                    notificationService.successMessage(text);

            },
            function (response) {
                var text =   'User data was not updated.';
                notificationService.errorMessage(text);
            });
    }


};

angular
    .module('app')
    .controller('bockListOfUserController', bockListOfUserController);

bockListOfUserController.$inject = ['bockListOfUserService', '$scope', '$location','blockService'];

function bockListOfUserController (bockListOfUserService, $scope, $location, blockService) {

    var vm = this;



    vm.blocks = [];
    vm.hi = 'hi from bockListOfUserController';

    init();

    //public methods

    // vm.createUser = createUser;
    // vm.deleteUser = deleteUser;
    vm.goToBlockView = goToBlockView;



    function goToBlockView(path) {

        // blockService.goToBlockView(path);
        $location.path('/userAccount/accountBlockList/'+path);
    }


    function init() {
        vm.blocks =  bockListOfUserService.getBlocksByUserId();
    }



};

angular
    .module('app')
    .controller('blockOfUserController', blockOfUserController);

blockOfUserController.$inject = ['$routeParams','blockService', '$location'];

function blockOfUserController ($routeParams, blockService, $location) {

    var vm = this;

    vm.block = {};

    init();

    // public methods
    vm.startTesting = startTesting;



    function init() {

        var blockId = $routeParams.userBlockId;

        blockService.getById(blockId)
            .then(function (response) {
                vm.block = response.data.data;
                },
                function (response) {
            });


    }


    function startTesting() {
        $location.path('/userAccount/learningTests/'+vm.block.id);
    }



};
angular
    .module('app')
    .controller('testController', blockController);

blockController.$inject = ['$routeParams', 'blockService', 'testService', '$q', 'notificationService'];

function blockController($routeParams, blockService, testService, $q, notificationService) {

    var vm = this;

    vm.test = {};
    vm.block = {};
    vm.blocks = {};

    init();


    // public methods

    vm.updateTest = updateTest;
    vm.init = init;
    vm.getTestsByBlockId = getTestsByBlockId;


    function updateTest() {
        vm.test.id = $routeParams.testId;
        vm.test.block_id = vm.block.id;

        testService.update(vm.test)
            .then(function (response) {
                    init();
                    var text = 'Test data has been updated.';
                    notificationService.successMessage(text);
                },
                function (response) {
                    var text = 'Test data was not updated.';
                    notificationService.errorMessage(text);
                });

    }


    function init() {


        var id = $routeParams.testId;

        $q.all([testService.getTestById(id), blockService.getAll()])
            .then(function (result) {

                vm.test = result[0].data.data;
                vm.blocks = result[1].data.data;
                var blockId = vm.test.block_id;
                vm.block = blockNameByTest(blockId);
            })
    }

    function blockNameByTest(blockId) {

        for (var i = 0; i < vm.blocks.length; i++) {
            if (vm.blocks[i].id === blockId) {
                return vm.blocks[i]
            }
        }


    };


    function getTestsByBlockId(blockId) {

        var tempArr = [];
        vm.tests = testService.getAll();

        for (var i = 0; i < vm.tests.length; i++) {

            if (vm.tests[i].block_id == blockId) {
                tempArr.push(vm.tests[i]);
            }
        }

        console.log(tempArr);

        return tempArr;
    }


}
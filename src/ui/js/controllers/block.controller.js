angular
    .module('app')
    .controller('blockController', blockController);

blockController.$inject = [ '$routeParams', 'blockService', 'testService', 'notificationService','$scope', '$uibModal', '$location'];

function blockController( $routeParams, blockService, testService, notificationService, $scope, $uibModal, $location ) {

    var vm = this;

    vm.block = {};
    vm.testsByBlockId = [];
    vm.newTest = {
        question: null,
        answer: null
    };

    vm.currentTestIdForDelete;

    vm.viewby = ''+5;
    vm.bigCurrentPage = 1;
    vm.maxSize = 5;
    vm.itemsPerPage = vm.viewby*1;

    function setItemsPerPage(num) {
        vm.itemsPerPage = num;
        vm.bigCurrentPage = 1;
    }


    init();


    // public methods
    vm.updateBlock           =  updateBlock;
    vm.init                  =  init;
    vm.deleteTest            =  deleteTest;
    vm.addTestByBlockId      =  addTestByBlockId;
    vm.setItemsPerPage       =  setItemsPerPage;
    vm.openModalWindow       =  openModalWindow;
    vm.goToTestEdit          =  goToTestEdit;




    $scope.animationsEnabled = true;


    function openModalWindow(testId) {
        vm.currentTestIdForDelete = testId;
        open();

    }


    function open(size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'html/modal/testListModal.htm',
            controller: 'testListModalCtrl',
            size: size,
            resolve: {
                testName: function () {
                    return vm.currentTestIdForDelete;
                }
            }
        });

        modalInstance.result.then(
            function () {
                console.log('deleteTest');
                deleteTest(vm.currentTestIdForDelete);
            },
            function () {
                console.log('cancel');

            });
    }




    function updateBlock() {

        vm.block.id = $routeParams.blockId;

        blockService.update(vm.block)
            .then(function (response) {
                    var text =  'Block data has been updated.';
                    notificationService.successMessage(text);
                },
                function (response) {
                    var text =   'Block data was not updated.';
                    notificationService.errorMessage(text);
                });

    }


    function addTestByBlockId(blockId){

        vm.newTest.block_id = blockId;
        testService.create(vm.newTest)
            .then(function (response) {
                    init();
                    vm.newTest = {
                        question: null,
                        answer: null
                    };
                },
                function (response) {
                    console.error(response);
                });
    }


    function init() {
        var id = $routeParams.blockId;

        blockService.getById(id)
            .then(function (response) {
                    vm.block = response.data.data;
                },
                function (response) {
                    console.error(response);
                });


        blockService.getTestsByBlockId(id)
            .then(function (response) {
                    vm.testsByBlockId = response.data.data;
                    vm.bigTotalItems = vm.testsByBlockId.length;

                },
                function (response) {
                    console.error(response);
                });
    }



    function deleteTest(testId) {
        testService.deleteTest(testId)
            .then(function (response) {
                    init();
            },
            function (response) {
                console.error(response);
            });
    }

    // $location
    function goToTestEdit(path) {
        $location.path('/admin/test/'+path);
    }

}
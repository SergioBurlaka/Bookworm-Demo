
angular
    .module('app')
    .controller('testListController', testListController);

testListController.$inject = ['testService','blockService', '$uibModal', '$scope', '$location'];


function testListController (testService, blockService, $uibModal, $scope, $location) {

    var vm = this;

    vm.newTest = {
        question: null,
        answer: null,
        block_id: null
    };

    vm.tests = [];
    vm.blocks = [];
    vm.block = [];

    vm.direction = 'inc';
    vm.columnName;
    vm.comparator;

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

    //public methods

    vm.deleteTest      = deleteTest;
    vm.addTest         = addTest;
    vm.blockNameByTest = blockNameByTest;
    vm.setItemsPerPage = setItemsPerPage;
    vm.goToBlockEdit   = goToBlockEdit;

    vm.changeDirection   = changeDirection;
    vm.numericComparator = numericComparator;
    vm.wordComparator    = wordComparator;
    vm.sortBy            = sortBy;


    vm.openModalWindow   = openModalWindow;



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



    var columnForChoicingComparator = [
        {
            columnName: 'answer',
            comparator: wordComparator
        },
        {
            columnName: 'question',
            comparator: wordComparator
        },
        {
            columnName: 'blockName',
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

    function changeDirection() {
        if (vm.direction == 'inc') {
            return vm.direction = 'dec';
        }
        return vm.direction = 'inc'
    }


    function blockNameByTest(blockId) {

        if(vm.blocks.length == 0){
            return ""
        }
        return vm.blocks[blockId].name

    }

    // function deleteTest(testId) {
    //
    //     testService.deleteTest(testId)
    //         .then(function (response) {
    //                 init();
    //             },
    //             function (response) {
    //                 console.error(response);
    //             });
    // }

     function deleteTest(testId) {
         console.log('delete test hello from test list ctrl');
        testService.deleteModalWindow(testId);

    }




    function init() {
        testService.getAll()
            .then(function (response) {
                vm.tests = response.data.data;
                    vm.bigTotalItems = vm.tests.length;

                },
                function (response) {
                console.error(response);
            });

        blockService.getAll()
            .then(function (response) {

                    var blocks = response.data.data;

                    for(var i=0; i < blocks.length; i++ ){
                        vm.blocks[blocks[i].id*1] = blocks[i]
                }

                },
                function (response) {
                    console.error(response);
                });

    }


    function addTest(){

        vm.newTest.block_id = vm.block.id;

        testService.create(vm.newTest)
            .then(function (response) {
                    vm.newTest = {
                        question: null,
                        answer: null,
                        block_id: null
                    };
                    init();
                },
                function (response) {
                    console.error(response);
                });
    };


    // $location
    function goToBlockEdit(path) {
        $location.path('/admin/test/'+path);
    }

};
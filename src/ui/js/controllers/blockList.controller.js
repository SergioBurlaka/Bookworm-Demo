
angular
    .module('app')
    .controller('blockListController', blockListController);

blockListController.$inject = ['blockService', '$location', '$uibModal', '$scope'];

function blockListController (blockService, $location, $uibModal, $scope) {

    var vm = this;


    vm.blocks = [];
    vm.newBlock = {
        name: null,
        description: null
    };

    vm.direction = 'inc';
    vm.columnName;
    vm.comparator;
    vm.currentBlockIdForDelete;
    vm.currentBlockNameForDelete;

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

    vm.deleteBlock     = deleteBlock;
    vm.addBlock        = addBlock;
    vm.goToBlockEdit   = goToBlockEdit;
    vm.setItemsPerPage = setItemsPerPage;

    vm.changeDirection   = changeDirection;
    vm.numericComparator = numericComparator;
    vm.wordComparator    = wordComparator;
    vm.sortBy            = sortBy;
    vm.openModalWindow   = openModalWindow;


    $scope.animationsEnabled = true;


    function openModalWindow(blockId, blockName) {
        vm.currentBlockIdForDelete = blockId;
        vm.currentBlockNameForDelete = blockName;
        open();

    }


    function open(size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'html/modal/blockListModal.htm',
            controller: 'blockListModalCtrl',
            size: size,
            resolve: {
                blockName: function () {
                    return vm.currentBlockNameForDelete;
                }
            }
        });

        modalInstance.result.then(
            function () {
                console.log('deleteBlock');
                deleteBlock(vm.currentBlockIdForDelete);
            },
            function () {
            });
    }




        var columnForChoicingComparator = [
        {
            columnName: 'name',
            comparator: wordComparator
        },
        {
            columnName: 'description',
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



    function addBlock(){
        blockService.save(vm.newBlock)
            .then(function (response) {
                    vm.newBlock = {
                        name: null,
                        description: null
                    };

                    init();
                },
                function (response) {
                    console.error(response);
                });
    };



    function init() {
        var promise = blockService.getAll();

        promise.then(sekas, noSekas);

        function sekas(response) {

            vm.blocks = response.data.data;
            vm.bigTotalItems = vm.blocks.length;

        }

        function noSekas(response) {
            console.error(response);
        }
    }


        function deleteBlock(blockId) {
            blockService.deleteBlock(blockId)
                .then(function (response) {
                        init();
                    },
                    function (response) {
                        console.error(response);
                    });
        }

    // $location
    function goToBlockEdit(path) {
        $location.path('/admin/block/'+path);
    }



};
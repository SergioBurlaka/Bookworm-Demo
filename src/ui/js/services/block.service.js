
angular
    .module('app')
    .factory('blockService', blockService);

blockService.$inject = ['$http', '$httpParamSerializerJQLike','$location'];

function blockService($http, $httpParamSerializerJQLike, $location) {

    var blockIdForTests;
    // var block;

    var service = {
        getAll: getAll,
        getTestsByBlockId: getTestsByBlockId,
        getById: getById,
        save: save,
        update: update,
        deleteBlock: deleteBlock,
        getBlockIdForTests: getBlockIdForTests,
        startTests: startTests,
        getMessage: getMessage
        // goToBlockView: goToBlockView
    };

    return service;



    function deleteBlock(blockId) {

        var config = {
            method: 'POST',
            url: 'http://snpro.pl/test/bookworm/api/block.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $httpParamSerializerJQLike({
                "delete": blockId
            })
        };

        return $http(config);
    }



    function getAll() {
        var config = {
            method: 'GET',
            url: 'http://snpro.pl/test/bookworm/api/block.php'
        };


        return $http(config);
    }

    function getMessage() {
        return 'Hello from Service!'
    }


    function getById(blockId) {

        var config = {
            method: 'GET',
            url: 'http://snpro.pl/test/bookworm/api/block.php',
            params: {id:blockId}
        };


        return $http(config);

    }

    function getTestsByBlockId(blockId) {

        var config = {
            method: 'GET',
            url: 'http://snpro.pl/test/bookworm/api/test.php',
            params: {block_id: blockId}
        };

        return $http(config);

    }


    function save(newBlock) {

        var config = {
            method: 'POST',
            url: 'http://snpro.pl/test/bookworm/api/block.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $httpParamSerializerJQLike({
                "name": newBlock.name,
                "description": newBlock.description
            })
        };

        return $http(config);
    }




        function update(block) {

            var config = {
                method: 'POST',
                url: 'http://snpro.pl/test/bookworm/api/block.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    "name": block.name,
                    "description": block.description,
                    "id": block.id
                })
            };

            return  $http(config);
        }


    function startTests(blockId) {
        blockIdForTests = blockId;
    }

    function getBlockIdForTests() {
        return blockIdForTests;
    }

}

angular
    .module('app')
    .factory('testService', testService);



testService.$inject = ['$http','$httpParamSerializerJQLike'];

function testService($http, $httpParamSerializerJQLike ) {


    var service = {
        getAll: getAll,
        getTestById: getTestById,
        create: create,
        update: update,
        deleteTest: deleteTest
        // getTestsByBlockId: getTestsByBlockId,
        // startTests: startTests,
        // getBlockIdForTests: getBlockIdForTests
    };

    return service;





    function deleteTest(testId) {

            var config = {
                method: 'POST',
                url: 'http://snpro.pl/test/bookworm/api/test.php',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    "delete": testId
                })
            };

            return $http(config);
    }



    function getAll() {

        var config = {
            method: 'GET',
            url: 'http://snpro.pl/test/bookworm/api/test.php'
        };

        return $http(config);
    }

    function getTestById(testId) {

        var config = {
            method: 'GET',
            url: 'http://snpro.pl/test/bookworm/api/test.php',
            params: {id: testId}
        };

        return $http(config);
    }


    // function getTestsByBlockId(blockId) {
    //
    //     var tempArr = [];
    //
    //     for (var i = 0; i < tests.length; i++) {
    //
    //         if (tests[i].block_id == blockId) {
    //             tempArr.push(tests[i]);
    //         }
    //     }
    //     return tempArr;
    // }




    function create(newTest) {

        var config = {
            method: 'POST',
            url: 'http://snpro.pl/test/bookworm/api/test.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $httpParamSerializerJQLike({
                "question": newTest.question,
                "answer": newTest.answer,
                "block_id": newTest.block_id
            })
        };

        return $http(config);
    }

    function update(test) {

        var config = {
            method: 'POST',
            url: 'http://snpro.pl/test/bookworm/api/test.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $httpParamSerializerJQLike({
                "question": test.question,
                "answer": test.answer,
                "block_id": test.block_id,
                "id": test.id
            })
        };

        return  $http(config);
    }




}
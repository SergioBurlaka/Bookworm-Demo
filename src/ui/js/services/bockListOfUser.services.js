
angular
    .module('app')
    .factory('bockListOfUserService', bockListOfUserService);

bockListOfUserService.$inject = ['$http', '$httpParamSerializerJQLike'];

function bockListOfUserService($http, $httpParamSerializerJQLike) {

    var  blocks = [

        {
            name: 'block 10',
            description: 'description":"description block 10 description block 10 description block 10 description block 10',
            score: '45%',
            passing: false,
            id: "17"
        },
        {
            name: 'block2',
            description: 'description of block2',
            score: '85%',
            passing: true,
            id: "2"
        },
        {
            name: 'block3',
            description: 'description of block3',
            score: '10%',
            passing: false,
            id: "3"
        },
        {
            name: 'block5',
            description: 'block5 description',
            score: '55%',
            passing: false,
            id: "5"
        }
    ];

    var service = {
        getBlocksByUserId: getBlocksByUserId
    };

    return service;


    function getBlocksByUserId() {
            return blocks;
    }


}
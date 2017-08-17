
angular
    .module('app')
    .controller('learningTestController', learningTestController);

learningTestController.$inject = ['$scope','blockService', '$routeParams', '$timeout'];

function learningTestController ($scope, blockService, $routeParams, $timeout) {

    var vm = this;
    //
    // vm.tests = [];
    //
    // vm.test = [];
    // vm.answer;
    // vm.question;
    vm.hint = '';


    // init();

    //public methods

    // vm.startTests = startTests;
    // vm.getAnswer = getAnswer;
    // vm.nextTest = nextTest;
    // vm.showHint = showHint;
    // vm.myEnter = myEnter;



    function init(){
        startTests();
    }

    function showHint(){
        vm.hint = '- '+ vm.answer;
        $timeout(function () {
            vm.hint = '';
            console.log(vm.hint+ 'done');

        }, 2000)

    }

    // $scope.$on('nextTest', function () {
    //     nextTest();
    //     console.log(vm.test);
    // });
    //
    //
    // function myEnter() {
    //     startTests();
    // }
    //
    // function shuffle (a){
    //     var j,x;
    //     for(var i =0; i < a.length; i++){
    //         j = Math.floor(Math.random() * i);
    //         x = a[i];
    //         a[i] = a[j];
    //         a[j] = x;
    //     }
    // }
    //
    // var count =0;
    //
    // function nextTest(){
    //
    //     if(count == vm.tests.length){
    //         count = 0;
    //         shuffle (vm.tests);
    //             console.log(vm.tests);
    //
    //
    //     }
    //
    //     vm.test = vm.tests[count];
    //     vm.answer = vm.test.answer;
    //     vm.question = vm.test.question;
    //
    //     count++;
    //
    // }
    //
    //
    // function getAnswer() {
    //     return vm.answer
    // }
    //
    //
    // function startTests() {
    //
    //    // var blockId =  blockService.getBlockIdForTests();
    //     var blockId = $routeParams.blockId;
    //
    //     blockService.getTestsByBlockId(blockId)
    //         .then(function (response) {
    //                 vm.tests = response.data.data;
    //                 console.log('from CTrl');
    //                 console.log(vm.tests);
    //
    //                 nextTest();
    //
    //             },
    //         function (response) {
    //         });
    // }


};
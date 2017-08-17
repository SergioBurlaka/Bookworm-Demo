
angular
    .module('app')
    .controller('testListModalCtrl', testListModalCtrl);

testListModalCtrl.$inject = ['$scope', '$uibModalInstance' ];

function testListModalCtrl ($scope, $uibModalInstance) {

    // var vm = this;

    // $scope.testName = testName;

    //public methods

    $scope.ok              =  ok;
    $scope.cancel          =  cancel;

     function ok() {
         $uibModalInstance.close();
     };

     function cancel() {
         $uibModalInstance.dismiss();

     };


};
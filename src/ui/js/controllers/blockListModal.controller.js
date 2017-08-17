
angular
    .module('app')
    .controller('blockListModalCtrl', blockListModalCtrl);

blockListModalCtrl.$inject = ['$scope', '$uibModalInstance', 'blockName' ];

function blockListModalCtrl ($scope, $uibModalInstance, blockName) {

    // var vm = this;

    $scope.blockName = blockName;

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
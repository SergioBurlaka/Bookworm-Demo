
angular
    .module('app')
    .controller('userListModalCtrl', userListModalCtrl);

userListModalCtrl.$inject = ['$scope', '$uibModalInstance', 'userName' ];

function userListModalCtrl ($scope, $uibModalInstance, userName) {

    // var vm = this;

    $scope.userName = userName;

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
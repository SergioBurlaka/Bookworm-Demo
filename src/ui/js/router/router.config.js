angular
    .module('app')
    .config(configRouting);

configRouting.$inject = ['$routeProvider'];

function configRouting($routeProvider) {

    $routeProvider
        .when('/admin/block', {
            templateUrl: 'html/admin/block/blockList.htm',
            controller: 'blockListController',
            controllerAs: 'blc'
        })
        .when('/admin/block/:blockId', {
            templateUrl: 'html/admin/block/block.htm',
            controller: 'blockController',
            controllerAs: 'bc'
        })
        .when('/', {
            template: '<h1> start view </h1>'
        })
        .when('/admin/test/:testId', {
            templateUrl: 'html/admin/test/test.htm',
            controller: 'testController',
            controllerAs: 'tc'
        })
        .when('/admin/test', {
            templateUrl: 'html/admin/test/testList.htm',
            controller: 'testListController',
            controllerAs: 'tlc'
        })
        .when('/admin/user', {
            templateUrl: 'html/admin/user/userList.htm',
            controller: 'userListController',
            controllerAs: 'ulc'
        })
        .when('/admin/user/:userId', {
            templateUrl: 'html/admin/user/user.htm',
            controller: 'userController',
            controllerAs: 'uc'
        })
        .when('/userAccount/accountBlockList', {
            templateUrl: 'html/userAccount/accountBlockList/accountBlockList.htm',
            controller: 'bockListOfUserController',
            controllerAs: 'uac'
        })
        .when('/userAccount/accountBlockList/:userBlockId', {
            templateUrl: 'html/userAccount/accountBlockList/accountBlock.htm',
            controller: 'blockOfUserController',
            controllerAs: 'buc'
        })
        .when('/userAccount/learningTests/:blockId', {
            templateUrl: 'html/userAccount/accountBlockList/learningTests.htm',
            controller: 'learningTestController',
            controllerAs: 'ltc'
        });


}


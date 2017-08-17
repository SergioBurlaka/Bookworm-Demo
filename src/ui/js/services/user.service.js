
angular
    .module('app')
    .factory('userService', userService);

userService.$inject = ['$http', '$httpParamSerializerJQLike'];

function userService($http, $httpParamSerializerJQLike) {


    var service = {
        getAll: getAll,
        getUserById: getUserById,
        updateUser: updateUser,
        createUser: createUser,
        deleteUser: deleteUser,
        checkLogIn: checkLogIn
    };

    return service;




    function getAll() {
        var config = {
            method: 'GET',
            url: 'http://snpro.pl/test/bookworm/api/user.php'
        };

        return $http(config);
    }

    function getUserById(userId) {

        var config = {
            method: 'GET',
            url: 'http://snpro.pl/test/bookworm/api/user.php',
            params: {id: userId}
        };

        return $http(config);
    }

    function checkLogIn(userLogIn) {

        var config = {
            method: 'GET',
            url: 'http://snpro.pl/test/bookworm/api/check_unique_login.php',
            params: {login: userLogIn}
        };

        return $http(config);
    }


    function updateUser(user) {

        var config = {
            method: 'POST',
            url: 'http://snpro.pl/test/bookworm/api/user.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $httpParamSerializerJQLike({
                "id": user.id,
                "login": user.login,
                "name": user.name,
                "last_name": user.last_name,
                "email": user.email
            })
        };

        return  $http(config);
    }



    function createUser(newUser) {
        var config = {
            method: 'POST',
            url: 'http://snpro.pl/test/bookworm/api/user.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $httpParamSerializerJQLike({
                "login":newUser.login,
                "name":newUser.name,
                "last_name":newUser.last_name,
                "email": newUser.email

            })
        };

        return $http(config);
    }




    function deleteUser(userId) {
        var config = {
            method: 'POST',
            url: 'http://snpro.pl/test/bookworm/api/user.php',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $httpParamSerializerJQLike({
                "delete": userId
            })
        };

        return $http(config);
    }


}
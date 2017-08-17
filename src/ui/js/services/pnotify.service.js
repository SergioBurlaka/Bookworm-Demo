
angular
    .module('app')
    .factory('notificationService', notificationService);

function notificationService() {


    var service = {
        successMessage: successMessage,
        errorMessage: errorMessage

    };

    return service;




    function successMessage(text) {
        new PNotify({
            title: 'Success!',
            text: text,
            type: 'success'
        });

    }

    function errorMessage(text) {
        new PNotify({
            title: 'Oh No!',
            text: text,
            type: 'error'
        });

    }






}


 angular
     .module('app')
     .filter('direction', function () {
         return function (arr, direction) {
             if(direction == 'dec'){
                 return arr.reverse();
             }
             if(direction == 'inc'){
                 return arr;
             }
         }

     });




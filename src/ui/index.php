<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title> angular JS </title>

    <script src="js/lib/angular.js"></script>
    <script src="js/lib/angular-animate.js"></script>
    <script src="js/lib/angular-route.js"></script>
    <script src="js/lib/jquery-3.2.1.js"></script>

    <script type="text/javascript" src="js/lib/pnotify/pnotify.custom.min.js"></script>
    <script type="text/javascript" src="js/lib/pnotify/angular-pnotify.js"></script>
    <link href="js/lib/pnotify/pnotify.custom.min.css" media="all" rel="stylesheet" type="text/css"/>

    <script type="text/javascript" src="js/lib/bootstrap/ui-bootstrap-tpls-2.5.0.js"></script>
    <link href="js/lib/bootstrap/css/bootstrap.css" media="all" rel="stylesheet" type="text/css"/>

    <link rel="stylesheet" href="../css/lib/font-awesome-4.7.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="main.css">


    <script src="app.js"></script>
    <script src="js/controllers/blockListModal.controller.js"></script>
    <script src="js/controllers/blockList.controller.js"></script>
    <script src="js/controllers/block.controller.js"></script>

    <script src="js/controllers/test.controller.js"></script>
    <script src="js/controllers/testList.controller.js"></script>
    <script src="js/controllers/testListModal.controller.js"></script>

    <script src="js/controllers/user.controller.js"></script>
    <script src="js/controllers/userList.controller.js"></script>
    <script src="js/controllers/userListModal.controller.js"></script>

    <script src="js/controllers/blockListOfUser.controller.js"></script>
    <script src="js/controllers/blockOfUser.controller.js"></script>
    <script src="js/controllers/learningTests.controller.js"></script>

    <script src="js/services/block.service.js"></script>
    <script src="js/services/test.service.js"></script>
    <script src="js/services/user.service.js"></script>
    <script src="js/services/pnotify.service.js"></script>
    <script src="js/services/bockListOfUser.services.js"></script>

    <script src="js/router/router.config.js"></script>

    <script src="js/directives/test.directive.js"></script>

    <script src="js/filters/slice.filter.js"></script>
    <script src="js/filters/direction.filter.js"></script>


</head>
<body>

<div ng-app="app">

    <a href="#!" class="button">Go to start view</a>
    <a href="#!/admin/block" class="button">Go to block list</a>
    <a href="#!/admin/test" class="button">Go to test list</a>
    <a href="#!/admin/user" class="button">Go to users list</a>
    <a href="#!/userAccount/accountBlockList" class="button">Go to user account</a>


    <ng-view></ng-view>

    <!--//templates-->
    <?php
    include 'html/modal/blockListModal.htm';
    include 'html/admin/block/blockList.htm';
    include 'html/admin/block/block.htm';

    include 'html/modal/testListModal.htm';
    include 'html/admin/test/test.htm';
    include 'html/admin/test/testList.htm';

    include 'html/modal/userListModal.htm';
    include 'html/admin/user/userList.htm';
    include 'html/admin/user/user.htm';

    include 'html/userAccount/accountBlockList/accountBlockList.htm';
    include 'html/userAccount/accountBlockList/accountBlock.htm';
    include 'html/userAccount/accountBlockList/learningTests.htm';


    ?>

</div>


</body>
</html>
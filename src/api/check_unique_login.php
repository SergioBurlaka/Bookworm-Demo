<?php

try {

    require 'common/response.php';
    require 'common/sql_connection.php';



    if (isset($_GET['login'])) {

        $db = getConnection();
        $count = $db->getOne(
            " SELECT COUNT(id) FROM ?n " .
            " WHERE login=?s ", 'user', $_GET['login']);

        if ($count == 0) {
            jsonResponse('true', 'success');
        } else {
            jsonResponse('false', 'success');
        }
    } else {
        throw new Exception('login parameter is required');
    }

} catch (Exception $e) {
    header('X-PHP-Response-Code: 500', true, 500);
    jsonResponse($e->getMessage(), 'exception handler');
}


<?php

include 'common/response.php';
include 'common/sql_connection.php';

if ( isset($_COOKIE['id']) and isset($_COOKIE['hash']) ) {

    $db = getConnection();

    $user = $db->getRow("SELECT * FROM user WHERE id=?i", $_COOKIE['id']);


    if ($user['hash'] !== $_COOKIE['hash'] ||
        ($user['id'] !== $_COOKIE['id']) ) {
        setcookie("id", "", time() - 3600*24*30*12, "/");
        setcookie("hash", "", time() - 3600*24*30*12, "/");
        redirectToLoginForm();
    }

} else {
    redirectToLoginForm();
}

function redirectToLoginForm() {
    header("Location: http://snpro.pl/test/bookworm/login_form.php?location=" . urlencode($_SERVER['REQUEST_URI']));
    exit();
}



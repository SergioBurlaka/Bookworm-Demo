<?php

function generateCode($length=6) {

    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHI JKLMNOPRQSTUVWXYZ0123456789";

    $code = "";

    $clen = strlen($chars) - 1;
    while (strlen($code) < $length) {

        $code .= $chars[mt_rand(0,$clen)];
    }

    return $code;

}

try {
    include 'common/response.php';
    include 'common/sql_connection.php';

    $db = getConnection();

    $table = "user";

    $fields = array(
        'login',
        'password',
        'hash',
        'ip',
        'name',
        'last_name',
    );

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $err = array();
        $data = $db->filterArray($_POST, $fields);

        $row = $db->getRow("SELECT id, password FROM ?n WHERE login=?s", $table, $data['login']);

        if (!$row) {
            jsonResponseWithError(null, 'failed', 'no_such_user');
            exit;
        }

        if(! ($row['password'] === md5(md5($data['password']))) ) {
            jsonResponseWithError(null, 'failed', 'wrong_password');
            exit;
        }

        $hash = md5(generateCode(10));

        $data['hash'] = $hash;

        $db->query("UPDATE ?n SET hash = ?s WHERE id = ?i", $table, $hash, $row['id']);

//        header("Location: http://snpro.pl/test/bookworm");


        $redirect = null;
        if( isset($_POST['location']) ) {
            $redirect = $_POST['location'];
            $path = "Location: " . trim($redirect);
            header($path);
        } else {
            header("Location: check.php");
//            header("Location: http://snpro.pl/test/bookworm");
        }

        setcookie("id", $row['id'], time()+60*60*24*30, '/');
        setcookie("hash", $hash, time()+60*60*24*30, '/');

        exit();

    } else {
        exit;
    }





} catch (Exception $e) {
    jsonResponse($e->getMessage(), 'Exception handler');
}


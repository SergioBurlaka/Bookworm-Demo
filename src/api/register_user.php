<?php



try {

    require 'common/response.php';
    require 'common/sql_connection.php';

    $db = getConnection();

    $table = "user";

    $fields = array(
        'login',
        'password',
        'email',
        'hash',
        'ip',
        'name',
        'last_name',
    );

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $err = array();
        $data = $db->filterArray($_POST, $fields);

        if(!preg_match("/^[a-zA-Z0-9]+$/",$_POST['login'])) {
            $err[] = "warn_login_latin_only";
        }

        if(strlen($_POST['login']) <= 3 or strlen($_POST['login']) > 30) {
            $err[] = "warn_login_length";
        }

        $count = $db->getOne(
            " SELECT COUNT(id) FROM ?n ".
            " WHERE login=?s ", $table, $_POST['login']);

        if($count > 0) {
            $err[] = "warn_login_non_unique";
        }

        if (count($err) == 0) {
            $data['password'] = md5(md5(trim($data['password'])));
            $result = $db->query("INSERT INTO ?n SET ?u", $table, $data);
            jsonResponse($result, 'success');
        } else {
            jsonResponseWithError('failed', 'failed', $err);
        }



    }



} catch (Exception $e) {
    jsonResponse($e->getMessage(), 'exception handler');
}

<?php
include 'common/plain_entity_crud.php';
try {

    $table = "user";

    $fields = array(
        'login',
        'password',
        'hash',
        'ip',
        'name',
        'last_name',
        'email'
    );

    plain_entity_crud($fields, $table);


} catch (Exception $e) {
    jsonResponse($e->getMessage(), 'exception handler');
}







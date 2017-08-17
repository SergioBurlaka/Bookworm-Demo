<?php
include 'common/plain_entity_crud.php';
try {

    $table = "block";
    $fields = array('name', 'description');

    plain_entity_crud($fields, $table);


} catch (Exception $e) {
    jsonResponse($e->getMessage(), 'exception handler');
}
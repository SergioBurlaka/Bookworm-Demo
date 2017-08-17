<?php
include 'common/plain_entity_crud.php';
try {

    $table = "test";
    $fields = array('question', 'answer', 'block_id');
    
    handle_block_id($table);
    plain_entity_crud($fields, $table);


} catch (Exception $e) {
    jsonResponse($e->getMessage(), 'exception handler');
}

function handle_block_id($table) {
    try {

        if ($_SERVER['REQUEST_METHOD'] == 'GET') {
            if (isset($_GET['block_id'])) {
                $db = getConnection();
                $tests = $db->getAll("SELECT * FROM ?n WHERE block_id=?i", $table, $_GET['block_id']);
                jsonResponse($tests, 'success');
            }
        }

    } catch (Exception $e) {
        header('X-PHP-Response-Code: 500', true, 500);
        jsonResponse($e->getMessage(), 'failed');
    }

}
<?php
require 'response.php';
require "sql_connection.php";

function plain_entity_crud($fields, $table) {

    try {

        $db = getConnection();

        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $data = $db->filterArray($_POST, $fields);

            if (isset($_POST['delete'])) {
                $result = $db->query("DELETE FROM ?n WHERE id=?i", $table, $_POST['delete']);
            } elseif ($_POST['id']) {
                $result = $db->query("UPDATE ?n SET ?u WHERE id = ?i", $table, $data, $_POST['id']);
            } else {
                $result = $db->query("INSERT INTO ?n SET ?u", $table, $data);
            }
            if ($result) {
                jsonResponse($result, 'success');
            } else {
                header('X-PHP-Response-Code: 500', true, 500);
                jsonResponse($result, 'illegal sql result');
            }
        }

        if (!isset($_GET['id'])) {
            $LIST = $db->getAll("SELECT * FROM ?n", $table);
            jsonResponse($LIST, 'success');

        } else {
            if ($_GET['id']) {
                $row = $db->getRow("SELECT * FROM ?n WHERE id=?i", $table, $_GET['id']);
                jsonResponse($row, 'success');
            } else {
                header('X-PHP-Response-Code: 500', true, 500);
                jsonResponse('error', 'no case for request');
            }

        }
    } catch (Exception $e) {
        header('X-PHP-Response-Code: 500', true, 500);
        jsonResponse($e->getMessage(), 'failed');
    }
}
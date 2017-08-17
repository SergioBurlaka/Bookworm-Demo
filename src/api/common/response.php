<?php

function jsonResponse($data, $type) {
    jsonResponseWithError($data, $type, array());
}

function jsonResponseWithError($data, $type, $err) {
    $jsonResponse = new Response($data, $type, $err);
    $aJSON = json_encode($jsonResponse);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-cache, no-store, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
    echo $aJSON;
    exit;
}



class Response {
    public $data;
    public $status = 'fail';
    public $err = array();

    public function __construct($data, $status, $err) {
        $this->data = $data;
        $this->status = $status;
        array_push($this->err, $err);
    }
}

<?php

require "lib/safemysql.class.php";

function getConnection() {

    $opts = array(
        'user' => 'snpropl_admin',
        'pass' => 'v17v10v87',
        'db' => 'snpropl_db',
        'charset' => 'utf8',
        'host' => '10.10.10.10',
    );

    return new SafeMysql($opts);
}


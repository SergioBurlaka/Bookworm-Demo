<?php




try {

//mb_internal_encoding("UTF-8");
    $host = "10.10.10.10";
    $user = "snpropl_admin";
    $password = "v17v10v87";
    $db = "snpropl_db";


    $link = mysql_connect($host, $user, $password);
    if (!$link) {
        die('Cant connect to db : ' . mysql_error());
    }

// выбираем foo в качестве текущей базы данных
    $db_selected = mysql_select_db($db, $link);
    if (!$db_selected) {
        die ('Cant select db $db: ' . mysql_error());
    }


    $result = mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
//$result = mysql_query("ALTER TABLE test CHANGE question question VARCHAR(400)");
//$result = mysql_query("ALTER TABLE snpropl_db.test CHANGE COLUMN id id INT(11) NOT NULL AUTO_INCREMENT ;");
//$result = mysql_query("ALTER TABLE test CHANGE COLUMN id id INT(11) NOT NULL AUTO_INCREMENT");
////    $result = mysql_query("ALTER TABLE test CHANGE COLUMN question question VARCHAR(400) NULL");
//    $result = mysql_query("CREATE TABLE snpropl_db.user (".
//        " id INT NOT NULL AUTO_INCREMENT,".
//        " login VARCHAR(30) NULL,".
//        " password VARCHAR(32) NULL,".
//        " hash VARCHAR(32) NULL,".
//        " ip INT(10) NULL DEFAULT 0,".
//        " name VARCHAR(45) NULL,".
//        " last_name VARCHAR(45) NULL,".
//        " PRIMARY KEY (id),".
//        " UNIQUE INDEX login_UNIQUE ( login ASC ))".
//        " ENGINE = InnoDB".
//        " DEFAULT CHARACTER SET = utf8 ");
    
//    $result = mysql_query("ALTER TABLE snpropl_db.user".
//        " CHANGE COLUMN login login VARCHAR(30) NOT NULL ,".
//        " CHANGE COLUMN password password VARCHAR(32) NOT NULL ");    
    
    
//    $result = mysql_query(
//        "CREATE TABLE snpropl_db.block (".
//        "  id INT NOT NULL AUTO_INCREMENT, ".
//        "  name VARCHAR(45) NULL, ".
//        "  description VARCHAR(1000) NULL, ".
//        "  PRIMARY KEY (id), ".
//        "  UNIQUE INDEX name_UNIQUE (name ASC)) ".
//        " ENGINE = InnoDB ".
//        " DEFAULT CHARACTER SET = utf8");


//    $result = mysql_query(
//        "  ALTER TABLE snpropl_db.test ".
//"   ADD CONSTRAINT block_id".
//"  FOREIGN KEY (id)".
//"  REFERENCES snpropl_db.block (id)".
//"  ON DELETE CASCADE ".
//"  ON UPDATE CASCADE ");

    $sql = $_POST['sql'];
    $result = mysql_query($sql);

//    ALTER TABLE `snpropl_db`.`test`
//DROP FOREIGN KEY `block_id`;



    /*ALTER TABLE `snpropl_db`.`test`
ADD INDEX `block_id_idx` (`block_id` ASC);
ALTER TABLE `snpropl_db`.`test`
ADD CONSTRAINT `block_id`
  FOREIGN KEY (`block_id`)
  REFERENCES `snpropl_db`.`block` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
*/


//$result = mysql_query("DELETE FROM test WHERE id='1';");
    if (!$result) {
        echo "ERROR " . mysql_errno() . " " . mysql_error() . "\n";
        exit;
    }

    echo $result;


//$arr = array();


//while ($row = mysql_fetch_assoc($result)) {
//    $test = new stdClass();
//    $test->test_id = $row['test_id'];
//    $test->question = $row['questin'];
//    $test->answer = $row['answer'];
//
//    array_push($arr, $test);
//}


//$myJSON = json_encode($arr);

//header('Content-Type: application/json; charset=utf-8');
//echo $myJSON

} catch (Exception $e) {
    echo $e->getMessage();
}

?>
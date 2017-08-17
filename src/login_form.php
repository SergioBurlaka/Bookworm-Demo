<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Login</title>
</head>
<body>

<form method="post" action="http://snpro.pl/test/bookworm/api/login.php">
    <input type="hidden" name="location" value = "
        <?php
        if(isset($_GET['location'])) {
            echo htmlspecialchars($_GET['location']);
        }
        ?>
        ">
    <input name="login"/>
    <input name="password" type="password"/>
    <button type="submit">Submit</button>
</form>

</body>
</html>
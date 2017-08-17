<?php
    include 'api/check.php'
?>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
    <script
            src="https://code.jquery.com/jquery-3.2.1.js"
            integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="
            crossorigin="anonymous"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="js/main.js"></script>
</head>
<body>


<div id="editor">
    <h1 class="heading">Editor</h1>
    <input type="text" placeholder="Task" name="task"/> <br/>
    <input type="text" placeholder="Answer"  name="answer"/>
    <button class="post lv-btn btn-green">Post</button>
</div>

<hr/>

<div class="swearing-wrapper">
    <div class="swearing"></div>
</div>

<div id="test">
    <div class="task"></div>
    <span contenteditable="true" id="answer"></span>
    <button class="test-button lv-btn btn-gray">Next</button>
</div>


<button id="getAllTests">getAllTests</button>

</body>
</html>
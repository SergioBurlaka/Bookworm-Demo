$(document).ready(function () {

    var correctAnswer = 'I am a doctor';
    var task = 'Я доктор';
    var userAnswer = '';
    var swearingService = {};


    var regExp = new RegExp(String.fromCharCode(160), "g");

    function init() {
        $('input[name="answer"]').val(correctAnswer);
        $('input[name="task"]').val(task);
        $('div.task').text(task);
        var $swearing = $('.swearing');
        $swearing.hide();
        swearingService = new SwearingService($swearing);
    }

    init();


    $('.post').click(function () {

        correctAnswer = $('input[name="answer"]').val();
        task = $('input[name="task"]').val();

        saveTest(task, correctAnswer);
        $('div.task').text(task);
    });

    $('#getAllTests').click(
        getAllTests
    );


    var $mainInput = $('span#answer');

    $mainInput.keyup(
        function (event) {
            var code = (event.keyCode || event.which);

            if (code == 37 || code == 38 || code == 39 || code == 40 || code == 8) {
                return;
            }


            userAnswer = $mainInput.text();
            userAnswer = userAnswer.replace(regExp, String.fromCharCode(32));

            if (equals(correctAnswer, userAnswer)) {
                nextButtonApply();
                return
            }


            var rightPart = '';
            var wrongPart = '';
            var wrongStart = -1;

            for (var i = 0; i < userAnswer.length; i++) {
                if (userAnswer[i] !== correctAnswer[i]) {
                    wrongStart = i;
                    swearingService.show();
                    break;
                }
            }

            if (wrongStart !== -1) {
                rightPart = userAnswer.slice(0, wrongStart);
                wrongPart = userAnswer.slice(wrongStart);
            } else {
                rightPart = userAnswer;
            }


            rightPart = rightPart.replace(new RegExp(String.fromCharCode(32), "g"), String.fromCharCode(160));
            wrongPart = wrongPart.replace(new RegExp(String.fromCharCode(32), "g"), String.fromCharCode(160));

            $mainInput.html('');
            $mainInput.html('<span class="ok">' + rightPart + '</span>' + '<span class="notOk">' + wrongPart + '</span>');


            placeCaretAtEnd($mainInput[0]);


        }
    );

    function equals(string1, string2) {
        return string1.toLowerCase() === string2.toLowerCase();
    }

    function nextButtonApply() {

        $('.test-button')
            .removeClass('btn-gray')
            .addClass('btn-green')
            .focus();

    }


    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
            var range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    function SwearingService($element) {

        var swearings = [
            'You motherfucker',
            'come on you little ass…',
            'fuck with me, eh? You fucking little asshole',
            'dickhead cocksucker…',
            'You fuckin\' come on',
            'come fuck with me!',
            'I\'ll get your ass',
            'you jerk!',
            'Oh, you fuckhead motherfucker!',
            'Fuck all you and your family!',
            'Come on, you cocksucker',
            'slime bucket, shitface turdball!',
            'Come on, you scum sucker',
            'you fucking with me?',
            'Come on, you asshole!!!'
        ];

        var currentIndex = 0;

        var timout;

        this.getSwearing = function () {
            if (currentIndex == swearings.length) {
                currentIndex = 0;
            }
            var result = swearings[currentIndex];
            currentIndex++;
            return result;

        };

        this.show = function () {
            clearTimeout(timout);
            $element.text(this.getSwearing()).show().effect("shake");
            timout = setTimeout(function () {
                $element.hide();
            }, 3500)
        };

    }

    function getAllTests() {
        $.ajax({
            method: "get",
            dataType: "json",
            url: "/test/bookworm/php/test.php",
            data: {},
            success: function (data) {
                console.log(data);
            }
        })

    }

    function saveTest(question, answer) {
        $.ajax({
            method: "post",
            dataType: "json",
            url: "/test/bookworm/php/test.php",
            data: {question: question, answer: answer},
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data)
            }
        })
    }

});






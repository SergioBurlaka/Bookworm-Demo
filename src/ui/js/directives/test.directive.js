angular
    .module('app')
    .directive('spanbind', spanbind);

spanbind.$inject = ['$routeParams', 'blockService', '$timeout'];


function spanbind($routeParams, blockService, $timeout) {
    var directive = {
        templateUrl: 'html/userAccount/accountBlockList/learningTestsTemplate.html',
        link: link,
        scope: {}

    };

    return directive;

    function link(scope, element, attrs, ctrl) {

        // scope.$watch();
        scope.answer;
        scope.question;
        scope.hint = '';
        scope.tests = [];
        scope.isError = false;
        scope.disabledNextButton = true;
        scope.showHint = showHint;
        scope.nextTest = nextTest;


        function startTests() {
            var blockId = $routeParams.blockId;

            blockService.getTestsByBlockId(blockId)
                .then(function (response) {
                        scope.tests = response.data.data;
                        nextTest();
                    },
                    function (response) {
                    });
        }

        startTests();

        function shuffle(a) {
            var j, x;
            for (var i = 0; i < a.length; i++) {
                j = Math.floor(Math.random() * i);
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
        }

        var count = 0;

        function nextTest() {
            scope.disabledNextButton = true;
            isAnswerRight = false;
            spanAnswer.html('');


            if (count == scope.tests.length) {
                count = 0;
                shuffle(scope.tests);

            }

            scope.test = scope.tests[count];
            scope.answer = scope.test.answer;
            scope.question = scope.test.question;
            count++;

        }

        function showHint() {
            scope.hint = '- ' + scope.answer;
            $timeout(function () {
                scope.hint = '';
            }, 2000)

        }

        var isAnswerRight = false;

        var spanAnswer = document.getElementById('testAnswer');
        spanAnswer = angular.element(spanAnswer);


        spanAnswer.on('keyup', function (event) {


            scope.$apply(scope.isError = false);
            scope.$apply(scope.disabledNextButton = true);

            var code = (event.keyCode || event.which);

            if (code == 13) {
                event.preventDefault();
            }

            // arrow and backspace handler
            if (code == 37 || code == 38 || code == 39 || code == 40) {
                return;
            }


            var correctAnswer = scope.answer;
            var userAnswer = spanAnswer.text();


            //  replace 160 space to  default space
            userAnswer = userAnswer.replace(new RegExp(String.fromCharCode(160), "g"), String.fromCharCode(32));

            if (equals(correctAnswer, userAnswer)) {
                scope.$apply(scope.disabledNextButton = false);
                isAnswerRight = true;
                return
            }

            var rightPart = '';
            var wrongPart = '';
            var wrongStart = -1;

            for (var i = 0; i < userAnswer.length; i++) {

                if (undefined == correctAnswer[i]) {
                    wrongStart = i;
                    scope.$apply(scope.isError = true);
                    isAnswerRight = false;
                    break;
                }

                if (userAnswer[i].toLowerCase() !== correctAnswer[i].toLowerCase()) {
                    wrongStart = i;
                    scope.$apply(scope.isError = true);
                    isAnswerRight = false;
                    break;
                }

            }


            if (wrongStart !== -1) {
                rightPart = userAnswer.slice(0, wrongStart);
                wrongPart = userAnswer.slice(wrongStart);
            } else {
                rightPart = userAnswer;
            }

            scope.rightPart = rightPart.replace(new RegExp(String.fromCharCode(32), "g"), String.fromCharCode(160));
            scope.wrongPart = wrongPart.replace(new RegExp(String.fromCharCode(32), "g"), String.fromCharCode(160));


            spanAnswer.html('');
            spanAnswer.html('<span class="good">' + scope.rightPart + '</span>' + '<span class="noGood">' + scope.wrongPart + '</span>');

            placeCaretAtEnd(spanAnswer[0]);


        });

        element.on('keydown keypress', function (event) {

            var code = (event.keyCode || event.which);

            if (code == 13 && isAnswerRight) {
                scope.nextTest();
                scope.$apply();
            }
        });


        function equals(string1, string2) {
            return string1.toLowerCase() === string2.toLowerCase();
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
    }

};
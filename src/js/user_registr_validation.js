$(document).ready(function () {



    var errors = {
        common:{
            fillInput: 'Field must be filled'
        },
        login:{
            latinLettersOrNumbers: 'Login must be latin letters or numbers',
            restrictionOfLetters : 'Login must contain more than 4 and less than 15 characters',
            loginNotUnique: 'This login is already taken. Try another.'

        },
        password:{
            latinLettersOrNumbers: 'Password must be latin letters or numbers',
            restrictionOfLetters : 'Password must contain more than 4 and less than 15 characters'
        },
        email:{
            invalidEmail: 'Invalid email address'
        }
    };


    var modelOfForm = {
        login:{
            value: null,
            validation: null,
            error: null
        },
        password:{
            value: null,
            validation: null,
            error: null
        },
        email:{
            value: null,
            validation: null,
            error: null
        }
    };


    $("#login").blur(loginValidation);


    function loginValidation() {

        var login = $("#login").val();

        modelOfForm.login.value = login;
        modelOfForm.login.validation = false;


        if (isFieldEmpty(login)) {
            $('#loginError').text(errors.common.fillInput);
            modelOfForm.login.error = errors.common.fillInput;
            return
        }


        if (!isWordInRange(login)) {
            $('#loginError').text(errors.login.restrictionOfLetters);
            modelOfForm.login.error = errors.login.restrictionOfLetters;
            return
        }


        if (!loginValidWordAndNumbers(login)) {
            $('#loginError').text(errors.login.latinLettersOrNumbers);
            modelOfForm.login.error = errors.login.latinLettersOrNumbers;
            return
        }

        isLoginUnique(login)
    }



    function isWordInRange(word) {
        return word.length < 15 && word.length > 4
    }

    function isFieldEmpty(login) {
        return login == ""
    }




   function requestToServr(login) {

       return $.ajax({
            method: "get",
            dataType: "json",
            url: 'http://snpro.pl/test/bookworm/api/check_unique_login.php',
            data: {login: login}
        });

    }


    function isLoginUnique(login) {


        requestToServr(login)
            .then( function (data) {

                if (data.data == "true") {
                    $('#loginError').text('');
                    modelOfForm.login.validation = true;
                    modelOfForm.login.error = null;

                } else {
                    $('#loginError').text(errors.login.loginNotUnique);
                    modelOfForm.login.error = errors.login.loginNotUnique;
                }

            })
           .catch(function () {
            console.log(data);
            console.log('error');
        })

    }


    $("#password").blur(passwordValidation);


    function passwordValidation() {

        var password = $("#password").val();
        modelOfForm.password.value = password;
        modelOfForm.password.validation = false;


        if (isFieldEmpty(password)) {
            $('#passwordError').text(errors.common.fillInput);
            modelOfForm.password.error = errors.common.fillInput;
            return
        }


        if (!isWordInRange(password)) {
            $('#passwordError').text(errors.password.restrictionOfLetters);
            modelOfForm.password.error = errors.password.restrictionOfLetters;
            return
        }


        if (!loginValidWordAndNumbers(password)) {
            $('#passwordError').text(errors.password.latinLettersOrNumbers);
            modelOfForm.password.error = errors.password.latinLettersOrNumbers;
            return
        }

        $('#passwordError').text('');
        modelOfForm.password.validation = true;
        modelOfForm.email.error = null;

    }




    $("#email").blur(emailValidation);

    function emailValidation() {

        var email = $("#email").val();

        modelOfForm.email.value = email;
        modelOfForm.email.validation = false;

        if (isFieldEmpty(email)) {
            $('#emailError').text(errors.common.fillInput);
            modelOfForm.email.error = errors.common.fillInput;
            return
        }

        if (!addressValidation(email)) {
            $('#emailError').text(errors.email.invalidEmail);
            modelOfForm.email.error = errors.email.invalidEmail;
            return
        }

        $('#emailError').text('');

        modelOfForm.email.validation = true;
        modelOfForm.email.error = null;
    }





    function loginValidWordAndNumbers(login) {
        return /^[a-zA-Z0-9]+$/.test(login);
    }

    function addressValidation(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }




    function formValidation() {
        $('#submit').attr("disabled", true);

        for(var key in modelOfForm){
            if(modelOfForm[key].validation !== true){
                return
            }
        }

        $('#submit').removeAttr('disabled');
    }



    $(':input').blur(function () {
        formValidation();
    });


    function successMessage(){

        new PNotify({
            title: 'Success!',
            text: 'You have successfully registered.',
            type: 'success'
        });
    }


    function errorMessage(){

        console.log('errorMessage start');

        new PNotify({
            title: 'Error!',
            text: 'An error has occurred! You are not registred!',
            type: 'error'
        });

    }


    $('#submit').click(


    function (e) {

        e.preventDefault();
        sandToServer()
                .then( function (data) {

                    $("#login").val('');
                     $("#password").val('');
                    $("#email").val('');

                     modelOfForm = {
                        login:{
                            value: null,
                            validation: null,
                            error: null
                        },
                        password:{
                            value: null,
                            validation: null,
                            error: null
                        },
                        email:{
                            value: null,
                            validation: null,
                            error: null
                        }
                    };

                    formValidation();
                    successMessage();

                })
                .catch(function () {
                    console.log(data);
                    errorMessage();

                });

        }

    );



    function sandToServer() {

        var login = $("#login").val();
        var password = $("#password").val();
        var email = $("#email").val();


        return $.ajax({
            method: 'POST',
            dataType: "json",
            url: "http://snpro.pl/test/bookworm/api/register_user.php",
            data: {login: login, password: password, email: email}
        });


    }



});






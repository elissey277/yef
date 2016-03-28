function signUp(){
    document.getElementById("reg-error-msg").innerText = '';
    var errorMessage = '';
    $.ajax({
        type: "POST",
        url: "../ajax/auth-reg/canBeRegistred.php",
        data: "email=" + document.getElementById("reg-email").value,
        success: function (data) {
            if (data != 0) {
                errorMessage += landing[$.cookie('language')]['error-same-email'] + '\n';
            }
            if (document.getElementById("reg-email").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-email'] + '\n';
            }
            if (document.getElementById("reg-name").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-name'] + '\n';
            }
            if (document.getElementById("reg-password").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-pass'] + '\n';
            }
            if (document.getElementById("reg-password-confirm").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-pass-conf'] + '\n';
            }
            if (document.getElementById("reg-password").value != document.getElementById("reg-password-confirm").value) {
                errorMessage += landing[$.cookie('language')]['error-not-same-pass'] + '\n';
            }
            if(errorMessage != '') {
                document.getElementById("reg-error-msg").innerText = errorMessage;
            } else {
                $.ajax({
                    type: "POST",
                    url: "../ajax/auth-reg/registerUser.php",
                    data: "email=" + document.getElementById("reg-email").value +
                    "&name=" + document.getElementById("reg-name").value +
                    "&password=" + document.getElementById("reg-password").value,
                    success: function (data) {
                        sendEmailSignUp(document.getElementById("reg-email").value,document.getElementById("reg-name").value,document.getElementById("reg-password").value);
                        $.cookie("user",data,{path:'/'});
                        document.location.href = '/grammar/rules';
                    }
                });
            }
        }
    });
}

function signIn(){
    document.getElementById("auth-error-msg").innerText = '';
    var errorMessage = '';
    $.ajax({
        type: "POST",
        url: "../ajax/auth-reg/canBeAuthorized.php",
        data: "email=" + document.getElementById("auth-email").value + "&password=" + document.getElementById("auth-password").value,
        success: function (data) {
            if (data == -1) {
                errorMessage += landing[$.cookie('language')]['error-no-user'] + '\n';
            }
            if (document.getElementById("auth-email").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-email'] + '\n';
            }
            if (document.getElementById("auth-password").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-pass'] + '\n';
            }
            if(errorMessage != '') {
                document.getElementById("auth-error-msg").innerText = errorMessage;
            } else {
                $.cookie("user",data,{path:'/'});
                document.location.href = '/grammar/rules#all';
            }
        }
    });
}

function restorePass(){
    document.getElementById("rest-error-msg").innerText = '';
    var errorMessage = '';
    $.ajax({
        type: "POST",
        url: "../ajax/auth-reg/canBeRestored.php",
        data: "email=" + document.getElementById("rest-email").value,
        success: function (data) {
            if (data == -1) {
                errorMessage += landing[$.cookie('language')]['error-no-email'] + '\n';
            }
            if (document.getElementById("rest-email").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-email'] + '\n';
            }
            if(errorMessage != '') {
                document.getElementById("rest-error-msg").innerText = errorMessage;
            } else {
                sendEmailRestorePassword(document.getElementById("rest-email").value);
                document.getElementById("rest-error-msg").innerText = '';
                document.getElementById("rest-info-msg").innerHTML = landing[$.cookie('language')]['info-code'];
                document.getElementById("rest-email").disabled = true;
                document.getElementById("rest-code").style.display = "block";
                document.getElementById("rest-button").style.display = "none";
                document.getElementById("rest-button-code").style.display = "inline-block";
                document.getElementById("rest-code").focus();
            }
        }
    });
}

function confirmCode(){
    document.getElementById("rest-error-msg").innerText = '';
    document.getElementById("rest-info-msg").innerText = '';
    var errorMessage = '';
    $.ajax({
        type: "POST",
        url: "../ajax/auth-reg/isCorrectCode.php",
        data: "email=" + document.getElementById("rest-email").value + "&code=" + document.getElementById("rest-code").value,
        success: function (data) {
            if (data == 0) {
                errorMessage += landing[$.cookie('language')]['error-no-code'] + '\n';
            }
            if (document.getElementById("rest-code").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-code'] + '\n';
            }
            if(errorMessage != '') {
                document.getElementById("rest-error-msg").innerText = errorMessage;
            } else {
                document.getElementById("rest-error-msg").innerText = '';
                document.getElementById("rest-info-msg").innerHTML = landing[$.cookie('language')]['info-password'];
                document.getElementById("rest-code").style.display = "none";
                document.getElementById("rest-password").style.display = "block";
                document.getElementById("rest-password-confirm").style.display = "block";
                document.getElementById("rest-button-code").style.display = "none";
                document.getElementById("rest-button-save").style.display = "inline-block";
                document.getElementById("rest-password").focus();
            }
        }
    });
}

function savePassword(){
    document.getElementById("rest-error-msg").innerText = '';
    var errorMessage = '';
    if (document.getElementById("rest-password").value == '') {
        errorMessage += landing[$.cookie('language')]['error-empty-pass'] + '\n';
    }
    if (document.getElementById("rest-password-confirm").value == '') {
        errorMessage += landing[$.cookie('language')]['error-empty-pass-conf'] + '\n';
    }
    if (document.getElementById("rest-password").value != document.getElementById("rest-password-confirm").value) {
        errorMessage += landing[$.cookie('language')]['error-not-same-pass'] + '\n';
    }
    if(errorMessage != '') {
        document.getElementById("rest-error-msg").innerText = errorMessage;
    } else {
        $.ajax({
            type: "POST",
            url: "../ajax/auth-reg/changePassword.php",
            data: "email=" + document.getElementById("rest-email").value + "&password=" + document.getElementById("rest-password").value,
            success: function (data) {
                sendEmailChangePassword("email=" + document.getElementById("rest-email").value);
                $.cookie("user",data,{path:'/'});
                document.location.href = '/grammar/rules#all';
            }
        });
    }
}

function sendEmailSignUp(email){
    alert('Hello, User!\nYou\'ve signed up into Your English Friend.\nYour password: Password');
}

function sendEmailRestorePassword(email){
    prompt('Hello, User!\nYour code to restore password:', 'ec6a6536ca304edf844d1d248a4f08dc');
}

function sendEmailChangePassword(email){
    alert('Hello, User!\nYour password was changed.\n New password: Password');
}
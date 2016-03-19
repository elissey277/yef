function register(reload){
    document.getElementById("error-msg").innerText = '';
    var errorMessage = '';
    $.ajax({
        type: "POST",
        url: "../ajax/auth-reg/canBeRegistred.php",
        data: "email=" + document.getElementById("email").value,
        success: function (data) {
            if (data != 0) {
                errorMessage += landing[$.cookie('language')]['error-same-email'] + '\n';
            }
            if (document.getElementById("email").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-email'] + '\n';
            }
            if (document.getElementById("name").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-name'] + '\n';
            }
            if (document.getElementById("password").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-pass'] + '\n';
            }
            if(errorMessage != '') {
                document.getElementById("error-msg").innerText = errorMessage;
            } else {
                $.ajax({
                    type: "POST",
                    url: "../ajax/auth-reg/registerUser.php",
                    data: "email=" + document.getElementById("email").value +
                    "&name=" + document.getElementById("name").value +
                    "&password=" + document.getElementById("password").value,
                    success: function (data) {
                        $.cookie("user",data,{path:'/'});
                        if(reload) {
                            document.location.reload();
                        } else {
                            document.location.href = '/grammar/rules';
                        }
                    }
                });
            }
        }
    });
}

function authorize(reload){
    document.getElementById("error-msg").innerText = '';
    var errorMessage = '';
    $.ajax({
        type: "POST",
        url: "../ajax/auth-reg/canBeAuthorized.php",
        data: "email=" + document.getElementById("email").value + "&password=" + document.getElementById("password").value,
        success: function (data) {
            if (data == -1) {
                errorMessage += landing[$.cookie('language')]['error-no-user'] + '\n';
            }
            if (document.getElementById("email").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-email'] + '\n';
            }
            if (document.getElementById("password").value == '') {
                errorMessage += landing[$.cookie('language')]['error-empty-pass'] + '\n';
            }
            if(errorMessage != '') {
                document.getElementById("error-msg").innerText = errorMessage;
            } else {
                $.cookie("user",data,{path:'/'});
                if(reload) {
                    document.location.reload();
                } else {
                    document.location.href = '/grammar/rules';
                }
            }
        }
    });
}
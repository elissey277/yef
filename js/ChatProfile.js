var chatProfile = [
    {
        'first-name': "First name",
        'last-name': "Last name",
        'language': "Native language",
        'gender': "Gender",
        'gender-male': "Male",
        'gender-female': "Female",
        'gender-other': "Other",
        'date-of-birth': "Date of birth",
        'about-me': "About me",
        'button-add': "Add to friends",
        'button-accept': "Accept request",
        'button-deny': "Deny request",
        'button-cancel': "Cancel request",
        'button-remove': "Remove from friends",
        'button-edit': "Edit profile",
        'button-save': "Save",
        'button-cancel-save': "Cancel",
        'button-send': "Send message",
        'friends': "Friends",
        'view-all': "view all",
        'email': "Email",
        'password': "Password",
        'old-password': "Old password",
        'new-password': "New password",
        'confirm-password': "Confirm password",
        'error-empty-pass-old': "Old password should be inputted.",
        'error-empty-pass-new': "New password should be inputted.",
        'error-empty-pass-conf': "Confirm password should be inputted.",
        'error-not-same-pass': "New password and Confirm password don't match.",
        'error-old-pass-incorrect': "Old password is not correct.",
        'password-saved': "Password was saved.",
        'button-change-photo': "Change photo",
        'button-delete-photo': "Delete photo",
        'button-confirm-delete': "Confirm deletion"
    },
    {
        'first-name': "Имя",
        'last-name': "Фамилия",
        'language': "Родной язык",
        'gender': "Пол",
        'gender-male': "Мужской",
        'gender-female': "Женский",
        'gender-other': "Другой",
        'date-of-birth': "Дата рождения",
        'about-me': "Обо мне",
        'button-add': "Добавить в друзья",
        'button-accept': "Принять заявку",
        'button-deny': "Отклонить заявку",
        'button-cancel': "Отменить заявку",
        'button-remove': "Удалить из друзей",
        'button-edit': "Редактировать профиль",
        'button-save': "Сохранить",
        'button-cancel-save': "Отменить",
        'button-send': "Отправить сообщение",
        'friends': "Друзья",
        'view-all': "смотреть всех",
        'email': "Email",
        'password': "Пароль",
        'old-password': "Старый пароль",
        'new-password': "Новый пароль",
        'confirm-password': "Подтверждение пароля",
        'error-empty-pass-old': "Старый пароль должен быть введен.",
        'error-empty-pass-new': "Новый пароль должен быть введен.",
        'error-empty-pass-conf': "Подверждение пароля должно быть введено.",
        'error-not-same-pass': "Новый пароль и Подтверждение пароля не совпадают.",
        'error-old-pass-incorrect': "Старый пароль введен не правильно.",
        'password-saved': "Пароль был сохранен.",
        'button-change-photo': "Изменить фото",
        'button-delete-photo': "Удалить фото",
        'button-confirm-delete': "Подтвердить удаление"
    }
];

function updateContent(language,divContent){
    if(!isAuthorized()) {
        location.hash = '';
        load();
    } else {
        updateLastActivity();
        divContent.innerHTML = '';
        if(getParam('my_edit') != -1) {
            contentMyEdit(language,divContent);
        } else if(getParam('my') != -1 || getParam('id=') == $.cookie('user')) {
            contentMy(language,divContent);
        } else if(getParam('id=') != -1) {
            contentOther(language,divContent);
        } else {
            defaultTab(language,divContent);
        }
    }
}

function contentMy(language,divContent) {
    $.ajax({
        type: "POST",
        url: "../../ajax/chat/profile/getProfile.php",
        data: "id=" + $.cookie('user'),
        success: function (data) {
            var item = JSON.parse(data);
            divContent.innerHTML += contentProfile(language, item);
            getActions(language, item[9]);
            for(var i=0; i<item[10].length-1; i++) {
                getFriendActions(language, item[10][i][0], item[10][i][4])
            }
        }
    });
}

function contentMyEdit(language,divContent) {
    $.ajax({
        type: "POST",
        url: "../../ajax/chat/profile/getProfile.php",
        data: "id=" + $.cookie('user'),
        success: function (data) {
            var item = JSON.parse(data);
            divContent.innerHTML += contentProfileEdit(language, item);
            getEditActions(language, item);
        }
    });
}

function contentOther(language,divContent) {
    $.ajax({
        type: "POST",
        url: "../../ajax/chat/profile/getProfile.php",
        data: "id=" + getParam('id='),
        success: function (data) {
            var item = JSON.parse(data);
            divContent.innerHTML += contentProfile(language, item);
            getActions(language, item[9]);
            for(var i=0; i<item[10].length-1; i++) {
                getFriendActions(language, item[10][i][0], item[10][i][4])
            }
        }
    });
}

function defaultTab(language,divContent) {
    document.location.hash = '#profile';
    updateContent(language,divContent);
}

function contentProfile(language,item) {
    var cont = '';
    if(item[4] == null){
        cont += '<p class="page-header">'+item[3]+'</p>'
    } else {
        cont += '<p class="page-header">'+item[3]+' '+item[4]+'</p>'
    }
    cont += '<table>';
    cont += '<tr>';
    cont += '<td style="vertical-align: top">';
    if(item[2] == '') {
        cont += '<img src="/images/photos/no-photo.png" style="width: 250px; height: 250px; border: 1px solid #0060B0"><br>';
    } else {
        cont += '<img src="/images/photos/'+item[2]+'" style="width: 250px; height: 250px; border: 1px solid #0060B0"><br>';
    }
    cont += '<div id="actions"></div>';
    cont += '</td>';
    cont += '<td>';
    cont += '<table>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>Id</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<p class="page-text">'+item[0]+'</p>';
        cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['date-of-birth']+'</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<p class="page-text">'+formattedDate(item[7])+'</p>';
        cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['language']+'</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<p class="page-text">'+item[5]+'</p>';
        cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['gender']+'</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            switch(parseInt(item[6])) {
                case 0:
                    cont += '<p class="page-text">' + chatProfile[language]['gender-female'] + '</p>';
                    break;
                case 1:
                    cont += '<p class="page-text">' + chatProfile[language]['gender-male'] + '</p>';
                    break;
                case 2:
                    cont += '<p class="page-text">' + chatProfile[language]['gender-other'] + '</p>';
                    break;
                default:
                    cont += '<p class="page-text">-</p>';
                    break;
            }
        cont += '</td>';
    cont += '</tr>';
        cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['about-me']+'</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<p class="page-text">'+item[8].replace(/\n/g, "<br>")+'</p>';
        cont += '</td>';
    cont += '</tr>';
    cont += '</table>';
    cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
    cont += '<td style="vertical-align: top" colspan="2">';
    cont += '<p class="page-title">'+chatProfile[language]['friends']+
    ' <a onclick="location.hash = \'#friends?id='+item[0]+'\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">('+chatProfile[language]['view-all']+' '+item[10][item[10].length-1]+')</a>'+'</p>'
    cont += '<div class="user-friends-div">';
    for(var i=0; i<item[10].length-1; i++){
        cont += '<div class="user-friend-div">';
        if(item[10][i][1] == '') {
            cont += '<img src="/images/photos/no-photo.png" style="width: 150px; height: 150px; border: 1px solid #0060B0"><br>';
        } else {
            cont += '<img src="/images/photos/'+item[10][i][1]+'" style="width: 100px; height: 100px; border: 1px solid #0060B0"><br>';
        }
        if(item[4] == null){
            cont += '<a onclick="location.hash = \'#profile?id='+item[10][i][0]+'\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" class="friend-text">'+item[10][i][2]+'</a>'
        } else {
            cont += '<a onclick="location.hash = \'#profile?id='+item[10][i][0]+'\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" class="friend-text">'+item[10][i][2]+' '+item[10][i][3]+'</a>'
        }
        cont += '<div id="actions'+item[10][i][0]+'"></div>';
        cont += '</div>';
    }
    cont += '</div>';
    cont += '</td>';
    cont += '</tr>';
    cont += '</table>';
    return cont;
}

function contentProfileEdit(language,item) {
    var cont = '';
    if(item[4] == null){
        cont += '<p class="page-header">'+item[3]+'</p>'
    } else {
        cont += '<p class="page-header">'+item[3]+' '+item[4]+'</p>'
    }
    cont += '<table>';
    cont += '<tr>';
    cont += '<td style="vertical-align: top">';
    if(item[2] == '') {
        cont += '<img src="/images/photos/no-photo.png" style="width: 250px; height: 250px; border: 1px solid #0060B0"><br>';
    } else {
        cont += '<img src="/images/photos/'+item[2]+'" style="width: 250px; height: 250px; border: 1px solid #0060B0"><br>';
    }
    cont += '<div id="actions"></div>';
    cont += '</td>';
    cont += '<td>';
    cont += '<table>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['first-name']+'</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<p class="page-text"><input id="first-name" type="text" class="search-input" style="width: 350px" value="'+item[3]+'"></p>';
        cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['last-name']+'</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<p class="page-text"><input id="last-name" type="text" class="search-input" style="width: 350px" value="'+item[4]+'"></p>';
        cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['email']+'</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<p class="page-text"><input id="email" type="text" class="search-input" style="width: 350px" value="'+item[1]+'"></p>';
        cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['date-of-birth']+'</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<p class="page-text"><input id="date-of-birth" type="date" value="'+item[7]+'"></p>';
        cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['language']+'</b></p>';
    cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<select class="search-select" style="width: 100px; margin: 0" id="language">';
            cont += '<option value="1">Русский</option>';
            cont += '</select>';
        cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['gender']+'</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<select class="search-select" style="width: 100px; margin: 0" id="gender">';
            var active = [];
            for(var i=0; i<3; i++) {
                if(item[6] == i) {
                    active[active.length] = ' selected ';
                } else {
                    active[active.length] = '';
                }
            }
            cont += '<option value="0"'+active[0]+'>' + chatProfile[language]['gender-female'] + '</option>';
            cont += '<option value="1"'+active[1]+'>' + chatProfile[language]['gender-male'] + '</option>';
            cont += '<option value="2"'+active[2]+'>' + chatProfile[language]['gender-other'] + '</option>';
            cont += '</select>';
        cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
        cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
            cont += '<p class="page-text"><b>'+chatProfile[language]['about-me']+'</b></p>';
        cont += '</td>';
        cont += '<td style="text-align: left; vertical-align: top">';
            cont += '<p class="page-text"><textarea id="about-me" class="search-input" style="width: 350px; height: 100px">'+item[8]+'</textarea></p>';
        cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
    cont += '<td style="text-align: right; width: 150px; vertical-align: top; padding-bottom: 10px">';
    cont += '<p class="text-action" onclick="document.getElementById(\'change-password\').style.display = \'block\'"><b>'+chatProfile[language]['password']+'</b></p>';
    cont += '</td>';
    cont += '<td style="text-align: left; vertical-align: top">';
    cont += '<div id="change-password" style="display: none">';
    cont += '<a class="error-text" id="pass-error">\n</a>';
    cont += '<a class="page-text"><input id="old-pass" type="password" class="search-input" style="width: 200px; margin-bottom: 3px" placeholder="'+chatProfile[language]['old-password']+'"></a><br>';
    cont += '<a class="page-text"><input id="new-pass" type="password" class="search-input" style="width: 200px; margin-bottom: 3px" placeholder="'+chatProfile[language]['new-password']+'"></a><br>';
    cont += '<a class="page-text"><input id="confirm-pass" type="password" class="search-input" style="width: 200px; margin-bottom: 3px" placeholder="'+chatProfile[language]['confirm-password']+'"></a><br>';
    cont += '<a class="text-action" onclick="savePass(\''+item[1]+'\')">'+chatProfile[language]['button-save']+'</a> ';
    cont += '<a class="text-action" onclick="document.getElementById(\'change-password\').style.display = \'none\'">'+chatProfile[language]['button-cancel-save']+'</a>';
    cont += '</div>';
    cont += '</td>';
    cont += '</tr>';
    cont += '<tr>';
    cont += '<td></td>';
    cont += '<td style="text-align: left; vertical-align: top">';
    cont += '<input type="text" class="user-action" style="width: 120px" onclick="saveProfile();" value="' + chatProfile[language]['button-save'] + '">';
    cont += ' <input type="text" class="user-action" style="width: 120px" onclick="location.hash = \'#profile?my\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" value="' + chatProfile[language]['button-cancel-save'] + '">';
    cont += '</td>';
    cont += '</tr>';
    cont += '</table>';
    cont += '</td>';
    cont += '</tr>';
    cont += '</table>';
    return cont;
}

function getActions(language,isAccepted){
    var act = '';
    if(getParam('my') != -1 || getParam('id=') == $.cookie('user')) {
        act += '<input type="text" class="user-action" onclick="location.hash = \'#profile?my_edit\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" value="' + chatProfile[language]['button-edit'] + '">';
    } else {
        if(isAccepted == null || isAccepted == '') {
            act += '<input type="text" class="user-action" onclick="addToFriends(getParam(\'id=\'));" value="' + chatProfile[language]['button-add'] + '">';
        } else if(isAccepted == 0) {
            act += '<input type="text" class="user-action" onclick="acceptRequest(getParam(\'id=\'));" value="' + chatProfile[language]['button-accept'] + '">';
            act += '<input type="text" class="user-action" onclick="denyRequest(getParam(\'id=\'));" value="' + chatProfile[language]['button-deny'] + '">';
        } else if(isAccepted == 1) {
            act += '<input type="text" class="user-action" onclick="cancelRequest(getParam(\'id=\'));" value="' + chatProfile[language]['button-cancel'] + '">';
        } else if(isAccepted == 2) {
            act += '<input type="text" class="user-action" onclick="location.hash = \'#messages?id='+getParam('id=')+'\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" value="' + chatProfile[language]['button-send'] + '">';
            act += '<input type="text" class="user-action" onclick="removeFromFriends(getParam(\'id=\'));" value="' + chatProfile[language]['button-remove'] + '">';
        }
    }
    document.getElementById('actions').innerHTML = act;
}

function getEditActions(language,item){
    var act = '';
    act += '<input type="text" class="user-action" onclick="location.hash = \'#profile?my_edit\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" value="' + chatProfile[language]['button-edit'] + '">';
    act += '<input type="text" class="user-action" onclick="removeFromFriends(getParam(\'id=\'));" value="' + chatProfile[language]['button-remove'] + '">';
    document.getElementById('actions').innerHTML = act;
}

function getFriendActions(language,id,isAccepted){
    var act = '';
    if(id != $.cookie('user')) {
        if(isAccepted == null || isAccepted == '') {
            act += '<input type="text" class="user-action-small" onclick="addToFriends('+id+',true);" value="' + chatProfile[language]['button-add'] + '">';
        } else if(isAccepted == 0) {
            act += '<input type="text" class="user-action-small" onclick="acceptRequest('+id+',true);" value="' + chatProfile[language]['button-accept'] + '">';
            act += '<input type="text" class="user-action-small" onclick="denyRequest('+id+',true);" value="' + chatProfile[language]['button-deny'] + '">';
        } else if(isAccepted == 1) {
            act += '<input type="text" class="user-action-small" onclick="cancelRequest('+id+',true);" value="' + chatProfile[language]['button-cancel'] + '">';
        } else if(isAccepted == 2) {
            act += '<input type="text" class="user-action-small" onclick="removeFromFriends('+id+',true);" value="' + chatProfile[language]['button-remove'] + '">';
        }
    }
    document.getElementById('actions'+id).innerHTML = act;
}

function formattedDate(date) {
    var d = date.split('-');
    return [d[1], d[2], d[0]].join('/');
}

function savePass(email){
    document.getElementById("pass-error").innerText = '';
    var errorMessage = '';
    if (document.getElementById("old-pass").value == '') {
        errorMessage += chatProfile[$.cookie('language')]['error-empty-pass-old'] + '\n';
    }
    if (document.getElementById("new-pass").value == '') {
        errorMessage += chatProfile[$.cookie('language')]['error-empty-pass-new'] + '\n';
    }
    if (document.getElementById("confirm-pass").value == '') {
        errorMessage += chatProfile[$.cookie('language')]['error-empty-pass-conf'] + '\n';
    }
    if (document.getElementById("new-pass").value != document.getElementById("confirm-pass").value) {
        errorMessage += chatProfile[$.cookie('language')]['error-not-same-pass'] + '\n';
    }
    if(errorMessage != '') {
        document.getElementById("pass-error").innerText = errorMessage;
    } else {
        $.ajax({
            type: "POST",
            url: "../ajax/auth-reg/isCorrectPassword.php",
            data: "email=" + email + "&password=" + document.getElementById("old-pass").value,
            success: function (data) {
                if(data == 1) {
                    $.ajax({
                        type: "POST",
                        url: "../ajax/auth-reg/changePassword.php",
                        data: "email=" + email + "&password=" + document.getElementById("new-pass").value,
                        success: function () {
                            document.getElementById("change-password").innerHTML = '<p class="page-text">' + chatProfile[$.cookie('language')]['password-saved'] + '</p>';
                        }
                    });
                } else {
                    document.getElementById("pass-error").innerText = chatProfile[$.cookie('language')]['error-old-pass-incorrect'] + '\n';
                }
            }
        });
    }
}

function saveProfile(){
    $.ajax({
        type: "POST",
        url: "../ajax/chat/profile/editProfile.php",
        data: "id=" + $.cookie('user') + "&firstName=" + document.getElementById("first-name").value + "&lastName=" + document.getElementById("last-name").value
            + "&email=" + document.getElementById("email").value + "&dateOfBirth=" + document.getElementById("date-of-birth").value
            + "&language=" + document.getElementById("language").value + "&gender=" + document.getElementById("gender").value
            + "&aboutMe=" + document.getElementById("about-me").value,
        success: function () {
            location.hash = '#profile?my';
            updateContent($.cookie('language'),document.getElementById('div-content'));
        }
    });
}
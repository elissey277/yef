var advice = [
    {
        'page-header': "Advice",
        'not-found': "Advice are not found."
    },
    {
        'page-header': "Советы",
        'not-found': "Советы не найдены."
    }
];

function updateContent(language,divContent){
    divContent.innerHTML = '';
    if(getParam('all') != -1) {
        divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-all"]+'">';
        if(isAuthorized()){
            divContent.innerHTML += '<input onclick="document.location.hash = \'#liked\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-liked"]+'">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-recommended"]+'"></br>';
        }
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdviceList.php",
            data: "language=" + language,
            success: function (data) {
                var advices = JSON.parse(data);
                var cont = '';
                if(advices.length>0){
                    cont += '<table>';
                    for (var i=0; i<advices.length; i++) {
                        cont += '<tr>' +
                        '<td><img class="list-image" src="http://' + location.hostname + advices[i][2] + '"></td>' +
                        '<td><p class="list-text" onclick="document.location.hash = \'#id=' + advices[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + advices[i][1] + '</p></td>' +
                        '</tr>';
                    }
                    cont += '</table>';
                } else {
                    cont += '<p class="not-found-text">'+advice[language]['not-found']+'</p>'
                }
                divContent.innerHTML += cont;
            }
        });
    }
    else if(getParam('liked') != -1) {
        if(isAuthorized()) {
            divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#all\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
            divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-liked"]+'">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-recommended"]+'"></br>';
            $.ajax({
                type: "POST",
                url: "../ajax/advice/getAdviceLikedList.php",
                data: "language=" + language + "&user=" + $.cookie('user'),
                success: function (data) {
                    var advices = JSON.parse(data);
                    var cont = '';
                    if(advices.length>0){
                        cont += '<table>';
                        for (var i=0; i<advices.length; i++) {
                            cont += '<tr>' +
                            '<td><img class="list-image" src="http://' + location.hostname + advices[i][2] + '"></td>' +
                            '<td><p class="list-text" onclick="document.location.hash = \'#id=' + advices[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + advices[i][1] + '</p></td>' +
                            '</tr>';
                        }
                        cont += '</table>';
                    } else {
                        cont += '<p class="not-found-text">'+advice[language]['not-found']+'</p>'
                    }
                    divContent.innerHTML += cont;
                }
            });
        } else {
            document.location.hash = '#all';
            updateContent($.cookie('language'),document.getElementById('div-content'));
        }
    }
    else if(getParam('recommended') != -1) {
        if(isAuthorized()) {
            divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#all\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#liked\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-liked"]+'">';
            divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-recommended"]+'"></br>';
            $.ajax({
                type: "POST",
                url: "../ajax/advice/getAdviceRecommendedList.php",
                data: "language=" + language + "&user=" + $.cookie('user'),
                success: function (data) {
                    if(data != '') {
                        var advices = JSON.parse(data);
                    } else {
                        var advices = [];
                    }
                    var cont = '';
                    if(advices.length>0){
                        cont += '<table>';
                        for (var i=0; i<advices.length; i++) {
                            cont += '<tr>' +
                            '<td><img class="list-image" src="http://' + location.hostname + advices[i][2] + '"></td>' +
                            '<td><p class="list-text" onclick="document.location.hash = \'#id=' + advices[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + advices[i][1] + '</p></td>' +
                            '</tr>';
                        }
                        cont += '</table>';
                    } else {
                        cont += '<p class="not-found-text">'+advice[language]['not-found']+'</p>'
                    }
                    divContent.innerHTML += cont;
                }
            });
        } else {
            document.location.hash = '#all';
            updateContent($.cookie('language'),document.getElementById('div-content'));
        }
    }
    else if(getParam('id') != -1) {
        divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#all\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
        if(isAuthorized()){
            divContent.innerHTML += '<input onclick="document.location.hash = \'#liked\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-liked"]+'">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-recommended"]+'"></br>';
        }
        if(isAuthorized()){
            var user = $.cookie('user');
        } else {
            var user = 0;
        }
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdvice.php",
            data: "language=" + language + "&id=" + getParam('id') + "&user=" + user,
            success: function (data) {
                var advice = JSON.parse(data);
                divContent.innerHTML += '<table><tr><td><img class="advice-image" height="100" src="http://'+location.hostname+advice[3]+'"></td>' +
                    '<td><a class="page-title">'+advice[1]+'</a></td></tr></table>'+'<p class="page-text">'+advice[2]+'</p>';
                if(isAuthorized()){
                    if(advice[4] == 0) {
                        divContent.innerHTML += '<div id="like"><input type="button" class="not-liked" value="'+advice[5]+' &#10084;" onclick="like()"></div>';
                    } else {
                        divContent.innerHTML += '<div id="like"><input type="button" class="liked" value="'+advice[5]+' &#10084;" onclick="unlike()"></div>';
                    }
                }
            }
        });
    } else {
        document.location.hash = '#all';
        updateContent($.cookie('language'),document.getElementById('div-content'));
    }
}

function like(){
    $.ajax({
        type: "POST",
        url: "../ajax/advice/likeAdvice.php",
        data: "id=" + getParam('id') + "&user=" + $.cookie('user'),
        success: function (data) {
            document.getElementById("like").innerHTML = '<input type="button" class="liked" value="'+data+' &#10084;" onclick="unlike()">';
        }
    });
}

function unlike(){
    $.ajax({
        type: "POST",
        url: "../ajax/advice/unlikeAdvice.php",
        data: "id=" + getParam('id') + "&user=" + $.cookie('user'),
        success: function (data) {
            document.getElementById("like").innerHTML = '<input type="button" class="not-liked" value="'+data+' &#10084;" onclick="like()">';
        }
    });
}
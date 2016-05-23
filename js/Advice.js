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
    updateLastActivity();
    divContent.innerHTML = '';
    if(getParam('all') != -1) {
        contentAll(language,divContent);
    } else if(getParam('liked') != -1) {
        contentLiked(language,divContent);
    } else if(getParam('recommended') != -1) {
        contentRecommended(language,divContent);
    } else if(getParam('id') != -1) {
        contentId(language,divContent);
    } else {
        defaultTab(language,divContent);
    }
}

function contentAll(language,divContent) {
    contentHeader(language,divContent);
    contentTabs(language,divContent,1);
    $.ajax({
        type: "POST",
        url: "../ajax/advice/getAdviceList.php",
        data: "language=" + language,
        success: function (data) {
            divContent.innerHTML += contentList(language,JSON.parse(data));
        }
    });
}

function contentLiked(language,divContent) {
    if(isAuthorized()) {
        contentHeader(language,divContent);
        contentTabs(language,divContent,2);
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdviceLikedList.php",
            data: "language=" + language + "&user=" + $.cookie('user'),
            success: function (data) {
                divContent.innerHTML += contentList(language,JSON.parse(data));
            }
        });
    } else {
        defaultTab(language,divContent);
    }
}

function contentRecommended(language,divContent) {
    if(isAuthorized()) {
        contentHeader(language,divContent);
        contentTabs(language,divContent,3);
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdviceRecommendedList.php",
            data: "language=" + language + "&user=" + $.cookie('user'),
            success: function (data) {
                if(data == ''){
                    divContent.innerHTML += contentList(language,[]);
                } else {
                    divContent.innerHTML += contentList(language,JSON.parse(data));
                }
            }
        });
    } else {
        defaultTab(language,divContent);
    }
}

function contentId(language,divContent) {
    contentHeader(language,divContent);
    contentTabs(language,divContent,0);
    if(isAuthorized()){
        var user = $.cookie('user');
    } else {
        var user = 0;
    }
    $.ajax({
        type: "POST",
        url: "../ajax/advice/getAdvice.php",
        data: "language=" + language + "&id=" + getParam('id=') + "&user=" + user,
        success: function (data) {
            var item = JSON.parse(data);
            if(item[0] == null) {
                defaultTab(language,divContent);
            } else {
                divContent.innerHTML += contentItem(language,item);
            }
        }
    });
}

function defaultTab(language,divContent) {
    document.location.hash = '#advice?all';
    updateContent(language,divContent);
}

function contentHeader(language,divContent) {
    divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
}

function contentTabs(language,divContent,activeTab) {
    if(activeTab == 1){
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-all"]+'">';
    } else {
        divContent.innerHTML += '<input onclick="document.location.hash = \'#advice?all\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
    }
    if(isAuthorized()){
        if(activeTab == 2) {
            divContent.innerHTML += '<input type="button" class="submenu-button-active" value="' + titles[language]["button-liked"] + '">';
        } else {
            divContent.innerHTML += '<input onclick="document.location.hash = \'#advice?liked\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="' + titles[language]["button-liked"] + '">';
        }
        if(activeTab == 3) {
            divContent.innerHTML += '<input type="button" class="submenu-button-active" value="' + titles[language]["button-recommended"] + '"></br>';
        } else {
            divContent.innerHTML += '<input onclick="document.location.hash = \'#advice?recommended\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="' + titles[language]["button-recommended"] + '"></br>';
        }
    }
}

function contentList(language,items) {
    var cont = '';
    if(items.length>0){
        cont += '<table>';
        for (var i=0; i<items.length; i++) {
            cont += '<tr>' +
            '<td><img class="list-image" src="http://' + location.hostname + items[i][2] + '"></td>' +
            '<td><p class="list-text" onclick="document.location.hash = \'#advice?id=' + items[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + items[i][1] + '</p></td>' +
            '</tr>';
        }
        cont += '</table>';
    } else {
        cont += '<p class="not-found-text">'+advice[language]['not-found']+'</p>'
    }
    return cont;
}

function contentItem(language,item) {
    var cont = '';
    cont += '<table><tr><td><img class="advice-image" height="100" src="http://'+location.hostname+item[3]+'"></td>' +
    '<td><a class="page-title">'+item[1]+'</a></td></tr></table>'+'<p class="page-text">'+item[2]+'</p>';
    if(isAuthorized()){
        if(item[4] == 0) {
            cont += '<div id="like"><input type="button" class="not-liked" value="'+item[5]+' &#10084;" onclick="like()"></div>';
        } else {
            cont += '<div id="like"><input type="button" class="liked" value="'+item[5]+' &#10084;" onclick="unlike()"></div>';
        }
    }
    return cont;
}

function like(){
    updateLastActivity();
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
    updateLastActivity();
    $.ajax({
        type: "POST",
        url: "../ajax/advice/unlikeAdvice.php",
        data: "id=" + getParam('id') + "&user=" + $.cookie('user'),
        success: function (data) {
            document.getElementById("like").innerHTML = '<input type="button" class="not-liked" value="'+data+' &#10084;" onclick="like()">';
        }
    });
}
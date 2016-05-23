var grammarRules = [
    {
        'page-header': "Grammar",
        'not-found': "Grammar rules are not found."
    },
    {
        'page-header': "Грамматика",
        'not-found': "Правила грамматики не найдены."
    }
];

function updateContent(language,divContent){
    updateLastActivity();
    divContent.innerHTML = '';
    if(getParam('all') != -1) {
        contentAll(language,divContent);
    } else if(getParam('liked') != -1) {
        contentLiked(language,divContent);
    } else if(getParam('id') != -1) {
        contentId(language,divContent);
    } else {
        defaultTab(language,divContent);
    }
}

function contentAll(language,divContent) {
    contentHeader(language,divContent);
    contentTabs(language,divContent,1);
    if(language == 0) {
        var lang = 1;
    } else {
        var lang = language;
    }
    $.ajax({
        type: "POST",
        url: "../../ajax/grammar/rules/getRulesList.php",
        data: "language=" + lang,
        success: function (data) {
            divContent.innerHTML += contentList(language, JSON.parse(data), 'all', true);
        }
    });
}

function contentLiked(language,divContent) {
    if (isAuthorized()) {
        contentHeader(language, divContent);
        contentTabs(language, divContent, 2);
        if(language == 0) {
            var lang = 1;
        } else {
            var lang = language;
        }
        $.ajax({
            type: "POST",
            url: "../../ajax/grammar/rules/getRulesLikedList.php",
            data: "language=" + lang + "&user=" + $.cookie('user'),
            success: function (data) {
                divContent.innerHTML += contentList(language, JSON.parse(data), 'liked', false);
            }
        });
    } else {
        defaultTab(language, divContent);
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
    if(language == 0) {
        var lang = 1;
    } else {
        var lang = language;
    }
    $.ajax({
        type: "POST",
        url: "../../ajax/grammar/rules/getRule.php",
        data: "language=" + lang + "&id=" + getParam('id=') + "&user=" + user,
        success: function (data) {
            var item = JSON.parse(data);
            if(item[0] == null) {
                defaultTab(language,divContent);
            } else {
                divContent.innerHTML += contentItem(language, JSON.parse(data));
            }
        }
    });
}

function defaultTab(language,divContent) {
    document.location.hash = '#all';
    updateContent(language,divContent);
}

function contentHeader(language,divContent) {
    divContent.innerHTML += '<p class="page-header">'+grammarRules[language]["page-header"]+'</p>';
}

function contentTabs(language,divContent,activeTab) {
    if(activeTab == 1){
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-all"]+'">';
    } else {
        divContent.innerHTML += '<input onclick="document.location.hash = \'#rules?all\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
    }
    if(isAuthorized()){
        if(activeTab == 2) {
            divContent.innerHTML += '<input type="button" class="submenu-button-active" value="' + titles[language]["button-liked"] + '">';
        } else {
            divContent.innerHTML += '<input onclick="document.location.hash = \'#rules?liked\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="' + titles[language]["button-liked"] + '">';
        }
    }
}

function contentList(language,items,link,hasHeaders) {
    var cont = '';
    if(items.length>0){
        cont += '<table style="width: 100%;">';
        for (var i=0; i<items.length; i++) {
            if(items[i][2]==1 && hasHeaders) {
                cont += '<tr><td style="width: 300px"><p class="list-text" style="margin: 10px 0 0 20px; font-weight: bold" onclick="document.location.hash = \'#rules?id=' + items[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + items[i][1] + '</p></td></tr>';
            } else {
                cont += '<tr><td style="width: 300px"><p class="list-text" style="margin: 10px 0 0 20px" onclick="document.location.hash = \'#rules?id=' + items[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + items[i][1] + '</p></td></tr>';
            }
        }
        cont += '</table>';
    } else {
        cont += '<p class="not-found-text">'+grammarRules[language]['not-found']+'</p>'
    }
    return cont;
}

function contentItem(language,item) {
    var cont = '';
    cont += '<p class="page-title">'+item[1]+'</p>'+
            item[2];
    if(isAuthorized()){
        if(item[3] == 0) {
            cont += '<div id="like"><input type="button" class="not-liked" value="'+item[4]+' &#10084;" onclick="like()"></div>';
        } else {
            cont += '<div id="like"><input type="button" class="liked" value="'+item[4]+' &#10084;" onclick="unlike()"></div>';
        }
    }
    return cont;
}

function like(){
    updateLastActivity();
    $.ajax({
        type: "POST",
        url: "../../ajax/grammar/rules/likeRule.php",
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
        url: "../../ajax/grammar/rules/unlikeRule.php",
        data: "id=" + getParam('id') + "&user=" + $.cookie('user'),
        success: function (data) {
            document.getElementById("like").innerHTML = '<input type="button" class="not-liked" value="'+data+' &#10084;" onclick="like()">';
        }
    });
}
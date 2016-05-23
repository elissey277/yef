var vocabularySynonyms = [
    {
        'page-header': "Synonyms",
        'not-found': "Synonyms are not found."
    },
    {
        'page-header': "Синонимы",
        'not-found': "Синонимы не найдены."
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
    } else if(getParam('search') != -1) {
        if($.cookie('searchSynonyms') == null || $.cookie('searchSynonyms') == 'null' || $.cookie('searchSynonyms') == undefined){
            clearSearchParameters();
        }
        contentSearch(language,divContent);
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
        url: "../../ajax/vocabulary/synonyms/getSynonymsList.php",
        data: "language=" + language + "&page=" + getParam('page='),
        success: function (data) {
            divContent.innerHTML += contentList(language,JSON.parse(data),'synonyms?all&');
        }
    });
}

function contentLiked(language,divContent) {
    if (isAuthorized()) {
        contentHeader(language, divContent);
        contentTabs(language, divContent, 2);
        $.ajax({
            type: "POST",
            url: "../../ajax/vocabulary/synonyms/getSynonymsLikedList.php",
            data: "language=" + language + "&user=" + $.cookie('user') + "&page=" + getParam('page='),
            success: function (data) {
                divContent.innerHTML += contentList(language, JSON.parse(data), 'synonyms?liked&');
            }
        });
    } else {
        defaultTab(language, divContent);
    }
}

function contentRecommended(language,divContent) {
    if(isAuthorized()) {
        contentHeader(language,divContent);
        contentTabs(language,divContent,3);
        $.ajax({
            type: "POST",
            url: "../../ajax/vocabulary/synonyms/getSynonymsRecommendedList.php",
            data: "language=" + language + "&user=" + $.cookie('user') + "&page=" + getParam('page='),
            success: function (data) {
                if(data == '') {
                    var items = [];
                } else {
                    var items = JSON.parse(data);
                }
                divContent.innerHTML += contentList(language,items,'synonyms?recommended&');
            }
        });
    } else {
        defaultTab(language,divContent);
    }
}

function contentSearch(language,divContent) {
    contentHeader(language,divContent);
    contentTabs(language,divContent,4);
    var searchParameters = JSON.parse($.cookie('searchSynonyms'));
    divContent.innerHTML += '<div id="search-panel" style="margin: 10px 0"></div>';
    contentSearchPanel(language,searchParameters,document.getElementById('search-panel'));
    $.ajax({
        type: "POST",
        url: "../../ajax/vocabulary/synonyms/getSynonymsSearchList.php",
        data: "language=" + language + "&user=" + $.cookie('user') + "&page=" + getParam('page=') + "&title=" + searchParameters["title"],
        success: function (data) {
            divContent.innerHTML += contentList(language,JSON.parse(data),'synonyms?search&');
        }
    });
    if(document.getElementById('search-panel').innerHTML == ''){
        contentSearchPanel(language,searchParameters,document.getElementById('search-panel'));
    }
}

function contentSearchPanel(language,searchParameters,divPanel) {
    var panel = '';
    panel += '<input type="text" id="title" class="search-input" placeholder="'+titles[language]['search-title']+'" value="'+searchParameters['title']+'">';
    panel += '<input type="button" class="search-button" value="'+titles[language]['search-search']+' &#128269;" ' +
    ' onclick="setSearchParameters(document.getElementById(\'title\').value); updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">';
    panel += '<input type="button" class="search-button-reset" value="'+titles[language]['search-reset']+'" ' +
    ' onclick="clearSearchParameters(); updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">';
    divPanel.innerHTML = panel;
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
        url: "../../ajax/vocabulary/synonyms/getSynonyms.php",
        data: "language=" + language + "&id=" + getParam('id=') + "&user=" + user,
        success: function (data) {
            var item = JSON.parse(data);
            if(item[0][0] == null) {
                defaultTab(language,divContent);
            } else {
                divContent.innerHTML += contentItem(language, JSON.parse(data));
            }
        }
    });
}

function defaultTab(language,divContent) {
    document.location.hash = '#synonyms?all&page=1';
    updateContent(language,divContent);
}

function contentHeader(language,divContent) {
    divContent.innerHTML += '<p class="page-header">'+vocabularySynonyms[language]["page-header"]+'</p>';
}

function contentTabs(language,divContent,activeTab) {
    if(activeTab == 1){
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-all"]+'">';
    } else {
        divContent.innerHTML += '<input onclick="document.location.hash = \'#synonyms?all&page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
    }
    if(isAuthorized()){
        if(activeTab == 2) {
            divContent.innerHTML += '<input type="button" class="submenu-button-active" value="' + titles[language]["button-liked"] + '">';
        } else {
            divContent.innerHTML += '<input onclick="document.location.hash = \'#synonyms?liked&page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="' + titles[language]["button-liked"] + '">';
        }
        if(activeTab == 3) {
            divContent.innerHTML += '<input type="button" class="submenu-button-active" value="' + titles[language]["button-recommended"] + '">';
        } else {
            divContent.innerHTML += '<input onclick="document.location.hash = \'#synonyms?recommended&page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="' + titles[language]["button-recommended"] + '">';
        }
    }
    if(activeTab == 4){
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-search"]+'"></br>';
    } else {
        divContent.innerHTML += '<input onclick="document.location.hash = \'#synonyms?search&page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-search"]+'"></br>';
    }
}

function contentList(language,items,link) {
    var cont = '';
    if(items.length>1){
        cont += '<table>';
        for (var i=0; i<items.length-1; i++) {
            cont += '<tr>' +
            '<td><img class="list-image" src="http://' + location.hostname + items[i][3] + '"></td>' +
            '<td><p class="list-text" onclick="document.location.hash = \'#synonyms?id=' + items[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + items[i][1] + ' - ' + items[i][2] + '</p></td>' +
            '</tr>';
        }
        cont += '</table>';
        cont += getPages(items[items.length-1],getParam('page='),link);
    } else {
        cont += '<p class="not-found-text">'+vocabularySynonyms[language]['not-found']+'</p>'
    }
    return cont;
}

function contentItem(language,items) {
    var cont = '';
    cont += '<table><tr><td><img class="advice-image" height="100" src="http://'+location.hostname+items[0][3]+'"></td>' +
    '<td><a class="page-title">'+items[0][1]+' - '+items[0][2]+'</a></td></tr></table>';
    cont += '<table>';
    for (var i=1; i<items.length; i++) {
        cont += '<tr>' +
        '<td><img class="audio-image" onclick="playAudio(\'' + items[i][4] + '\')" src="http://' + location.hostname + '/images/icons/audio.png"></td>' +
        '<td><img class="list-image" src="http://' + location.hostname + items[i][3] + '"></td>' +
        '<td><p class="page-text" style="width: 150px; max-width: 250px; margin-right: 10px">' + items[i][1] + '</p></td>' +
        '<td><p class="page-text" style="width: 150px; max-width: 250px; margin-right: 10px">' + items[i][2] + '</p></td>';
        if(isAuthorized()) {
            if (items[i][5] == null) {
                cont += '<td align="center"><div id="action' + items[i][0] + '"><p class="text-action" onclick="addWord(' + language + ',' + items[i][0] + ')">' + titles[language]['add-word'] + '</p></div></td>';
            } else {
                cont += '<td align="center"><div id="action' + items[i][0] + '"><p class="text-action" onclick="removeWord(' + language + ',' + items[i][0] + ')">' + titles[language]['remove-word'] + '</p></div></td>';
            }
        }
        cont += '</tr>';
    }
    cont += '</table>';
    if(isAuthorized()){
        if(items[0][4] == 0) {
            cont += '<div id="like"><input type="button" class="not-liked" value="'+items[0][5]+' &#10084;" onclick="like()"></div>';
        } else {
            cont += '<div id="like"><input type="button" class="liked" value="'+items[0][5]+' &#10084;" onclick="unlike()"></div>';
        }
    }
    return cont;
}

function like(){
    updateLastActivity();
    $.ajax({
        type: "POST",
        url: "../../ajax/vocabulary/synonyms/likeSynonyms.php",
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
        url: "../../ajax/vocabulary/synonyms/unlikeSynonyms.php",
        data: "id=" + getParam('id') + "&user=" + $.cookie('user'),
        success: function (data) {
            document.getElementById("like").innerHTML = '<input type="button" class="not-liked" value="'+data+' &#10084;" onclick="like()">';
        }
    });
}

function clearSearchParameters(){
    $.cookie('searchSynonyms',JSON.stringify({'title':''}));
}

function setSearchParameters(title){
    $.cookie('searchSynonyms',JSON.stringify({'title':title}));
}
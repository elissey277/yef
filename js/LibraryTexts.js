var libraryTexts = [
    {
        'page-header': "Library (Texts)",
        'not-found': "Texts are not found."
    },
    {
        'page-header': "Библиотека (Тексты)",
        'not-found': "Тексты не найдены."
    }
];

function updateContent(language,divContent){
    divContent.innerHTML = '';
    if(getParam('all') != -1) {
        divContent.innerHTML += '<p class="page-header">'+libraryTexts[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-all"]+'">';
        if(isAuthorized()){
            divContent.innerHTML += '<input onclick="document.location.hash = \'#liked?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-liked"]+'">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-recommended"]+'">';
        }
        divContent.innerHTML += '<input onclick="document.location.hash = \'#search?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-search"]+'"></br>';
        $.ajax({
            type: "POST",
            url: "../../ajax/library/texts/getTextsList.php",
            data: "language=" + language + "&page=" + getParam('page'),
            success: function (data) {
                var texts = JSON.parse(data);
                var cont = '';
                if(texts.length>1){
                    cont += '<table style="width: 100%;">';
                    for (var i=0; i<texts.length-1; i++) {
                        cont += '<tr>' +
                        '<td style="width: 50px"><img class="list-image" src="http://' + location.hostname + texts[i][4] + '"></td>' +
                        '<td style="width: 300px"><p class="list-text" onclick="document.location.hash = \'#id=' + texts[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + texts[i][1] + '</p></td>' +
                        '<td style="width: 70px" align="center"><p class="list-diff">';
                        for(var j=0; j<texts[i][2]; j++){
                            cont += '&#9733;'
                        }
                        cont += '</p></td>' +
                        '<td><p class="list-category">' + texts[i][3] + '</p></td>' +
                        '</tr>';
                    }
                    cont += '</table>';
                    divContent.innerHTML += cont;
                    divContent.innerHTML += getPages(texts[texts.length-1],getParam('page'),'all');
                } else {
                    cont += '<p class="not-found-text">'+libraryTexts[language]['not-found']+'</p>'
                    divContent.innerHTML += cont;
                }
            }
        });
    }
    else if(getParam('liked') != -1) {
        if(isAuthorized()) {
            divContent.innerHTML += '<p class="page-header">' + libraryTexts[language]["page-header"] + '</p>';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#all?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="' + titles[language]["button-all"] + '">';
            divContent.innerHTML += '<input type="button" class="submenu-button-active" value="' + titles[language]["button-liked"] + '">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="' + titles[language]["button-recommended"] + '">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#search?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="' + titles[language]["button-search"] + '"></br>';
            $.ajax({
                type: "POST",
                url: "../../ajax/library/texts/getTextsLikedList.php",
                data: "language=" + language + "&user=" + $.cookie('user') + "&page=" + getParam('page'),
                success: function (data) {
                    var texts = JSON.parse(data);
                    var cont = '';
                    if(texts.length>1){
                        cont += '<table style="width: 100%;">';
                        for (var i = 0; i < texts.length - 1; i++) {
                            cont += '<tr>' +
                            '<td style="width: 50px"><img class="list-image" src="http://' + location.hostname + texts[i][4] + '"></td>' +
                            '<td style="width: 300px"><p class="list-text" onclick="document.location.hash = \'#id=' + texts[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + texts[i][1] + '</p></td>' +
                            '<td style="width: 70px" align="center"><p class="list-diff">';
                            for (var j = 0; j < texts[i][2]; j++) {
                                cont += '&#9733;'
                            }
                            cont += '</p></td>' +
                            '<td><p class="list-category">' + texts[i][3] + '</p></td>' +
                            '</tr>';
                        }
                        cont += '</table>';
                        divContent.innerHTML += cont;
                        divContent.innerHTML += getPages(texts[texts.length - 1], getParam('page'), 'liked');
                    } else {
                        cont += '<p class="not-found-text">'+libraryTexts[language]['not-found']+'</p>'
                        divContent.innerHTML += cont;
                    }
                }
            });
        } else {
            document.location.hash = '#all?page=1';
            updateContent($.cookie('language'),document.getElementById('div-content'));
        }
    }
    else if(getParam('recommended') != -1) {
        if(isAuthorized()) {
            divContent.innerHTML += '<p class="page-header">'+libraryTexts[language]["page-header"]+'</p>';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#all?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#liked?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-liked"]+'">';
            divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-recommended"]+'">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#search?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-search"]+'">';
            $.ajax({
                type: "POST",
                url: "../../ajax/library/texts/getTextsRecommendedList.php",
                data: "language=" + language + "&user=" + $.cookie('user'),
                success: function (data) {
                    var texts = JSON.parse(data);
                    var cont = '';
                    if(texts.length>0){
                        cont += '<table style="width: 100%;">';
                        for (var i=0; i<texts.length; i++) {
                            cont += '<tr>' +
                            '<td style="width: 50px"><img class="list-image" src="http://' + location.hostname + texts[i][4] + '"></td>' +
                            '<td style="width: 300px"><p class="list-text" onclick="document.location.hash = \'#id=' + texts[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + texts[i][1] + '</p></td>' +
                            '<td style="width: 70px" align="center"><p class="list-diff">';
                            for(var j=0; j<texts[i][2]; j++){
                                cont += '&#9733;'
                            }
                            cont += '</p></td>' +
                            '<td><p class="list-category">' + texts[i][3] + '</p></td>' +
                            '</tr>';
                        }
                        cont += '</table>';
                        divContent.innerHTML += cont;
                    } else {
                        cont += '<p class="not-found-text">'+libraryTexts[language]['not-found']+'</p>'
                        divContent.innerHTML += cont;
                    }
                }
            });
        } else {
            document.location.hash = '#all?page=1';
            updateContent($.cookie('language'),document.getElementById('div-content'));
        }
    }
    else if(getParam('search') != -1) {
        divContent.innerHTML += '<p class="page-header">'+libraryTexts[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#all?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
        if(isAuthorized()) {
            divContent.innerHTML += '<input onclick="document.location.hash = \'#liked?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="' + titles[language]["button-liked"] + '">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="' + titles[language]["button-recommended"] + '">';
        }
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+titles[language]["button-search"]+'"></br>';
        var searchParameters = JSON.parse($.cookie('searchTexts'));
        divContent.innerHTML += '<div id="search-panel" style="margin: 10px 0"></div>';
        $.ajax({
            type: "POST",
            url: "../../ajax/library/texts/getTextsCategoriesList.php",
            data: "language=" + language,
            success: function (data) {
                var categories = JSON.parse(data);
                var panel = '';
                panel += '<input type="text" id="title" class="search-input" placeholder="'+titles[language]['search-title']+'" value="'+searchParameters['title']+'">';
                panel += '<select id="difficulty" class="search-select">';
                for(var i=0; i<=3; i++){
                    if(searchParameters['difficulty']==i){
                        panel += '<option selected value='+i+'>'
                    } else {
                        panel += '<option value='+i+'>'
                    }
                    for(var j=0; j<i; j++){
                        panel += '&#9733;';
                    }
                    panel += '</option>'
                }
                panel += '</select>';
                panel += '<select id="category" class="search-select">';
                if(searchParameters['category']==0) {
                    panel += '<option selected value=0></option>';
                } else {
                    panel += '<option value=0></option>';
                }
                for(var i=0; i<categories.length; i++){
                    if(searchParameters['category']==categories[i][0]){
                        panel += '<option selected value='+categories[i][0]+'>'
                    } else {
                        panel += '<option value='+categories[i][0]+'>'
                    }
                    panel += categories[i][1];
                    panel += '</option>'
                }
                panel += '</select>';
                panel += '<input type="button" class="search-button" value="'+titles[language]['search-search']+' &#128269;" ' +
                        ' onclick="setSearchParameters(document.getElementById(\'title\').value,document.getElementById(\'difficulty\').value,document.getElementById(\'category\').value); ' +
                        'updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">';
                panel += '<input type="button" class="search-button-reset" value="'+titles[language]['search-reset']+'" ' +
                        ' onclick="clearSearchParameters(); updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">';
                document.getElementById('search-panel').innerHTML += panel;
            }
        });
        $.ajax({
            type: "POST",
            url: "../../ajax/library/texts/getTextsSearchList.php",
            data: "language=" + language + "&user=" + $.cookie('user') + "&page=" + getParam('page') +
                    "&title=" + searchParameters["title"] + "&difficulty=" + searchParameters["difficulty"] + "&category=" + searchParameters["category"],
            success: function (data) {
                if(data != '') {
                    var texts = JSON.parse(data);
                } else {
                    var texts = [];
                }
                var cont = '';
                if(texts.length>1){
                    cont += '<table style="width: 100%;">';
                    for (var i=0; i<texts.length-1; i++) {
                        cont += '<tr>' +
                        '<td style="width: 50px"><img class="list-image" src="http://' + location.hostname + texts[i][4] + '"></td>' +
                        '<td style="width: 300px"><p class="list-text" onclick="document.location.hash = \'#id=' + texts[i][0] + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + texts[i][1] + '</p></td>' +
                        '<td style="width: 70px" align="center"><p class="list-diff">';
                        for(var j=0; j<texts[i][2]; j++){
                            cont += '&#9733;'
                        }
                        cont += '</p></td>' +
                        '<td><p class="list-category">' + texts[i][3] + '</p></td>' +
                        '</tr>';
                    }
                    cont += '</table>';
                    divContent.innerHTML += cont;
                    divContent.innerHTML += getPages(texts[texts.length-1],getParam('page'),'search');
                } else {
                    cont += '<p class="not-found-text">'+libraryTexts[language]['not-found']+'</p>'
                    divContent.innerHTML += cont;
                }
            }
        });
    }
    else if(getParam('id') != -1) {
        divContent.innerHTML += '<p class="page-header">'+libraryTexts[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#all?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-all"]+'">';
        if(isAuthorized()){
            divContent.innerHTML += '<input onclick="document.location.hash = \'#liked?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-liked"]+'">';
            divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-recommended"]+'">';
        }
        divContent.innerHTML += '<input onclick="document.location.hash = \'#search?page=1\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+titles[language]["button-search"]+'"></br>';
        if(isAuthorized()){
            var user = $.cookie('user');
        } else {
            var user = 0;
        }
        if(language == 0) {
            var langTrns = 1;
        } else {
            var langTrns = language;
        }
        $.ajax({
            type: "POST",
            url: "../../ajax/library/texts/getText.php",
            data: "language=" + langTrns + "&id=" + getParam('id') + "&user=" + user,
            success: function (data) {
                var text = JSON.parse(data);
                var cont = '';
                cont += '<table style="width:100%;">' +
                    '<tr><td style="width:50%;"><p class="page-title" align="center">'+text[1]+'</p></td><td style="width:50%;"><p class="page-title" align="center">'+text[3]+'</p></td></tr>';
                var engText = text[2].split('\n');
                var trnsText = text[4].split('\n');
                for(var i=0; i<engText.length; i++) {
                    cont += '<tr><td style="width:50%; border-top: 1px dotted #DDDDDD; vertical-align: top"><p class="page-text">'+engText[i]+'</p></td><td style="width:50%; border-top: 1px dotted #DDDDDD; vertical-align: top"><p class="page-text-grey">'+trnsText[i]+'</p></td></tr>';
                }
                cont += '</table>';
                if(isAuthorized()){
                    if(text[5] == 0) {
                        cont += '<div id="like"><input type="button" class="not-liked" value="'+text[6]+' &#10084;" onclick="like()"></div>';
                    } else {
                        cont += '<div id="like"><input type="button" class="liked" value="'+text[6]+' &#10084;" onclick="unlike()"></div>';
                    }
                }
                divContent.innerHTML += cont;
            }
        });
    } else {
        document.location.hash = '#all?page=1';
        updateContent($.cookie('language'),document.getElementById('div-content'));
    }
}

function like(){
    $.ajax({
        type: "POST",
        url: "../../ajax/library/texts/likeText.php",
        data: "id=" + getParam('id') + "&user=" + $.cookie('user'),
        success: function (data) {
            document.getElementById("like").innerHTML = '<input type="button" class="liked" value="'+data+' &#10084;" onclick="unlike()">';
        }
    });
}

function unlike(){
    $.ajax({
        type: "POST",
        url: "../../ajax/library/texts/unlikeText.php",
        data: "id=" + getParam('id') + "&user=" + $.cookie('user'),
        success: function (data) {
            document.getElementById("like").innerHTML = '<input type="button" class="not-liked" value="'+data+' &#10084;" onclick="like()">';
        }
    });
}

function clearSearchParameters(){
    $.cookie('searchTexts',JSON.stringify({'title':'','difficulty':0,'category':0}),{path:'/'});
}

function setSearchParameters(title,difficulty,category){
    $.cookie('searchTexts',JSON.stringify({'title':title,'difficulty':difficulty,'category':category}),{path:'/'});
}
var menu = [
    {
        'menu-exit': "Exit",
        'menu-advice': "Advice",
        'menu-grammar': "Grammar",
        'menu-rules': "Rules",
        'menu-exercises': "Exercises",
        'menu-vocabulary': "Vocabulary",
        'menu-glossary': "Glossaries",
        'menu-synonyms': "Synonyms",
        'menu-differences': "Differences",
        'menu-idioms': "Idioms",
        'menu-dictionary': "Dictionary",
        'menu-testing': "Testing",
        'menu-chat': "Chat",
        'menu-profile': "Profile",
        'menu-friends': "Friends",
        'menu-messages': "Messages",
        'menu-library': "Library",
        'menu-texts': "Texts",
        'menu-videos': "Videos"
    },
    {
        'menu-exit': "Выход",
        'menu-advice': "Советы",
        'menu-grammar': "Грамматика",
        'menu-rules': "Правила",
        'menu-exercises': "Упражнения",
        'menu-vocabulary': "Лексика",
        'menu-glossary': "Глоссарии",
        'menu-synonyms': "Синонимы",
        'menu-differences': "Различия",
        'menu-idioms': "Идиомы",
        'menu-dictionary': "Словарь",
        'menu-testing': "Тестирования",
        'menu-chat': "Общение",
        'menu-profile': "Профиль",
        'menu-friends': "Друзья",
        'menu-messages': "Сообщения",
        'menu-library': "Библиотека",
        'menu-texts': "Тексты",
        'menu-videos': "Видео"
    }
];

var titles = [
    {
        'button-all': "All",
        'button-liked': "Liked",
        'button-recommended': "Recommended",
        'button-search': "Search",
        'search-title': "Input text...",
        'search-search': "Search",
        'search-reset': "Reset",
        'access-denied': "<b>Access denied!</b><br>Only authorized users can view this page.<br>Please authorize or register.",
        'sign': "Sign Up",
        'add-word': "Add to Dictionary",
        'remove-word': "Delete from Dictionary"
    },
    {
        'button-all': "Все",
        'button-liked': "Понравившиеся",
        'button-recommended': "Рекомендованные",
        'button-search': "Поиск",
        'search-title': "Введите текст...",
        'search-search': "Поиск",
        'search-reset': "Сброс",
        'access-denied': "<b>Доступ запрещен!</b><br>Только авторизированные пользователи могут просматривать данную страницу.<br>Пожалуйста, авторизируйтесь или зарегистрируйтесь.",
        'sign': "Регистрация",
        'add-word': "Добавить в Словарь",
        'remove-word': "Удалить из Словаря"
    }
];

function loadPage(language){
    checkLanguage();
    getTitle();
    document.getElementById('body').innerHTML =
    '<table style="border-collapse: collapse; margin: 0; padding: 0; border: 0; width: 100%;">' +
        '<tr style="margin: 0; padding: 0; border: 0">' +
            '<td colspan="2" id="div-header" style="margin: 0; padding: 0; border: 0"></td>' +
        '</tr>' +
        '<tr style="margin: 0; padding: 0; border: 0; vertical-align: top;">' +
            '<td style="padding: 10px; width: 1500px" id="div-content"></td>' +
            '<td id="div-ads" align="center" style="margin: 0; padding: 0; border: 0; width: 225px; text-align: center; border-left: 1px dotted #0064af;"></td>' +
        '</tr>' +
        '<tr style="margin: 0; padding: 0; border: 0">' +
            '<td class="footer" colspan="2" id="div-footer"></td>' +
        '</tr>' +
    '</table>';
    document.getElementById("div-header").innerHTML = getHeader(language);
    document.getElementById("div-ads").innerHTML = getAds(language);
    VK.Widgets.Group("vk_groups", {
        mode: 0,
        width: "225",
        height: "250",
        color1: 'FFFFFF',
        color2: '2B587A',
        color3: '0064af'},
    87386085);
    document.getElementById("div-footer").innerHTML = getFooter(language);
    selectModule();
}

function selectModule() {
    $("#rules_js").remove();
    $("#exercises_js").remove();
    $("#vocabulary_js").remove();
    $("#glossaries_js").remove();
    $("#synonyms_js").remove();
    $("#differences_js").remove();
    $("#idioms_js").remove();
    $("#dictionary_js").remove();
    $("#testing_js").remove();
    $("#advice_js").remove();
    $("#profile_js").remove();
    $("#friends_js").remove();
    $("#messages_js").remove();
    $("#texts_js").remove();
    $("#videos_js").remove();
    if(getParam('rules') != -1) {
        $('head').append('<script src="js/GrammarRules.js" type="text/javascript" id="rules_js"></script>');
    } else if(getParam('exercises') != -1) {
        $('head').append('<script src="js/GrammarExercises.js" type="text/javascript" id="exercises_js"></script>');
    } else if(getParam('glossaries') != -1) {
        $('head').append('<script src="js/Vocabulary.js" type="text/javascript" id="vocabulary_js"></script>');
        $('head').append('<script src="js/VocabularyGlossaries.js" type="text/javascript" id="glossaries_js"></script>');
    } else if(getParam('synonyms') != -1) {
        $('head').append('<script src="js/Vocabulary.js" type="text/javascript" id="vocabulary_js"></script>');
        $('head').append('<script src="js/VocabularySynonyms.js" type="text/javascript" id="synonyms_js"></script>');
    } else if(getParam('differences') != -1) {
        $('head').append('<script src="js/Vocabulary.js" type="text/javascript" id="vocabulary_js"></script>');
        $('head').append('<script src="js/VocabularyDifferences.js" type="text/javascript" id="differences_js"></script>');
    } else if(getParam('idioms') != -1) {
        $('head').append('<script src="js/Vocabulary.js" type="text/javascript" id="vocabulary_js"></script>');
        $('head').append('<script src="js/VocabularyIdioms.js" type="text/javascript" id="idioms_js"></script>');
    } else if(getParam('dictionary') != -1) {
        $('head').append('<script src="js/Vocabulary.js" type="text/javascript" id="vocabulary_js"></script>');
        $('head').append('<script src="js/VocabularyDictionary.js" type="text/javascript" id="dictionary_js"></script>');
    } else if(getParam('testing') != -1) {
        $('head').append('<script src="js/Vocabulary.js" type="text/javascript" id="vocabulary_js"></script>');
        $('head').append('<script src="js/VocabularyTesting.js" type="text/javascript" id="testing_js"></script>');
    } else if(getParam('advice') != -1) {
        $('head').append('<script src="js/Advice.js" type="text/javascript" id="advice_js"></script>');
    } else if(getParam('profile') != -1) {
        $('head').append('<script src="js/ChatProfile.js" type="text/javascript" id="profile_js"></script>');
    } else if(getParam('friends') != -1) {
        $('head').append('<script src="js/ChatFriends.js" type="text/javascript" id="friends_js"></script>');
    } else if(getParam('messages') != -1) {
        $('head').append('<script src="js/ChatMessages.js" type="text/javascript" id="messages_js"></script>');
    } else if(getParam('texts') != -1) {
        $('head').append('<script src="js/LibraryTexts.js" type="text/javascript" id="texts_js"></script>');
    } else if(getParam('videos') != -1) {
        $('head').append('<script src="js/LibraryVideos.js" type="text/javascript" id="videos_js"></script>');
    }
    updateContent($.cookie('language'),document.getElementById("div-content"));
}

function getHeader(language){
    var header =
        '<div class="div-menu">'+
            '<table style="border-collapse: collapse; margin: 0; padding: 0; border: 0; width: 100%">'+
                '<tr>'+
                    '<td align="center">'+
                        '<img src="http://'+location.hostname+'/images/logo.png" height="60" align="center">'+
                        '<div class="div-lang">'+
                            '<table>'+
                                '<tr>'+
                                    '<td>'+
                                        '<a><img onclick="selectLang(0)" src="http://'+location.hostname+'/images/lang/en.png" class="image-flag"></a>'+
                                    '</td>'+
                                    '<td>'+
                                        '<a><img onclick="selectLang(1)" src="http://'+location.hostname+'/images/lang/ru.png" class="image-flag"></a>'+
                                    '</td>'+
                                '</tr>'+
                            '</table>'+
                        '</div>'+
                    '</td>'+
                '</tr>';
    header +=
                '<tr>'+
                    '<td>'+
                        '<ul class="menu">'+
                            '<li class="item"><a class="menu-text">'+menu[language]['menu-grammar']+'</a>'+
                                '<ul>'+
                                    '<li><a onclick="location.hash = \'#rules?all\'; selectModule()" class="menu-text">'+menu[language]['menu-rules']+'</a></li>';
    if(isAuthorized()) {
        header +=                   '<li><a onclick="location.hash = \'#exercises?all\'; selectModule()" class="menu-text">' + menu[language]['menu-exercises'] + '</a></li>';
    }
    header+=                    '</ul>'+
                            '</li>'+
                            '<li class="item"><a class="menu-text">'+menu[language]['menu-vocabulary']+'</a>'+
                                '<ul>'+
                                    '<li><a onclick="location.hash = \'#glossaries?all&page=1\'; selectModule()" class="menu-text">'+menu[language]['menu-glossary']+'</a></li>'+
                                    '<li><a onclick="location.hash = \'#synonyms?all&page=1\'; selectModule()" class="menu-text">'+menu[language]['menu-synonyms']+'</a></li>'+
                                    '<li><a onclick="location.hash = \'#differences?all&page=1\'; selectModule()" class="menu-text">'+menu[language]['menu-differences']+'</a></li>'+
                                    '<li><a onclick="location.hash = \'#idioms?all&page=1\'; selectModule()" class="menu-text">'+menu[language]['menu-idioms']+'</a></li>';
    if(isAuthorized()) {
        header +=                   '<li><a onclick="location.hash = \'#dictionary?all&page=1\'; selectModule()" class="menu-text">' + menu[language]['menu-dictionary'] + '</a></li>' +
                                    '<li><a onclick="location.hash = \'#testing\'; selectModule()" class="menu-text">' + menu[language]['menu-testing'] + '</a></li>';
    }
    header+=                    '</ul>'+
                            '</li>'+
                            '<li class="item"><a onclick="location.hash = \'#advice?all\'; selectModule()" class="menu-text">'+menu[language]['menu-advice']+'</a></li>';
    if(isAuthorized()) {
        header +=           '<li class="item"><a class="menu-text">' + menu[language]['menu-chat'] + '</a>' +
                                '<ul>' +
                                    '<li><a onclick="location.hash = \'#profile\'; selectModule()" class="menu-text">' + menu[language]['menu-profile'] + '</a></li>' +
                                    '<li><a onclick="location.hash = \'#friends\'; selectModule()" class="menu-text">' + menu[language]['menu-friends'] + '</a></li>' +
                                    '<li><a onclick="location.hash = \'#messages\'; selectModule()" class="menu-text">' + menu[language]['menu-messages'] + '</a></li>' +
                                '</ul>' +
                            '</li>';
    }
    header +=               '<li class="item"><a class="menu-text">'+menu[language]['menu-library']+'</a>'+
                                '<ul>'+
                                    '<li><a onclick="location.hash = \'#texts?all&page=1\'; selectModule()" class="menu-text">'+menu[language]['menu-texts']+'</a></li>'+
                                    '<li><a onclick="location.hash = \'#videos?all&page=1\'; selectModule()" class="menu-text">'+menu[language]['menu-videos']+'</a></li>'+
                                '</ul>'+
                            '</li>';
    if(isAuthorized()) {
        header +=           '<li class="item"><a onclick="$.cookie(\'user\',null,{path:\'/\'}); location.hash = \'\'; load();"  class="menu-text">' + menu[language]['menu-exit'] + '</a></li>';
            }
    header +=           '</ul>'+
                    '</td>'+
                '</tr>'+
            '</table>'+
        '</div>';
    return header;
}

function getAds(language){
    var ads = '';
    if(!isAuthorized()){
        ads += '<input type="button" class="action" value="'+titles[language]['sign']+'" id="reg-button" onclick="location.hash = \'\'; load();">';
    }
    ads += '<div id="vk_groups"></div>'+
        '<img src="/images/google-ad.PNG"><br>'+
        '<img src="/images/google-ad.PNG">';
    return ads;
}

function getFooter(language){
    return 'Your English Friend &copy; 2015-2016';
}

function selectLang(language) {
    if($.cookie('language')!=language) {
        $.cookie('language', language, {path: '/'});
        document.getElementById("div-header").innerHTML = getHeader($.cookie('language'));
        if(!isAuthorized()) {
            document.getElementById("reg-button").value = titles[language]['sign'];
        }
        updateContent($.cookie('language'),document.getElementById("div-content"));
    }
}

function updateLastActivity() {
    if(isAuthorized()){
        $.ajax({
            type: "POST",
            url: "../../ajax/updateLastActivity.php",
            data: "user=" + $.cookie('user'),
            success: function (data) {
            }
        });
    }
}

function getPages(total, current, link) {
    var pages = '<p class="pages-text">Pages: ';
    var isSkip = false;
    for(var i=1; i<=total; i++) {
        if(i <= 3 || i >= total-2 || Math.abs(i-current)<=2){
            if(i != current) {
                pages += '<a onclick="document.location.hash = \'#' + link + 'page=' + i + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + i + '</a> ';
            } else {
                pages += i + ' '
            }
            isSkip = false;
        } else {
            if(!isSkip){
                pages += '... ';
                isSkip = true;
            }
        }
    }
    pages += '</p>';
    return pages;
}
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
        'button-recommended': "Recommended"
    },
    {
        'button-all': "Все",
        'button-liked': "Понравившиеся",
        'button-recommended': "Рекомендованные"
    }
];

function loadPage(language){
    checkLanguage();
    getTitle();
    document.getElementById("div-header").innerHTML = getHeader(language);
    document.getElementById("div-ads").innerHTML = getAds(language);
    document.getElementById("div-footer").innerHTML = getFooter(language);
}

function getTitle(){
    document.title = "Your English Friend - изучение английского языка онлайн";
    $('head').append('<link rel="shortcut icon" href="http://'+location.hostname+'/images/icon.png" type="image/png">');
    $('head').append('<link rel="stylesheet" type="text/css" href="http://'+location.hostname+'/css/template.css"/>');
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
                                        '<a onclick="selectLang(0)"><img onclick="selectLang(0)" src="http://'+location.hostname+'/images/lang/en.png" class="image-flag"></a>'+
                                    '</td>'+
                                    '<td>'+
                                        '<a onclick="selectLang(1)"><img onclick="selectLang(1)" src="http://'+location.hostname+'/images/lang/ru.png" class="image-flag"></a>'+
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
                                    '<li><a href="http://'+location.hostname+'/grammar/rules" class="menu-text">'+menu[language]['menu-rules']+'</a></li>';
    if(isAuthorized()) {
        header +=                   '<li><a href="http://' + location.hostname + '/grammar/exercises" class="menu-text">' + menu[language]['menu-exercises'] + '</a></li>';
    }
    header+=                    '</ul>'+
                            '</li>'+
                            '<li class="item"><a class="menu-text">'+menu[language]['menu-vocabulary']+'</a>'+
                                '<ul>'+
                                    '<li><a href="http://'+location.hostname+'/vocabulary/glossaries" class="menu-text">'+menu[language]['menu-glossary']+'</a></li>'+
                                    '<li><a href="http://'+location.hostname+'/vocabulary/synonyms" class="menu-text">'+menu[language]['menu-synonyms']+'</a></li>'+
                                    '<li><a href="http://'+location.hostname+'/vocabulary/differences" class="menu-text">'+menu[language]['menu-differences']+'</a></li>';
    if(isAuthorized()) {
        header +=                   '<li><a href="http://' + location.hostname + '/vocabulary/dictionary" class="menu-text">' + menu[language]['menu-dictionary'] + '</a></li>' +
                                    '<li><a href="http://' + location.hostname + '/vocabulary/testing" class="menu-text">' + menu[language]['menu-testing'] + '</a></li>';
    }
    header+=                    '</ul>'+
                            '</li>'+
                            '<li class="item"><a href="http://'+location.hostname+'/advice/#all" class="menu-text">'+menu[language]['menu-advice']+'</a></li>';
    if(isAuthorized()) {
        header +=           '<li class="item"><a class="menu-text">' + menu[language]['menu-chat'] + '</a>' +
                                '<ul>' +
                                    '<li><a href="http://' + location.hostname + '/chat/profile" class="menu-text">' + menu[language]['menu-profile'] + '</a></li>' +
                                    '<li><a href="http://' + location.hostname + '/chat/friends" class="menu-text">' + menu[language]['menu-friends'] + '</a></li>' +
                                    '<li><a href="http://' + location.hostname + '/chat/messages" class="menu-text">' + menu[language]['menu-messages'] + '</a></li>' +
                                '</ul>' +
                            '</li>';
    }
    header +=               '<li class="item"><a class="menu-text">'+menu[language]['menu-library']+'</a>'+
                                '<ul>'+
                                    '<li><a href="http://'+location.hostname+'/library/texts" class="menu-text">'+menu[language]['menu-texts']+'</a></li>'+
                                    '<li><a href="http://'+location.hostname+'/library/videos" class="menu-text">'+menu[language]['menu-videos']+'</a></li>'+
                                '</ul>'+
                            '</li>';
    if(isAuthorized()) {
        header +=           '<li class="item"><a onclick="$.cookie(\'user\',null,{path:\'/\'});" href="http://' + location.hostname + '" class="menu-text">' + menu[language]['menu-exit'] + '</a></li>';
            }
    header +=           '</ul>'+
                    '</td>'+
                '</tr>'+
            '</table>'+
        '</div>';
    return header;
}

function getAds(language){
    if(isAuthorized()){
        return '<div id="vk_groups"></div>'+
        '<img src="http://'+location.hostname+'/images/google-ad.PNG"><br>'+
        '<img src="http://'+location.hostname+'/images/google-ad.PNG">';
    } else {
        return '<div id="vk_groups"></div>'+
        '<img src="http://'+location.hostname+'/images/google-ad.PNG"><br>'+
        '<img src="http://'+location.hostname+'/images/google-ad.PNG">';
    }
}

function getFooter(language){
    return 'Brave Raccoons &copy; 2015-2016';
}

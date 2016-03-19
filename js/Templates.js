var landing = [
    {
        'language': "English \u25bc",
        'lang-img': "images/lang/en.png",
        'welcome-text': "Make friends with <b>Your English Friend</b>!<br>And he will help you to learn English fast and interesting!",
        'welcome-text2': "Sign up for <b>FREE</b><br>and start learning English right now!",
        'landing-grammar-header': "Grammar",
        'landing-grammar-text': "Simple and clear description of grammar rules",
        'landing-vocabulary-header': "Vocabulary",
        'landing-vocabulary-text': "Words compilations for talking on different topics",
        'landing-exercises-header': "Exercises",
        'landing-exercises-text': "Consolidating grammar rules by exercises",
        'landing-testing-header': "Testing",
        'landing-testing-text': "7 types of tests for rapid words learning",
        'landing-chatting-header': "Chat",
        'landing-chatting-text': "Chat in English with your friends and new mates",
        'landing-library-header': "Library",
        'landing-library-text': "Big collection of text, audio and video materials",
        'landing-advices-header': "Useful Advices",
        'landing-advices-text': "Useful articles about learning English",
        'sign-up-header': "Sign Up",
        'sign-in-header': "Sign In",
        'sign-up-button': "Sign Up",
        'sign-in-button': "Sign In",
        'sign-up-text': "Sign In",
        'sign-in-text': "Sign Up",
        'sign-up-text2': "Preview",
        'sign-in-text2': "Forgot password?",
        'reg-form-password': "Password",
        'reg-form-name': "Name",
        'error-same-email': "User with this Email already exists.",
        'error-empty-email': "Email should be inputted.",
        'error-empty-name': "Name should be inputted.",
        'error-empty-pass': "Password should be inputted.",
        'error-no-user': "Email or Password is incorrect."
    },
    {
        'language': "Русский \u25bc",
        'lang-img': "images/lang/ru.png",
        'welcome-text': "Подружитесь с <b>Your English Friend</b>!<br>И он поможет Вам выучить английский язык быстро и интересно!",
        'welcome-text2': "Пройдите <b>БЕСПЛАТНУЮ</b> регистрацию<br>и начинайте учить английский язык прямо сейчас!",
        'landing-grammar-header': "Грамматика",
        'landing-grammar-text': "Просто и понятно изложенные правила грамматики",
        'landing-vocabulary-header': "Лексика",
        'landing-vocabulary-text': "Подборки слов для общения на разные темы",
        'landing-exercises-header': "Упражнения",
        'landing-exercises-text': "Закрепление правил грамматики упражнениями",
        'landing-testing-header': "Тестирование",
        'landing-testing-text': "7 видов тестов для быстрого изучения слов",
        'landing-chatting-header': "Общение",
        'landing-chatting-text': "Общение на английском с друзьями и новыми знакомыми",
        'landing-library-header': "Библиотека",
        'landing-library-text': "Большой сборник текстовых, аудио и видео материалов",
        'landing-advices-header': "Полезные советы",
        'landing-advices-text': "Полезные статьи по изучению английского языка",
        'sign-up-header': "Регистрация",
        'sign-in-header': "Вход",
        'sign-up-button': "Регистрация",
        'sign-in-button': "Вход",
        'sign-up-text': "Вход",
        'sign-in-text': "Регистрация",
        'sign-up-text2': "Предпросмотр",
        'sign-in-text2': "Забыли пароль?",
        'reg-form-password': "Пароль",
        'reg-form-name': "Имя",
        'error-same-email': "Пользователь с таким Email уже существует.",
        'error-empty-email': "Email должен быть введен.",
        'error-empty-name': "Имя должно быть введено.",
        'error-empty-pass': "Пароль должен быть введен.",
        'error-no-user': "Email или Пароль введены неправильно."
    }
];

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

var chat = [
    {
        'page-header-profile': "User profile",
        'page-header-profile-own': "My profile"
    },
    {
        'page-header-profile': "Профиль пользователя",
        'page-header-profile-own': "Мой профиль"
    }
];

var advice = [
    {
        'page-header': "Advice",
        'button-all': "All",
        'button-liked': "Liked",
        'button-recommended': "Recommended"
    },
    {
        'page-header': "Советы",
        'button-all': "Все",
        'button-liked': "Понравившиеся",
        'button-recommended': "Рекомендованные"
    }
];

function getParam(param) {
    var h = location.hash;
    var start = h.indexOf(param);
    if(start == -1) {
        return -1;
    }
    start += param.length + 1;
    var end = h.indexOf('&',start);
    if(end == -1) {
        end = h.length;
    }
    return h.slice(start,end);
}

function getTitle(){
    document.title = "Your English Friend - изучение английского языка онлайн";
    $('head').append('<link rel="shortcut icon" href="http://'+location.hostname+'/images/icon.png" type="image/png">');
    $('head').append('<link rel="stylesheet" type="text/css" href="http://'+location.hostname+'/css/template.css"/>');
}

function getHeader(language){
    var header = '<div class="div-menu">'+
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
        header +=               '<li><a href="http://' + location.hostname + '/grammar/exercises" class="menu-text">' + menu[language]['menu-exercises'] + '</a></li>';
    }
    header+=            '</ul>'+
                        '</li>'+
                        '<li class="item"><a class="menu-text">'+menu[language]['menu-vocabulary']+'</a>'+
                            '<ul>'+
                                '<li><a href="http://'+location.hostname+'/vocabulary/glossaries" class="menu-text">'+menu[language]['menu-glossary']+'</a></li>'+
                                '<li><a href="http://'+location.hostname+'/vocabulary/synonyms" class="menu-text">'+menu[language]['menu-synonyms']+'</a></li>'+
                                '<li><a href="http://'+location.hostname+'/vocabulary/differences" class="menu-text">'+menu[language]['menu-differences']+'</a></li>';
    if(isAuthorized()) {
        header +=               '<li><a href="http://' + location.hostname + '/vocabulary/dictionary" class="menu-text">' + menu[language]['menu-dictionary'] + '</a></li>' +
                                '<li><a href="http://' + location.hostname + '/vocabulary/testing" class="menu-text">' + menu[language]['menu-testing'] + '</a></li>';
    }
    header+=                '</ul>'+
                        '</li>'+
                        '<li class="item"><a href="http://'+location.hostname+'/advice/#all" class="menu-text">'+menu[language]['menu-advice']+'</a></li>';
    if(isAuthorized()) {
        header +=       '<li class="item"><a class="menu-text">' + menu[language]['menu-chat'] + '</a>' +
                            '<ul>' +
                                '<li><a href="http://' + location.hostname + '/chat/profile" class="menu-text">' + menu[language]['menu-profile'] + '</a></li>' +
                                '<li><a href="http://' + location.hostname + '/chat/friends" class="menu-text">' + menu[language]['menu-friends'] + '</a></li>' +
                                '<li><a href="http://' + location.hostname + '/chat/messages" class="menu-text">' + menu[language]['menu-messages'] + '</a></li>' +
                            '</ul>' +
                        '</li>';
    }
    header +=           '<li class="item"><a class="menu-text">'+menu[language]['menu-library']+'</a>'+
                            '<ul>'+
                                '<li><a href="http://'+location.hostname+'/library/texts" class="menu-text">'+menu[language]['menu-texts']+'</a></li>'+
                                '<li><a href="http://'+location.hostname+'/library/videos" class="menu-text">'+menu[language]['menu-videos']+'</a></li>'+
                            '</ul>'+
                        '</li>';
    if(isAuthorized()) {
        header +=       '<li class="item"><a onclick="$.cookie(\'user\',null,{path:\'/\'});" href="http://' + location.hostname + '" class="menu-text">' + menu[language]['menu-exit'] + '</a></li>';
    }
    header +=       '</ul>'+
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

function loadPage(language){
    checkLanguage();
    getTitle();
    document.getElementById("div-header").innerHTML = getHeader(language);
    document.getElementById("div-ads").innerHTML = getAds(language);
    document.getElementById("div-footer").innerHTML = getFooter(language);
}

function checkLanguage(){
    if($.cookie('language') == null && $.cookie('language') == undefined) {
        $.cookie('language',1,{path:'/'});
    }
}

function isAuthorized(){
    return $.cookie('user') != null && $.cookie('user') != 'null' && $.cookie('user') != undefined;
}

function getProfile(language){
    var pageHeader;
    if(getParam('id') == -1) {
        pageHeader = chat[language]["page-header-profile-own"];
    } else {
        pageHeader = chat[language]["page-header-profile"];
    }
    // TODO
    return '<p class="page-header">'+pageHeader+'</p>'
}

function updateAdviceContent(language,divContent){
    divContent.innerHTML = '';
    if(getParam('all') != -1) {
        divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+advice[language]["button-all"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#liked\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+advice[language]["button-liked"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+advice[language]["button-recommended"]+'"></br>';
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdviceList.php",
            data: "language=" + language,
            success: function (data) {
                var advices = JSON.parse(data);
                var cont = '';
                cont += '<table>';
                for (var i=0; i<advices.length; i++) {
                    cont += '<tr onclick="document.location.hash = \'#id=' + advices[i][0] + '\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' +
                        '<td><img class="list-image" src="http://' + location.hostname + advices[i][3] + '"></td>' +
                        '<td><p class="list-text">' + advices[i][1] + '</p></td>' +
                        '</tr>';
                }
                cont += '</table>';
                divContent.innerHTML += cont;
            }
        });
    }
    else if(getParam('liked') != -1) {
        divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#all\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+advice[language]["button-all"]+'">';
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+advice[language]["button-liked"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+advice[language]["button-recommended"]+'"></br>';
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdviceLikedList.php",
            data: "language=" + language + "&user=" + $.cookie('user'),
            success: function (data) {
                var advices = JSON.parse(data);
                var cont = '';
                cont += '<table>';
                for (var i=0; i<advices.length; i++) {
                    cont += '<tr onclick="document.location.hash = \'#id=' + advices[i][0] + '\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' +
                    '<td><img class="list-image" src="http://' + location.hostname + advices[i][3] + '"></td>' +
                    '<td><p class="list-text">' + advices[i][1] + '</p></td>' +
                    '</tr>';
                }
                cont += '</table>';
                divContent.innerHTML += cont;
            }
        });
    }
    else if(getParam('recommended') != -1) {
        divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#all\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+advice[language]["button-all"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#liked\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+advice[language]["button-liked"]+'">';
        divContent.innerHTML += '<input type="button" class="submenu-button-active" value="'+advice[language]["button-recommended"]+'"></br>';
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdviceRecommendedList.php",
            data: "language=" + language + "&user=" + $.cookie('user'),
            success: function (data) {
                var advices = JSON.parse(data);
                var cont = '';
                cont += '<table>';
                for (var i=0; i<advices.length; i++) {
                    cont += '<tr onclick="document.location.hash = \'#id=' + advices[i][0] + '\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' +
                    '<td><img class="list-image" src="http://' + location.hostname + advices[i][3] + '"></td>' +
                    '<td><p class="list-text">' + advices[i][1] + '</p></td>' +
                    '</tr>';
                }
                cont += '</table>';
                divContent.innerHTML += cont;
            }
        });
    }
    else if(getParam('id') != -1) {
        divContent.innerHTML += '<p class="page-header">'+advice[language]["page-header"]+'</p>';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#all\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+advice[language]["button-all"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#liked\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+advice[language]["button-liked"]+'">';
        divContent.innerHTML += '<input onclick="document.location.hash = \'#recommended\'; updateAdviceContent($.cookie(\'language\'),document.getElementById(\'div-content\'));" type="button" class="submenu-button" value="'+advice[language]["button-recommended"]+'"></br>';
        $.ajax({
            type: "POST",
            url: "../ajax/advice/getAdvice.php",
            data: "language=" + language + "&id=" + getParam('id'),
            success: function (data) {
                var advice = JSON.parse(data);
                divContent.innerHTML += '<table><tr><td><img class="advice-image" height="100" src="http://'+location.hostname+advice[3]+'"></td>' +
                    '<td><a class="advice-title">'+advice[1]+'</a></td></tr></table>'+'<p class="advice-text">'+advice[2]+'</p>';
            }
        });
    }
}
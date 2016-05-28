function load() {
    document.onmouseover = function() {
        window.innerDocClick = true;
    };
    document.onmouseleave = function() {
        window.innerDocClick = false;
    };
    window.onhashchange = function(e) {
        if (!window.innerDocClick) {
            if((isLanding(e.oldURL) && !isLanding(e.newURL)) || (!isLanding(e.oldURL) && isLanding(e.newURL))) {
                load();
            } else {
                selectModule();
            }
        }
    };
    $("#landing_js").remove();
    $("#regauth_js").remove();
    $("#landing_css").remove();
    $("#page_js").remove();
    $("#template_css").remove();
    if(location.hash == ''){
        if(isAuthorized()) {
            location.hash = '#grammar_rules?all';
            load();
        }
        $('head').append('<script src="js/Landing.js" type="text/javascript" id="landing_js"></script>');
        $('head').append('<script src="js/RegAuth.js" type="text/javascript" id="regauth_js"></script>');
        $('head').append('<link rel="stylesheet" type="text/css" href="css/landing.css" id="landing_css"/>');
        loadPage();
        selectLang($.cookie('language'));
        scaling();
        window.onresize = function () {
            scaling();
        };
        window.onkeydown = function (e) {
            if (e.which == 13) {
                if(document.getElementById("reg-form").style.display != "none"){
                    signUp();
                } else if(document.getElementById("auth-form").style.display != "none") {
                    signIn();
                } else {
                    if(document.getElementById("rest-button").style.display != "none") {
                        restorePass();
                    } else if(document.getElementById("rest-button-code").style.display != "none") {
                        confirmCode();
                    } else {
                        savePassword();
                    }
                }
            }
        };
    } else {
        $('head').append('<script src="js/Page.js" type="text/javascript" id="page_js"></script>');
        $('head').append('<link rel="stylesheet" type="text/css" href="css/template.css" id="template_css"/>');
        loadPage($.cookie('language'));
        loadPage($.cookie('language'));
    }
}

function isLanding(url){
    return url.indexOf('#') == -1 || url.indexOf('#') == url.length-1;
}

function getTitle(){
    document.title = "Your English Friend - изучение английского языка онлайн";
    $('head').append('<link rel="shortcut icon" href="/images/icon.png" type="image/png">');
}

function getParam(param) {
    var h = location.hash;
    var start = h.indexOf(param);
    if(start == -1) {
        return -1;
    }
    start += param.length;
    var end = h.indexOf('&',start);
    if(end == -1) {
        end = h.length;
    }
    return h.slice(start,end);
}

function checkLanguage(){
    if($.cookie('language') == null && $.cookie('language') == undefined) {
        $.cookie('language',1,{path: '/'});
    }
}

function isAuthorized(){
    return $.cookie('user') != null && $.cookie('user') != 'null' && $.cookie('user') != undefined;
}
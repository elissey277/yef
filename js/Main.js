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

function checkLanguage(){
    if($.cookie('language') == null && $.cookie('language') == undefined) {
        $.cookie('language',1,{path:'/'});
    }
}

function isAuthorized(){
    return $.cookie('user') != null && $.cookie('user') != 'null' && $.cookie('user') != undefined;
}
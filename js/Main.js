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
        $.cookie('language',1);
    }
}

function isAuthorized(){
    return $.cookie('user') != null && $.cookie('user') != 'null' && $.cookie('user') != undefined;
}

function getPages(total, current, link) {
    var pages = '<p class="pages-text">Pages: ';
    var isSkip = false;
    for(var i=1; i<=total; i++) {
        if(i <= 3 || i >= total-2 || Math.abs(i-current)<=2){
            if(i != current) {
                pages += '<a onclick="document.location.hash = \'#' + link + '?page=' + i + '\'; updateContent($.cookie(\'language\'),document.getElementById(\'div-content\'));">' + i + '</a> ';
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
function addToFriends(id,isFriend) {
    $.ajax({
        type: "POST",
        url: "../../ajax/chat/friends/addToFriends.php",
        data: "id=" + id,
        success: function (data) {
            if(isFriend) {
                getFriendActions($.cookie('language'),id,data);
            } else {
                getActions($.cookie('language'),data);
            }
        }
    });
}

function acceptRequest(id,isFriend) {
    $.ajax({
        type: "POST",
        url: "../../ajax/chat/friends/acceptRequest.php",
        data: "id=" + id,
        success: function (data) {
            if(isFriend) {
                getFriendActions($.cookie('language'),id,data);
            } else {
                getActions($.cookie('language'),data);
            }
        }
    });
}

function denyRequest(id,isFriend) {
    $.ajax({
        type: "POST",
        url: "../../ajax/chat/friends/denyRequest.php",
        data: "id=" + id,
        success: function (data) {
            if(isFriend) {
                getFriendActions($.cookie('language'),id,data);
            } else {
                getActions($.cookie('language'),data);
            }
        }
    });
}

function cancelRequest(id,isFriend) {
    $.ajax({
        type: "POST",
        url: "../../ajax/chat/friends/cancelRequest.php",
        data: "id=" + id,
        success: function (data) {
            if(isFriend) {
                getFriendActions($.cookie('language'),id,data);
            } else {
                getActions($.cookie('language'),data);
            }
        }
    });
}

function removeFromFriends(id,isFriend) {
    $.ajax({
        type: "POST",
        url: "../../ajax/chat/friends/removeFromFriends.php",
        data: "id=" + id,
        success: function (data) {
            if(isFriend) {
                getFriendActions($.cookie('language'),id,data);
            } else {
                getActions($.cookie('language'),data);
            }
        }
    });
}
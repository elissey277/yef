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

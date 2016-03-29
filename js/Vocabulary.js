function playAudio(audioLink){
    if(audioLink!=''){
        new Audio('../../music/words/'+audioLink).play();
    }
}

function addWord(language,word) {
    $.ajax({
        type: "POST",
        url: "../../ajax/vocabulary/addWord.php",
        data: "id=" + word + "&user=" + $.cookie('user') + "&language=" + language,
        success: function (data) {
            document.getElementById('action'+word).innerHTML = '<p class="text-action" onclick="removeWord('+language+','+word+')">' + titles[language]['remove-word'] + '</p>';
        }
    });
}

function removeWord(language,word) {
    $.ajax({
        type: "POST",
        url: "../../ajax/vocabulary/removeWord.php",
        data: "id=" + word + "&user=" + $.cookie('user') + "&language=" + language,
        success: function (data) {
            document.getElementById('action'+word).innerHTML = '<p class="text-action" onclick="addWord('+language+','+word+')">' + titles[language]['add-word'] + '</p>';
        }
    });
}
var landing = [
    {
        'lang-img': "images/lang/en.png",
        'welcome-text': "Make friends with <b>Your English Friend</b>!<br>And he will help you to learn English fast and interesting!",
        'welcome-text2': "Sign up for <b>FREE</b><br>and start learning English right now!",
        'landing-grammar-header': "Grammar",
        'landing-grammar-text': "Simple and clear description of grammar rules",
        'landing-vocabulary-header': "Vocabulary",
        'landing-vocabulary-text': "Glossaries for talking on different topics, etc.",
        'landing-exercises-header': "Exercises",
        'landing-exercises-text': "Consolidating of grammar rules by exercises",
        'landing-testing-header': "Testing",
        'landing-testing-text': "7 levels of testings for rapid words learning",
        'landing-chatting-header': "Chat",
        'landing-chatting-text': "Talking in English with your friends and new mates",
        'landing-library-header': "Library",
        'landing-library-text': "Huge collection of text and video materials",
        'landing-advices-header': "Advice",
        'landing-advices-text': "Useful advice about English learning",
        'reg-text': "Sign Up",
        'auth-text': "Sign In",
        'rest-text': "Restore Password",
        'preview-text': "Preview",
        'email': "Email",
        'password': "Password",
        'new-password': "New password",
        'password-confirm': "Confirm password",
        'name': "Name",
        'code': "Code",
        'reg': "Sign Up",
        'auth': "Sign In",
        'restore': "Restore",
        'confirm': "Confirm",
        'save': "Save",
        'error-same-email': "User with this Email already exists.",
        'error-empty-email': "Email should be inputted.",
        'error-empty-name': "Name should be inputted.",
        'error-empty-pass': "Password should be inputted.",
        'error-empty-pass-conf': "Confirm password should be inputted.",
        'error-not-same-pass': "Password and Confirm password don't match.",
        'error-no-user': "Email or Password is incorrect.",
        'error-empty-code': "Code should be inputted.",
        'error-no-code': "Code is incorrect.",
        'error-no-email': "User with this Email doesn't exist.",
        'info-code': "Code has been sent to your Email. <a class=\"info-msg-link\" onclick=\"sendEmailRestorePassword(document.getElementById('rest-email').value)\">Resend</a>.",
        'info-password': "Input new password."
    },
    {
        'lang-img': "images/lang/ru.png",
        'welcome-text': "Подружитесь с <b>Your English Friend</b>!<br>И он поможет Вам выучить английский язык быстро и интересно!",
        'welcome-text2': "Пройдите <b>БЕСПЛАТНУЮ</b> регистрацию<br>и начинайте учить английский язык прямо сейчас!",
        'landing-grammar-header': "Грамматика",
        'landing-grammar-text': "Простое и понятное объяснение правил грамматики",
        'landing-vocabulary-header': "Лексика",
        'landing-vocabulary-text': "Глоссарии для общения на разные темы и т.д.",
        'landing-exercises-header': "Упражнения",
        'landing-exercises-text': "Закрепление правил грамматики упражнениями",
        'landing-testing-header': "Тестирования",
        'landing-testing-text': "7 уровней тестирования для быстрого изучения слов",
        'landing-chatting-header': "Общение",
        'landing-chatting-text': "Общение на английском с друзьями и новыми знакомыми",
        'landing-library-header': "Библиотека",
        'landing-library-text': "Большой сборник текстовых и видео материалов",
        'landing-advices-header': "Советы",
        'landing-advices-text': "Полезные советы по изучению английского языка",
        'reg-text': "Регистрация",
        'auth-text': "Вход",
        'rest-text': "Восстановление пароля",
        'preview-text': "Предпросмотр",
        'email': "Email",
        'password': "Пароль",
        'new-password': "Новый пароль",
        'password-confirm': "Подтверждение пароля",
        'name': "Имя",
        'code': "Код",
        'reg': "Зарегистрироваться",
        'auth': "Войти",
        'restore': "Восстановить",
        'confirm': "Подтвердить",
        'save': "Сохранить",
        'error-same-email': "Пользователь с таким Email уже существует.",
        'error-empty-email': "Email должен быть введен.",
        'error-empty-name': "Имя должно быть введено.",
        'error-empty-pass': "Пароль должен быть введен.",
        'error-empty-pass-conf': "Подтверждение пароля должно быть введено.",
        'error-not-same-pass': "Пароль и подтверждение пароля не совпадают.",
        'error-no-user': "Email или Пароль введены неправильно.",
        'error-empty-code': "Код должен быть введен.",
        'error-no-code': "Код введен неправильно.",
        'error-no-email': "Пользователь с таким Email не существует.",
        'info-code': "Код был отправлен на Ваш Email. <a class=\"info-msg-link\" onclick=\"sendEmailRestorePassword(document.getElementById('rest-email').value)\">Отправить заново</a>.",
        'info-password': "Введите новый пароль."
    }
];

function scaling(){
    var index = Math.ceil(innerWidth*innerHeight/50000)-10;
    var fontSize = 100 + Math.ceil(index * 3);
    document.getElementById("func1").style.fontSize = fontSize+"%";
    document.getElementById("func2").style.fontSize = fontSize+"%";
    document.getElementById("func3").style.fontSize = fontSize+"%";
    document.getElementById("func4").style.fontSize = fontSize+"%";
    document.getElementById("func5").style.fontSize = fontSize+"%";
    document.getElementById("func6").style.fontSize = fontSize+"%";
    document.getElementById("func7").style.fontSize = fontSize+"%";
    var imageSize = 50 + index * 3;
    document.getElementById("funcImage1").style.height = imageSize;
    document.getElementById("funcImage2").style.height = imageSize;
    document.getElementById("funcImage3").style.height = imageSize;
    document.getElementById("funcImage4").style.height = imageSize;
    document.getElementById("funcImage5").style.height = imageSize;
    document.getElementById("funcImage6").style.height = imageSize;
    document.getElementById("funcImage7").style.height = imageSize;
    var flagSize = 40 + index * 2;
    document.getElementById("langImage0").style.height = flagSize;
    document.getElementById("langImage1").style.height = flagSize;
    document.getElementById("logo-image").style.height = 50 + index * 3;
    document.getElementById("welcome-text").style.fontSize = 18 + index;
    document.getElementById("welcome-text2").style.fontSize = 16 + index;
    var formSize = 225 + index * 10;
    document.getElementById("reg-form").style.width = formSize;
    document.getElementById("auth-form").style.width = formSize;
    document.getElementById("rest-form").style.width = formSize;
    var signHeader = 20 + index;
    document.getElementById("reg-header").style.fontSize = signHeader;
    document.getElementById("auth-header").style.fontSize = signHeader;
    document.getElementById("rest-header").style.fontSize = signHeader;
    var signInput = 14 + index;
    document.getElementById("reg-email").style.fontSize = signInput;
    document.getElementById("reg-password").style.fontSize = signInput;
    document.getElementById("reg-password-confirm").style.fontSize = signInput;
    document.getElementById("reg-name").style.fontSize = signInput;
    document.getElementById("auth-email").style.fontSize = signInput;
    document.getElementById("auth-password").style.fontSize = signInput;
    document.getElementById("rest-email").style.fontSize = signInput;
    document.getElementById("rest-password").style.fontSize = signInput;
    document.getElementById("rest-password-confirm").style.fontSize = signInput;
    document.getElementById("rest-code").style.fontSize = signInput;
    var signInputHeight = 24 + index * 2;
    document.getElementById("reg-email").style.height = signInputHeight;
    document.getElementById("reg-password").style.height = signInputHeight;
    document.getElementById("reg-password-confirm").style.height = signInputHeight;
    document.getElementById("reg-name").style.height = signInputHeight;
    document.getElementById("auth-email").style.height = signInputHeight;
    document.getElementById("auth-password").style.height = signInputHeight;
    document.getElementById("rest-email").style.height = signInputHeight;
    document.getElementById("rest-password").style.height = signInputHeight;
    document.getElementById("rest-password-confirm").style.height = signInputHeight;
    document.getElementById("rest-code").style.height = signInputHeight;
    var signButton = 15 + index;
    document.getElementById("reg-button").style.fontSize = signButton;
    document.getElementById("auth-button").style.fontSize = signButton;
    document.getElementById("rest-button").style.fontSize = signButton;
    document.getElementById("rest-button-code").style.fontSize = signButton;
    document.getElementById("rest-button-save").style.fontSize = signButton;
    var signText = 14 + Math.ceil(index * 0.5);
    document.getElementById("reg-text-auth").style.fontSize = signText;
    document.getElementById("reg-text-preview").style.fontSize = signText;
    document.getElementById("auth-text-reg").style.fontSize = signText;
    document.getElementById("auth-text-rest").style.fontSize = signText;
    document.getElementById("rest-text-auth").style.fontSize = signText;
    document.getElementById("reg-error-msg").style.fontSize = signText;
    document.getElementById("auth-error-msg").style.fontSize = signText;
    document.getElementById("rest-error-msg").style.fontSize = signText;
    document.getElementById("rest-info-msg").style.fontSize = signText;
}

function selectLang(lang){
    $.cookie('language',lang);
    document.getElementById("welcome-text").innerHTML = landing[lang]['welcome-text'];
    document.getElementById("welcome-text2").innerHTML = landing[lang]['welcome-text2'];
    document.getElementById("grammar-header").innerHTML = landing[lang]['landing-grammar-header'];
    document.getElementById("grammar-text").innerHTML = landing[lang]['landing-grammar-text'];
    document.getElementById("vocabulary-header").innerHTML = landing[lang]['landing-vocabulary-header'];
    document.getElementById("vocabulary-text").innerHTML = landing[lang]['landing-vocabulary-text'];
    document.getElementById("exercises-header").innerHTML = landing[lang]['landing-exercises-header'];
    document.getElementById("exercises-text").innerHTML = landing[lang]['landing-exercises-text'];
    document.getElementById("testing-header").innerHTML = landing[lang]['landing-testing-header'];
    document.getElementById("testing-text").innerHTML = landing[lang]['landing-testing-text'];
    document.getElementById("chatting-header").innerHTML = landing[lang]['landing-chatting-header'];
    document.getElementById("chatting-text").innerHTML = landing[lang]['landing-chatting-text'];
    document.getElementById("library-header").innerHTML = landing[lang]['landing-library-header'];
    document.getElementById("library-text").innerHTML = landing[lang]['landing-library-text'];
    document.getElementById("advices-header").innerHTML = landing[lang]['landing-advices-header'];
    document.getElementById("advices-text").innerHTML = landing[lang]['landing-advices-text'];
    document.getElementById("reg-header").innerText = landing[lang]['reg-text'];
    document.getElementById("auth-header").innerText = landing[lang]['auth-text'];
    document.getElementById("rest-header").innerText = landing[lang]['rest-text'];
    document.getElementById("reg-email").placeholder = landing[lang]['email'];
    document.getElementById("reg-name").placeholder = landing[lang]['name'];
    document.getElementById("reg-password").placeholder = landing[lang]['password'];
    document.getElementById("reg-password-confirm").placeholder = landing[lang]['password-confirm'];
    document.getElementById("auth-email").placeholder = landing[lang]['email'];
    document.getElementById("auth-password").placeholder = landing[lang]['password'];
    document.getElementById("rest-email").placeholder = landing[lang]['email'];
    document.getElementById("rest-code").placeholder = landing[lang]['code'];
    document.getElementById("rest-password").placeholder = landing[lang]['new-password'];
    document.getElementById("rest-password-confirm").placeholder = landing[lang]['password-confirm'];
    document.getElementById("reg-button").value = landing[lang]['reg'];
    document.getElementById("auth-button").value = landing[lang]['auth'];
    document.getElementById("rest-button").value = landing[lang]['restore'];
    document.getElementById("rest-button-code").value = landing[lang]['confirm'];
    document.getElementById("rest-button-save").value = landing[lang]['save'];
    document.getElementById("reg-text-auth").innerText = landing[lang]['auth-text'];
    document.getElementById("reg-text-preview").innerText = landing[lang]['preview-text'];
    document.getElementById("auth-text-reg").innerText = landing[lang]['reg-text'];
    document.getElementById("auth-text-rest").innerText = landing[lang]['rest-text'];
    document.getElementById("rest-text-auth").innerText = landing[lang]['auth-text'];
    scaling();
}

function changeForm(choice) {
    switch (choice) {
        case 1:
            document.getElementById("reg-form").style.display = "block";
            document.getElementById("auth-form").style.display = "none";
            document.getElementById("rest-form").style.display = "none";
            document.getElementById("reg-email").focus();
            break;
        case 2:
            document.getElementById("reg-form").style.display = "none";
            document.getElementById("auth-form").style.display = "block";
            document.getElementById("rest-form").style.display = "none";
            document.getElementById("auth-email").focus();
            break;
        case 3:
            document.getElementById("reg-form").style.display = "none";
            document.getElementById("auth-form").style.display = "none";
            document.getElementById("rest-form").style.display = "block";
            document.getElementById("rest-email").focus();
            break;
        default:
            document.getElementById("reg-form").style.display = "block";
            document.getElementById("auth-form").style.display = "none";
            document.getElementById("rest-form").style.display = "none";
            document.getElementById("reg-email").focus();
            break;
    }
}
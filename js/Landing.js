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
    document.getElementById("sign-form").style.width = 225 + index * 10;
    var signHeader = 20 + index;
    document.getElementById("header-in").style.fontSize = signHeader;
    document.getElementById("header-up").style.fontSize = signHeader;
    var signInput = 14 + index;
    document.getElementById("email").style.fontSize = signInput;
    document.getElementById("password").style.fontSize = signInput;
    document.getElementById("name").style.fontSize = signInput;
    var signInputHeight = 24 + index * 2;
    document.getElementById("email").style.height = signInputHeight;
    document.getElementById("password").style.height = signInputHeight;
    document.getElementById("name").style.height = signInputHeight;
    var signButton = 15 + index;
    document.getElementById("button-in").style.fontSize = signButton;
    document.getElementById("button-up").style.fontSize = signButton;
    var signText = 14 + Math.ceil(index * 0.5);
    document.getElementById("text-in").style.fontSize = signText;
    document.getElementById("text-up").style.fontSize = signText;
    document.getElementById("text-in2").style.fontSize = signText;
    document.getElementById("text-up2").style.fontSize = signText;
    document.getElementById("error-msg").style.fontSize = signText;
}

function selectLang(lang){
    $.cookie('language',lang,{path:'/'});
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
    document.getElementById("header-up").innerHTML = landing[lang]['sign-up-header'];
    document.getElementById("header-in").innerHTML = landing[lang]['sign-in-header'];
    document.getElementById("button-up").value = landing[lang]['sign-up-button'];
    document.getElementById("button-in").value = landing[lang]['sign-in-button'];
    document.getElementById("text-up").innerHTML = landing[lang]['sign-up-text'];
    document.getElementById("text-in").innerHTML = landing[lang]['sign-in-text'];
    document.getElementById("text-up2").innerHTML = landing[lang]['sign-up-text2'];
    document.getElementById("text-in2").innerHTML = landing[lang]['sign-in-text2'];
    document.getElementById("password").placeholder = landing[lang]['reg-form-password'];
    document.getElementById("name").placeholder = landing[lang]['reg-form-name'];
    scaling();
}

function signInUp(choice) {
    if (choice == 1) {
        document.getElementById("header-up").style.display = "none";
        document.getElementById("header-in").style.display = "block";
        document.getElementById("name").style.display = "none";
        document.getElementById("buttons-up").style.display = "none";
        document.getElementById("buttons-in").style.display = "block";
    } else {
        document.getElementById("header-up").style.display = "block";
        document.getElementById("header-in").style.display = "none";
        document.getElementById("name").style.display = "block";
        document.getElementById("buttons-up").style.display = "block";
        document.getElementById("buttons-in").style.display = "none";
    }
}
$(document).ready(function() {

// Constants of the main containers
const startWrapper = document.getElementById("start-wrapper"); 
const quizWrapper = document.getElementById("quiz-wrapper"); 
const leaderboardWrapper = document.getElementById("leaderboard-wrapper"); 

// Constants of the start container
const startBtn = document.getElementById("start-btn"); 

// Constants of the quiz container
const question = document.getElementById("question"); 
const answersWrapper = document.getElementById("answers-wrapper"); 
const nextBtn = document.getElementById("next-btn"); 
const progressBar = document.getElementById("progress-bar"); 

// Constants of the retry button
const retryBtn = document.getElementById("retry-btn"); 

let checkedAnswer = null; 
let currentQuestion = 0; 
let score = 0; 
let progress = 0; 

let timer; 
let timeLeft = 30; 




    // Function to clear all cookies
    function clearCookies() {
        document.cookie.split(";").forEach((c) => {
            document.cookie = c.trim().split("=")[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        });
    }

// Function to display the default welcome message
function showDefaultWelcomeMessage() {
    $('#welcome-message').html('Welcome! Please log in.');
}

// Function to display the welcome message with the username
function showWelcomeMessage() {
    const username = getCookie("username");
    if (username) {
        $('#welcome-message').html(`Welcome, ${username}!`);
    } else {
        showDefaultWelcomeMessage();
    }
}

// Call the function to clear cookies and display the default welcome message when the page loads
window.onload = function() {
    clearCookies();
    showDefaultWelcomeMessage();
}

// Array of questions and answers
let questions = [
    {
        category: "Basic Numeracy",
        question: "What is 7 + 5? (Hint: It's not 'a lot')",
        answer1: "10",
        answer2: "12",
        answer3: "15",
        correctAnswer: "a-2"
    },
    {
        category: "Basic Numeracy",
        question: "If you have 8 bananas and you eat 3, how many bananas are left? (No, you can't eat more right now!)",
        answer1: "5",
        answer2: "4",
        answer3: "6",
        correctAnswer: "a-1"
    },
    {
        category: "Basic Numeracy",
        question: "What is the next number in the sequence: 2, 4, 6, 8, ? (Hint: It's a perfect 10!)",
        answer1: "9",
        answer2: "10",
        answer3: "12",
        correctAnswer: "a-2"
    },
    {
        category: "Basic Numeracy",
        question: "What is 9 - 3? (Think of it like eating 9 cookies and giving 3 to a friend)",
        answer1: "5",
        answer2: "6",
        answer3: "7",
        correctAnswer: "a-2"
    },
    {
        category: "Basic Numeracy",
        question: "Which of these numbers is odd? (And no, it's not a weirdo number)",
        answer1: "2",
        answer2: "4",
        answer3: "7",
        correctAnswer: "a-3"
    },
    {
        category: "Basic Literacy",
        question: "Which word is spelled correctly? (Cats would know this one)",
        answer1: "Cat",
        answer2: "Kat",
        answer3: "Catt",
        correctAnswer: "a-1"
    },
    {
        category: "Basic Literacy",
        question: "What is the opposite of 'cold'? (Imagine your ice cream melting!)",
        answer1: "Cool",
        answer2: "Warm",
        answer3: "Freezing",
        correctAnswer: "a-2"
    },
    {
        category: "Basic Literacy",
        question: "Which punctuation mark ends this sentence: Where are we going___ (Hint: It's not a banana!)",
        answer1: "?",
        answer2: "!",
        answer3: ".",
        correctAnswer: "a-1"
    },
    {
        category: "Basic Literacy",
        question: "What is the plural form of 'fish'? (No fishies here!)",
        answer1: "Fish",
        answer2: "Fishes",
        answer3: "Fishies",
        correctAnswer: "a-1"
    },
    {
        category: "Basic Literacy",
        question: "What type of word is 'jump'? (Imagine a frog doing this)",
        answer1: "Noun",
        answer2: "Verb",
        answer3: "Adjective",
        correctAnswer: "a-2"
    },
    {
        category: "Health and Wellbeing",
        question: "How many times a day should you brush your teeth? (Hint: It's more than once and less than thrice)",
        answer1: "Once",
        answer2: "Twice",
        answer3: "Three times",
        correctAnswer: "a-2"
    },
    {
        category: "Health and Wellbeing",
        question: "Which of these is a healthy snack? (Hint: Bugs Bunny would approve)",
        answer1: "Chips",
        answer2: "Carrot sticks",
        answer3: "Candy",
        correctAnswer: "a-2"
    },
    {
        category: "Health and Wellbeing",
        question: "How many hours of sleep should kids get each night? (Hint: More than a cat nap)",
        answer1: "5-6 hours",
        answer2: "7-8 hours",
        answer3: "9-10 hours",
        correctAnswer: "a-3"
    },
    {
        category: "Health and Wellbeing",
        question: "What is a benefit of drinking water? (Hint: It won't turn you into a fish)",
        answer1: "It keeps you hydrated",
        answer2: "It makes you tired",
        answer3: "It makes you hungry",
        correctAnswer: "a-1"
    },
    {
        category: "Health and Wellbeing",
        question: "What should you eat to stay healthy? (Hint: Not just cookies!)",
        answer1: "Only sweets",
        answer2: "A variety of foods",
        answer3: "Only meat",
        correctAnswer: "a-2"
    },
    {
        category: "Scottish History",
        question: "What animal is a symbol of Scotland? (Hint: It's not a haggis)",
        answer1: 'Lion',
        answer2: 'Unicorn',
        answer3: 'Dragon',
        correctAnswer: "a-2"
    },
    {
        category: "Scottish History",
        question: "Which famous Scottish food is made from sheep's organs? (It's not a pizza!)",
        answer1: "Haggis",
        answer2: "Porridge",
        answer3: "Shortbread",
        correctAnswer: "a-1"
    },
    {
        category: "Scottish History",
        question: "What is the capital of Scotland? (Hint: It rhymes with 'Fedinburgh')",
        answer1: "Glasgow",
        answer2: "Edinburgh",
        answer3: "Aberdeen",
        correctAnswer: "a-2"
    },
    {
        category: "Scottish History",
        question: "Which Scottish lake is famous for its mythical monster? (Hint: It's not Loch Spaghetti)",
        answer1: "Loch Lomond",
        answer2: "Loch Ness",
        answer3: "Loch Tay",
        correctAnswer: "a-2"
    },
    {
        category: "Scottish History",
        question: "Who is the patron saint of Scotland? (Hint: It's not Saint Awesome)",
        answer1: "Saint Patrick",
        answer2: "Saint Andrew",
        answer3: "Saint George",
        correctAnswer: "a-2"
    },
    {
        category: "Social Awareness",
        question: "What does 'recycling' mean? (Hint: It's not about riding bikes)",
        answer1: "Throwing away trash",
        answer2: "Using things again instead of throwing them away",
        answer3: "Buying new things",
        correctAnswer: "a-2"
    },
    {
        category: "Social Awareness",
        question: "Which action helps the environment? (Hint: Trees love this)",
        answer1: "Planting trees",
        answer2: "Using more plastic",
        answer3: "Wasting water",
        correctAnswer: "a-1"
    },
    {
        category: "Social Awareness",
        question: "What is a community? (Hint: It's more than just you and your cat)",
        answer1: "A place where one person lives",
        answer2: "A group of people living together",
        answer3: "A single building",
        correctAnswer: "a-2"
    },
    {
        category: "Social Awareness",
        question: "Why is helping others important? (Hint: It's better than being a superhero!)",
        answer1: "It makes the community better",
        answer2: "It wastes time",
        answer3: "It only helps you",
        correctAnswer: "a-1"
    },
    {
        category: "Social Awareness",
        question: "What is fairness? (Hint: It's not about having the same number of cookies)",
        answer1: "Treating everyone the same",
        answer2: "Being kind and just to everyone",
        answer3: "Giving some people more",
        correctAnswer: "a-2"
    },
];


// Function to update and display the current date and time
function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString(); 
    $('#date-time').html(dateTimeString);
}

const throttledUpdateDateTime = _.throttle(updateDateTime, 1000);

throttledUpdateDateTime();

setInterval(throttledUpdateDateTime, 1000);



// Function to validate the email address format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
}

// Function to validate the username format
function validateUsername(username) {
    const words = username.trim().split(/\s+/); 
    const totalLength = username.replace(/\s/g, '').length; 
    if (words.length === 2 && totalLength <= 16 && /^[A-Za-z\s]+$/.test(username)) {
        return true; 
    }
    return false;
}

// Event listener for the start button click
startBtn.addEventListener("click", function() {
    const usernameValue = document.getElementById("username").value;
    const emailValue = document.getElementById("email").value;
    const usernameError = document.getElementById("username-error");
    const emailError = document.getElementById("email-error");

    let valid = true;

    if (!validateUsername(usernameValue)) {
        usernameError.textContent = "Username must consist of exactly two words, no more than 16 characters long, and only contain English letters.";
        usernameError.style.display = "block";
        document.getElementById("username").style.borderColor = "red";
        valid = false;
    } else {
        usernameError.style.display = "none";
        document.getElementById("username").style.borderColor = "";
    }

    if (!validateEmail(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
        document.getElementById("email").style.borderColor = "red";
        valid = false;
    } else {
        emailError.style.display = "none";
        document.getElementById("email").style.borderColor = "";
    }

    if (valid) {
        // Save cookies only after validating the data
        setCookie("username", usernameValue, 1);
        setCookie("email", emailValue, 1);
        startWrapper.style.cssText = "display: none";
        quizWrapper.style.cssText = "display: flex; flex-direction: column; justify-content: center;";
        setQuestions();
        startTimer();
        showWelcomeMessage(); // Show welcome message with the username
    }
});

// Event listeners for username input focus and blur
$('#username').focus(function() {
    if ($(this).val() === "") {
        $('#username-placeholder').css('opacity', '0');
    }
}).blur(function() {
    if ($(this).val() === "") {
        $('#username-placeholder').css('opacity', '1');
    }
})

$('#email').focus(function() {
    if ($(this).val() === "") {
        $('#email-placeholder').css('opacity', '0');
    }
}).blur(function() {
    if ($(this).val() === "") {
        $('#email-placeholder').css('opacity', '1');
    }
})

// Function to set a cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Function to get a cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Function to set a question and its answers
function setQuestions() {
    const currentCategory = questions[currentQuestion].category;
    const categoryQuestions = questions.filter(q => q.category === currentCategory);
    const questionIndex = categoryQuestions.findIndex(q => q.question === questions[currentQuestion].question) + 1;
    const totalQuestionsInCategory = categoryQuestions.length;

    document.getElementById('category').innerText = `Category: ${currentCategory}`;
    document.getElementById('question-number').innerText = `Question ${questionIndex} of ${totalQuestionsInCategory}`;
    question.innerHTML = questions[currentQuestion].question;

    answersWrapper.innerHTML =
        '<div id="answers-js-wrapper"><div class="answer-wrapper"><input type="radio" name="answers" class="answer-input" id="answer-1" ><span class="checkmark"></span><label for="answer-1" class="answer" id="a-1">' + questions[currentQuestion].answer1 + '</label></div>'
        + '<div class="answer-wrapper"><input type="radio" name="answers" class="answer-input" id="answer-2"><span class="checkmark"></span><label for="answer-2" class="answer" id="a-2">' + questions[currentQuestion].answer2 + '</label></div>'
        + '<div class="answer-wrapper"><input type="radio" name="answers" class="answer-input" id="answer-3"><span class="checkmark"></span><label for="answer-3" class="answer" id="a-3">' + questions[currentQuestion].answer3 + '</label></div></div>';
    checkAnswer();
    startTimer(); 
}

// Function to start the timer for each question
function startTimer() {
    clearInterval(timer); 
    timeLeft = 30; 
    document.getElementById("timer").innerHTML = timeLeft; 

    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").innerHTML = timeLeft; 

        if (timeLeft <= 0) {
            clearInterval(timer); 
            nextQuestion(); 
        }
    }, 1000); 
}

// Function to update the progress bar
function addProgress() {
    progressBar.style.cssText = "width:" + progress + "%";

    const progressBN = document.getElementById("progress_basic_numeracy");
    const progressBL = document.getElementById("progress_basic_literacy");
    const progressHAW = document.getElementById("progress_basic_health_and_wellbeing");
    const progressSH = document.getElementById("progress_basic_scottish_history");
    const progressSA = document.getElementById("progress_basic_social_awareness");

    progress += 3.8; 

    if (progress >= 20) {
        progressBN.style.cssText = "background: red; border-color: red; animation: progressSection 300ms ease-out;";
    } else {
        progressBN.style.cssText = "background: #f3f5fc; border-color: #e7ecfb";
    }
    if (progress >= 40) {
        progressBL.style.cssText = "background: red; border-color: red; animation: progressSection 300ms ease-out;";
    } else {
        progressBL.style.cssText = "background: #f3f5fc; border-color: #e7ecfb";
    }
    if (progress >= 60) {
        progressHAW.style.cssText = "background: red; border-color: red; animation: progressSection 300ms ease-out;";
    } else {
        progressHAW.style.cssText = "background: #f3f5fc; border-color: #e7ecfb";
    }
    if (progress >= 76) {
        progressSH.style.cssText = "background: red; border-color: red; animation: progressSection 300ms ease-out;";
    } else {
        progressSH.style.cssText = "background: #f3f5fc; border-color: #e7ecfb";
    }
    if (progress >= 100) {
        progressSA.style.cssText = "background: red; border-color: red; animation: progressSection 300ms ease-out;";
    } else {
        progressSA.style.cssText = "background: #f3f5fc; border-color: #e7ecfb";
    }
}

// Function to check the selected answer
function checkAnswer() {
    const answers = document.querySelectorAll(".answer-input"); // Get all radio buttons
    answers.forEach((answer, index) => {
        answer.addEventListener("change", function () {
            if (this.checked) {
                checkedAnswer = "a-" + (index + 1); // Correctly store the selected answer in the format 'a-1', 'a-2', etc.
            }
        });
    });
}

checkAnswer(); 

nextBtn.addEventListener("click", function () {
    clearInterval(timer); 
    nextQuestion(); 
});

// Function to move to the next question
function nextQuestion() {
    let correctAnswer = questions[currentQuestion].correctAnswer;

    if (checkedAnswer === correctAnswer) {
        score += 1; 
    }

    const lastQuestion = questions.length - 1;
    if (currentQuestion < lastQuestion) {
        currentQuestion++;
        setQuestions(); 
        addProgress();
        startTimer(); 
    } else {
        leaderboard(); 
    }
    checkedAnswer = null
    checkAnswer(); 
}

// Function to display the leaderboard
function leaderboard() {
    quizWrapper.style.display = "none";
    leaderboardWrapper.style.display = "block";

    const username = getCookie("username");
    const table = document.getElementById("table");
    if(score<7){
        table.innerHTML += "<tr><td class='table-username'>" + username + "</td><td class='table-score-title' style='color:red, font-weight: 800'>" + score + "</td>"+ "<td class='table-comment-title' style='color:red'>" + "Come on, you can do much more better!" + "</td>"+ "</tr>" ;
    } else if(score >= 7 && score < 15){
        table.innerHTML += "<tr><td class='table-username'>" + username + "</td><td class='table-score-title' style='color:green, font-weight: 800'>" + score + "</td>"+ "<td class='table-comment-title' style='color:green'>" + "Good job! You're almost there!" + "</td></tr>" ;

    }
    
    
    
    
    else{
        table.innerHTML += "<tr><td class='table-username'>" + username + "</td><td class='table-score-title' style='color:green, font-weight: 800'>" + score + "</td>"+ "<td class='table-comment-title' style='color:green'>" + "Awesome! You're a quiz superstar!"+ "</td></tr>";
    }
    
}

// Event listener for the retry button click
retryBtn.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    progress = 0;

    leaderboardWrapper.style.display = "none";
    startWrapper.style.display = "block";

    clearCookies(); 
    showDefaultWelcomeMessage(); 

    setQuestions(); 
    checkAnswer(); 
    addProgress(); 
});
});

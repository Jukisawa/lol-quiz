// --- GAME HANDLING ---
function handleQuestionClick(questionDiv) {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const content = document.getElementById('popup-content');
    const buttons = document.getElementById('popup-buttons');
    const toggleButton = document.getElementById('toggle-answer-button');

    // Retrieve data from the clicked question div
    const points = parseInt(questionDiv.dataset.points);
    popup.dataset.points = points; // Set the points on the popup for later use
    const question = questionDiv.dataset.question;
    const answer = questionDiv.dataset.answer;

    currentQuestion = question;
    currentAnswer = answer;
    currentQuestionObj = questionDiv.questionObj || null;

    // Collect hints and sort them
    currentHints = [];
    if (currentQuestionObj) {
        currentHints = Object.keys(currentQuestionObj)
            .filter(key => key.startsWith('hint'))
            .sort()
            .map(key => currentQuestionObj[key]);
    }
    currentHintIndex = 0;

    content.innerHTML = currentQuestion.replace(/\n/g, '<br>'); // Replace \n with <br>
    buttons.innerHTML = '';

    // Display hint-button only if hints are available
    if (currentHints.length > 0) {
        const hintButton = document.createElement('button');
        hintButton.textContent = 'Hinweis anzeigen';
        hintButton.onclick = function() {
            if (currentHintIndex < currentHints.length) {
                let hintDiv = document.getElementById('hint-div');
                if (!hintDiv) {
                    hintDiv = document.createElement('div');
                    hintDiv.id = 'hint-div';
                    hintDiv.className = 'hint';
                    content.appendChild(hintDiv);
                }
                // Append the new hint
                const hintHtml = `<div><b>Hinweis:</b> ${currentHints[currentHintIndex]}</div>`;
                hintDiv.innerHTML += hintHtml;
                currentHintIndex++;
                if (currentHintIndex >= currentHints.length) {
                    hintButton.disabled = true;
                    hintButton.textContent = 'Keine weiteren Hinweise';
                }
            }
        };
        buttons.appendChild(hintButton);
    }

    toggleButton.textContent = 'Antwort';

    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function toggleAnswer() {
    const content = document.getElementById('popup-content');
    const buttons = document.getElementById('popup-buttons');
    const toggleButton = document.getElementById('toggle-answer-button');

    if (!showingAnswer) {
        content.innerHTML = currentAnswer.replace(/\n/g, '<br>');
        buttons.innerHTML = '';
        for (let i = 1; i <= teamCount; i++) {
            const teamName = document.getElementById(`team${i}`).textContent.split(':')[0];
            const button = document.createElement('button');
            button.textContent = teamName;
            button.onclick = () => {
                updateScore(i, parseInt(document.querySelector('.popup').dataset.points));
                closePopup();
            };
            buttons.appendChild(button);
        }
        toggleButton.textContent = 'Frage';
    } else {
        // Display Question and reset hints
        handleQuestionClick(document.querySelector(`.question[data-question="${currentQuestion}"][data-points="${document.querySelector('.popup').dataset.points}"]`));
    }

    showingAnswer = !showingAnswer;
}

function updateScore(team, points) {
    scores[team - 1] += points;
    document.getElementById(`score${team}`).textContent = scores[team - 1];

    // Save points to cookie
    setCookie('scores', JSON.stringify(scores));

    // Make the question div gray and save its status
    const questionDivs = document.querySelectorAll('.question');
    questionDivs.forEach(div => {
        if (div.dataset.question === currentQuestion) {
            div.classList.add('answered');
            // Save unique ID for question
            const qid = div.dataset.question + '|' + div.dataset.points;
            if (!answeredQuestions.includes(qid)) {
                answeredQuestions.push(qid);
                setCookie('answeredQuestions', JSON.stringify(answeredQuestions));
            }
        }
    });

    closePopup();
}

function populateQuestions(data) {
    const board = document.querySelector('.jeopardy-board');
    board.innerHTML = '';

    const categories = Object.keys(data);
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        if (category.length > 12) categoryDiv.classList.add('adjust-font-size');
        categoryDiv.textContent = category;
        board.appendChild(categoryDiv);
    });

    const maxQuestions = Math.max(...categories.map(category => data[category].length));
    for (let i = 0; i < maxQuestions; i++) {
        categories.forEach(category => {
            const question = data[category][i];
            if (question) {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question';
                questionDiv.textContent = question.points;
                questionDiv.questionObj = question;
                questionDiv.dataset.question = question.question;
                questionDiv.dataset.answer = question.answer;
                questionDiv.dataset.points = question.points;
                questionDiv.onclick = () => handleQuestionClick(questionDiv);

                // Add right-click event to mark as answered without giving points
                questionDiv.oncontextmenu = function(e) {
                    e.preventDefault();
                    questionDiv.classList.add('answered');
                    const qid = question.question + '|' + question.points;
                    if (!answeredQuestions.includes(qid)) {
                        answeredQuestions.push(qid);
                        setCookie('answeredQuestions', JSON.stringify(answeredQuestions));
                    }
                    return false;
                };

                // When the question is a guess question, add a special class
                if (question.guess === true) {
                    questionDiv.classList.add('guess-question');
                }

                // Check if the question has been answered
                const qid = question.question + '|' + question.points;
                if (answeredQuestions.includes(qid)) {
                    questionDiv.classList.add('answered');
                }

                board.appendChild(questionDiv);
            } else {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'question';
                emptyDiv.style.visibility = 'hidden';
                board.appendChild(emptyDiv);
            }
        });
    }
}


// Load saved scores from cookie
function loadScores() {
    const savedScores = getCookie('scores');
    if (savedScores) {
        const arr = JSON.parse(savedScores);
        teamCount = arr.length; // set teamCount based on saved scores

        const teamScores = document.querySelector('.team-scores');
        teamScores.innerHTML = '';
        const settingsMenu = document.getElementById('settings-menu');
        //Only remove team name inputs
        Array.from(settingsMenu.querySelectorAll('input[id^="team"]')).forEach(input => input.remove());

        for (let i = 0; i < arr.length; i++) {
            // Team-Div
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team';
            teamDiv.id = `team${i+1}`;
            teamDiv.innerHTML = `Team ${i+1}: <span id="score${i+1}">${arr[i]}</span>`;
            teamScores.appendChild(teamDiv);

            // Input field for team name
            const teamInput = document.createElement('input');
            teamInput.type = 'text';
            teamInput.id = `team${i+1}-name`;
            teamInput.placeholder = `Enter Team ${i+1} Name`;
            document.getElementById('team-inputs').appendChild(teamInput);

            // Live update team name
            teamInput.addEventListener('input', function() {
                const teamDiv = document.getElementById(`team${i+1}`);
                if (teamDiv) {
                    teamDiv.innerHTML = `${this.value || 'Team ' + (i+1)}: <span id="score${i+1}">${scores[i] || 0}</span>`;
                }
            });
        }

        // update score array
        for (let i = 0; i < arr.length; i++) {
            scores[i] = arr[i];
        }
    } else {
        // if no saved scores, initialize with 4 teams
        teamCount = 4;
    }
}

function loadQuestions() {
    const savedQuestions = sessionStorage.getItem('questions');
    if (savedQuestions) {
        populateQuestions(JSON.parse(savedQuestions));
    } else {
        fetch('question.json')
            .then(response => response.json())
            .then(data => {
                populateQuestions(data);
            });
    }
    answeredQuestions = JSON.parse(getCookie('answeredQuestions') || '[]');
}

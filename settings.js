// --- SETTINGS HANDLING ---
function toggleSettingsMenu() {
    const menu = document.getElementById("settings-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function updateQuizTitle() {
    const titleInput = document.getElementById('quiz-title-input');
    const newTitle = titleInput.value.trim();
    if (newTitle) {
        document.title = newTitle;
        document.querySelector('h1').textContent = newTitle;
        setCookie('quizTitle', newTitle);
    }
}

function loadTitle() {
    // Restore title if saved
    const savedTitle = getCookie('quizTitle');
    if (savedTitle) {
        document.title = savedTitle;
        document.querySelector('h1').textContent = savedTitle;
    }
}

function addTeam() {
    if (teamCount >= 10) {
        alert("Maximum of 10 teams allowed.");
        return;
    }

    teamCount++;
    scores.push(0); // Add a new score entry for the new team

    // Add to the team-scores div
    const teamScores = document.querySelector('.team-scores');
    const newTeamDiv = document.createElement('div');
    newTeamDiv.className = 'team';
    newTeamDiv.id = `team${teamCount}`;
    newTeamDiv.innerHTML = `Team ${teamCount}: <span id="score${teamCount}">0</span>`;
    teamScores.appendChild(newTeamDiv);

    // Add to the team-inputs div in the settings menu
    const teamInputsDiv = document.getElementById('team-inputs');
    const newTeamInput = document.createElement('input');
    newTeamInput.type = 'text';
    newTeamInput.id = `team${teamCount}-name`;
    newTeamInput.placeholder = `Enter Team ${teamCount} Name`;
    teamInputsDiv.appendChild(newTeamInput);

    // Live update team name
    newTeamInput.addEventListener('input', function() {
        const teamDiv = document.getElementById(`team${teamCount}`);
        if (teamDiv) {
            teamDiv.innerHTML = `${this.value || 'Team ' + (teamCount)}: <span id="score${teamCount}">${scores[teamCount - 1] || 0}</span>`;
        }
    });

    setCookie('scores', JSON.stringify(scores));
}

function removeTeam() {
    if (teamCount <= 1) {
        alert("At least one team is required.");
        return;
    }

    // Remove the last team from the scores section
    const lastTeamDiv = document.getElementById(`team${teamCount}`);
    lastTeamDiv.remove();

    // Remove the corresponding input field from the settings menu
    const lastTeamInput = document.getElementById(`team${teamCount}-name`);
    lastTeamInput.remove();

    scores.pop(); // Remove the last score entry
    teamCount--;

    // save updated scores to cookie
    setCookie('scores', JSON.stringify(scores));
}

function resetScores() {
    for (let i = 0; i < teamCount; i++) {
        scores[i] = 0;
        const scoreSpan = document.getElementById(`score${i+1}`);
        if (scoreSpan) scoreSpan.textContent = 0;
    }
    setCookie('scores', JSON.stringify(scores));

    // Reset answered questions
    answeredQuestions = [];
    setCookie('answeredQuestions', JSON.stringify(answeredQuestions));
    document.querySelectorAll('.question.answered').forEach(div => div.classList.remove('answered'));
    toggleSettingsMenu(); // Close the settings menu after resetting
}

function deleteQuestionsCookie() {
    // Delete the questions cookie
    sessionStorage.removeItem('questions');
    resetScores(); // Reset scores and answered questions
    toggleSettingsMenu(); // Close the settings menu after deleting
    location.reload(); // Reload the page to refresh the board
}
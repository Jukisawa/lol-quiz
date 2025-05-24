// --- UTILITY FUNCTIONS ---
function toggleInfoMenu() {
    const menu = document.getElementById("info-menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    showingAnswer = false; // Reset to allow the next question to show
}

function setCookie(name, value, days = 365) {
    const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    const value = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return value ? decodeURIComponent(value.pop()) : null;
}

function downloadQuestions() {
    let questions = sessionStorage.getItem('questions');
    if (!questions) {
        fetch('question.json')
            .then(response => response.text())
            .then(text => triggerDownload(text))
            .catch(() => alert('No questions found!'));
    } else {
        triggerDownload(questions);
    }
}

function triggerDownload(content) {
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'question.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function addEventhandlers() {
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closePopup(); // Call the existing closePopup function
        }
    });

    // Drag & Drop for loading question.json
    document.addEventListener('dragover', function(e) {
        e.preventDefault();
        document.body.style.background = "#222"; // Optional: visual feedback
    });
    document.addEventListener('dragleave', function(e) {
        e.preventDefault();
        document.body.style.background = ""; // Reset background
    });
    document.addEventListener('drop', function(e) {
        e.preventDefault();
        document.body.style.background = ""; // Reset background

        if (e.dataTransfer.files.length === 0) return;
        const file = e.dataTransfer.files[0];
        if (!file.name.endsWith('.json')) {
            alert('Please drop a .json file!');
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            sessionStorage.setItem('questions', JSON.stringify(data));
            populateQuestions(data);
        } catch (error) {
            alert('Error loading questions: ' + error.message);
        }
    };
    reader.readAsText(file);
    });
}




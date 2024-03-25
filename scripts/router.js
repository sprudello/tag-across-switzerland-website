function navigateTo(event, path) {
    history.pushState(null, null, path);
    router();
    event.preventDefault();
}

function router() {
    const routes = {
        '/': homeView,
        '/Challenges': challengesView,
        '/Transportations': transportationsView,
        '/Items': itemsView,
        '/Profile': profileView,
    };

    const mainContent = document.getElementById('mainContent');
    const path = window.location.pathname;
    const viewFunction = routes[path] || errorView;

    mainContent.innerHTML = viewFunction();
    if (path === '/Profile' && isLoggedIn()) {
        profileView();  // This should only be called if isLoggedIn() returns true
    }
    if (path === '/') {
        makeCollapsible();
    }
}

function homeView() {
    return `
    <h1>Willkommen bei TagAcrossCH!</h1>
    <p>Hier sind die Spielregeln:</p>
    <div id="rules">
        <h3 class="collapsible">Ziel:</h3>
        <div class="content">
            <ul>
                <li>jede Gruppe/Person muss so nahe wie möglich an seinen Zielort kommen.</li>
                <li>Wenn diese Gruppe/Person den Zielort erreicht, ist das Spiel beendet und diese Gruppe ist die Siegergruppe.</li>
                <li>Falls eine Gegnergruppe über den Zielort der anderen Gruppe fährt, zählt das nicht als ein Sieg der Gruppe, die diesen Ort als Ziel hat.</li>
                <li>Falls das Spiel endet ohne, dass eine Gruppe den Zielort erreicht hat, gewinnt die Gruppe bei der das Ziel der Rennergruppe als nächstes war.</li>
            </ul>
        </div>
        <h3 class="collapsible">Spielverlauf:</h3>
        <div class="content">
            <ul>
                <li>Start Sarnen. Eine Gruppe beginnt, diese hat 30min GracePeriod um zu flüchten.</li>
                <li>Jedes Team bekommt zum Start 2000p.</li>
                <li>Nach 30 min dürfen die Hunter diese jagen.</li>
                <li>Wenn die Runners gefangen werden, wechselt die Gruppe gemäß Rotation.</li>
                <li>Nun hat die neue Runnergruppe wieder eine 30min GracePeriod.</li>
            </ul>
        </div>
        <h3 class="collapsible">Während des Spiels:</h3>
        <div class="content">
            <ul>
                <li>Es dürfen keine Autostops gemacht werden.</li>
                <li>Es müssen immer die Standorte eingeschaltet sein.</li>
                <li>Jede Challenge die gezogen wird, muss entweder ausgeführt oder verworfen werden.</li>
                <li>Die flüchtende Gruppe darf sich nicht aufteilen um nicht gefangen zu werden.</li>
                <!-- Add more rules as needed -->
            </ul>
        </div>
    </div>
`;;
}

function challengesView() {
    getCurrentChallenge();  // Fetch and display the current challenge
    return '<h1>Challenges</h1><div>Loading current challenge...</div>';
}

function transportationsView() {
    // Placeholder content or fetch transportation options and display them
    return '<h1>Transportations</h1><p>Transportation content will be displayed here.</p>';
}

function itemsView() {
    // Placeholder content or fetch items and display them
    return '<h1>Items</h1><p>Item content will be displayed here.</p>';
}

function profileView() {
    // Placeholder content or fetch and display user profile
    const token = localStorage.getItem('token');

    if (!token) {
        document.getElementById('mainContent').innerHTML = `<button onclick="showLoginForm()">Login to view profile</button>`;
        return '<h1>Profile</h1><p>You must be logged in to view your profile.</p>';
    }

    fetch('https://localhost:7212/api/Users/Profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch profile information');
        }
        return response.json();
    })
    .then(data => {
        const profileContent = `
            <div class="profile-card">
                <h2 class="profile-name">Name: ${data.username}</h2>
                <p class="profile-balance">Balance: ${data.gottstattCoins}</p>
                <p class="profile-multiplier">Multiplier: ${data.hasMultiplier ? 'Yes' : 'No'}</p>
                <button id="logoutButton" class="logout-btn">Logout</button>
            </div>
        `;

        document.getElementById('mainContent').innerHTML = profileContent;

        // Adding event listener for logout button
        document.getElementById('logoutButton').addEventListener('click', logoutUser);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mainContent').innerHTML = `<div>Error loading profile: ${error.message}</div>`;
    });

    return '<h1>Profile</h1><div>Loading profile information...</div>';
}

function errorView() {
    return '<h1>404</h1><p>Page not found.</p>';
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', () => router());



function getCurrentChallenge() {
    const token = localStorage.getItem('token');

    if (!token) {
        document.getElementById('mainContent').innerHTML = `<button onclick="showLoginForm()">Login to get challenges</button>`;
        return;
    }

    fetch('https://localhost:7212/api/Challenges/CurrentChallenge', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 404) {
            // No active challenge exists, show the "Get Challenge" button
            document.getElementById('mainContent').innerHTML = `<button onclick="getNewChallenge()">Get Challenge</button>`;
            return;
        } else if (!response.ok) {
            // Other type of error
            throw new Error('Failed to fetch the current challenge');
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            document.getElementById('mainContent').innerHTML = `
                <div class="challenge-card">
                    <h2 class="challenge-title">${data.title}</h2>
                    <p class="challenge-description">${data.description}</p>
                    <div class="challenge-reward">Reward: ${data.reward}</div>
                    <button id="finishChallenge" class="challenge-btn">Challenge Finished</button>
                    <button id="vetoChallenge" class="challenge-btn">Veto Challenge</button>
                </div>
            `;

            // Add event listeners for the buttons
            document.getElementById('finishChallenge').addEventListener('click', finishChallenge);
            document.getElementById('vetoChallenge').addEventListener('click', vetoChallenge);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mainContent').innerHTML = `<div>Error loading challenge: ${error.message}</div>`;
    });
}



function getNewChallenge() {
    // Assume the token is available and the user is logged in
    const token = localStorage.getItem('token');
    
    fetch('https://localhost:7212/api/Challenges/AssignChallenge', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to get a new challenge');
        }
    })
    .then(data => {
        document.getElementById('mainContent').innerHTML = `<div>New Challenge: ${data.description}</div>`;
        getCurrentChallenge();
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mainContent').innerHTML = `<div>Error getting new challenge: ${error.message}</div>`;
    });
}

function finishChallenge() {
    const token = localStorage.getItem('token');
    // Replace '/finish' with the actual endpoint for finishing a challenge
    fetch('https://localhost:7212/api/Challenges/ChallengeSuccess', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        // No body required as per your specification
    })
    .then(response => {
        if (response.ok) {
            // Handle successful finish action
            console.log('Challenge finished successfully.');
            window.location.href = '/';
            // Perhaps reload challenges or update the UI accordingly
        } else {
            throw new Error('Failed to finish the challenge');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors, such as by displaying a message to the user
    });
}

function vetoChallenge() {
    const token = localStorage.getItem('token');
    // Replace '/veto' with the actual endpoint for vetoing a challenge
    fetch('https://localhost:7212/api/Challenges/VetoChallenge', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
        // No body required as per your specification
    })
    .then(response => {
        if (response.ok) {
            // Handle successful veto action
            console.log('Challenge vetoed successfully.');
            window.location.href = '/';
            // Perhaps reload challenges or update the UI accordingly
        } else {
            throw new Error('Failed to veto the challenge');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors, such as by displaying a message to the user
    });
}

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
    if (path === '/Profile') {
        document.getElementById('logoutButton').addEventListener('click', logoutUser);
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

    return '<h1>Profile</h1> <p>This is your profile page.</p><button id="logoutButton">Logout</button>';
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
    /*.then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch the current challenge');
        }
        return response.json();
    })*/
    .then(data => {
        if (data && data.activeChallenge) {
            document.getElementById('mainContent').innerHTML = `<div>Current Challenge: ${data.activeChallenge.description}</div>`;
        } else {
            document.getElementById('mainContent').innerHTML = `<button onclick="getNewChallenge()">Get Challenge</button>`;
        }
    })
    .catch(error => {
        if (error.message === "No active challenge found for the user.") {
            document.getElementById('mainContent').innerHTML = `<button onclick="getNewChallenge()">Get Challenge</button>`;
        } else {
            console.error('Error:', error);
            document.getElementById('mainContent').innerHTML = `<div>Error loading challenge: ${error.message}</div>`;
        }
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
        // Assuming the response includes the new challenge data
        document.getElementById('mainContent').innerHTML = `<div>New Challenge: ${data.description}</div>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mainContent').innerHTML = `<div>Error getting new challenge: ${error.message}</div>`;
    });
}
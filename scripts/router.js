var ipForAPI = "195.202.218.245";

function navigateTo(event, path) {
    history.pushState(null, null, path);
    router();
    event.preventDefault();
}

function router() {
    const basePath = '/tag-across-switzerland-website';
    const path = window.location.pathname.replace(basePath, '') || '/';

    const routes = {
        '/': homeView,
        '/Challenges': challengesView,
        '/Transportations': transportationsView,
        '/Items': itemsView,
        '/Profile': profileView,
    };

    const viewFunction = routes[path] || errorView;
    mainContent.innerHTML = viewFunction();
    
    if (path === '/Profile' && isLoggedIn()) {
        profileView();
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
    const token = localStorage.getItem('token');

    if (!token) {
        document.getElementById('mainContent').innerHTML = `<button onclick="showLoginForm()">Login to view transportations</button>`;
        return '<h1>Transportations</h1><p>You must be logged in to view transportation methods.</p>';
    }

    fetch(`https://${ipForAPI}:7212/api/TransportationsContoller/GetAllTransportations`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch transportation methods');
        }
        return response.json();
    })
    .then(data => {
        let tableRows = data.map(transport => `<tr><td>${transport.typeName}</td><td>${transport.feePerMinute}</td></tr>`).join('');

        document.getElementById('mainContent').innerHTML = `
            <h1>Transportations</h1>
            <table id="transportationTable">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Price/Minute</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
            <h2>Select a Transportation Method and Specify Duration</h2>
            <form id="transportationForm">
                <select id="transportationDropdown" name="transportationTitle">
                    ${data.map(transport => `<option value="${transport.typeName}">${transport.typeName}</option>`).join('')}
                </select>
                <input type="number" id="timeInMinutes" name="timeInMinutes" placeholder="Time in minutes" min="1" required />
                <button type="submit" id="submitTransportation">Buy</button>
            </form>
        `;

        // Event listener for the form submission
        document.getElementById('transportationForm').addEventListener('submit', handleTransportationFormSubmit);
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mainContent').innerHTML = `<div>Error loading transportations: ${error.message}</div>`;
    });

    return '<h1>Transportations</h1><div>Loading transportation methods...</div>';
}

function itemsView() {
    const token = localStorage.getItem('token');

    if (!token) {
        document.getElementById('mainContent').innerHTML = `<button onclick="showLoginForm()">Login to view items</button>`;
        return '<h1>Items</h1><p>You must be logged in to view items.</p>';
    }

    fetch(`https://${ipForAPI}:7212/api/Items/GetAllItems`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        return response.json();
    })
    .then(data => {
        let tableRows = data.map(item => `<tr><td>${item.itemName}</td><td>${item.description}</td><td>${item.itemPrice}</td></tr>`).join('');
        let dropdownOptions = data.map(item => `<option value="${item.itemName}">${item.itemName}</option>`).join('');


        document.getElementById('mainContent').innerHTML = `
            <h1>Items</h1>
            <table id="itemsTable">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
            <div>
                <label for="itemSelection">Select an Item:</label>
                <select id="itemSelection">
                    ${dropdownOptions}
                </select>
            </div>
            <div>
                <button id="buyItem" class="buy-btn" onclick="buyItem()">Buy</button>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('mainContent').innerHTML = `<div>Error loading items: ${error.message}</div>`;
    });

    return '<h1>Items</h1><div>Loading items...</div>';
}

function profileView() {
    // Placeholder content or fetch and display user profile
    const token = localStorage.getItem('token');

    if (!token) {
        document.getElementById('mainContent').innerHTML = `<button onclick="showLoginForm()">Login to view profile</button>`;
        return '<h1>Profile</h1><p>You must be logged in to view your profile.</p>';
    }

    fetch(`https://${ipForAPI}:7212/api/Users/Profile`, {
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

    fetch(`https://${ipForAPI}:7212/api/Challenges/CurrentChallenge`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 404) {
            // No active challenge exists, show the "Get Challenge" button
            document.getElementById('mainContent').innerHTML = `<button id="getChallengeButton" onclick="getNewChallenge()">Get Challenge</button>`;
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
    
    fetch(`https://${ipForAPI}:7212/api/Challenges/AssignChallenge`, {
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
    fetch(`https://${ipForAPI}:7212/api/Challenges/ChallengeSuccess`, {
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
    fetch(`https://${ipForAPI}:7212/api/Challenges/VetoChallenge`, {
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

function handleTransportationFormSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const transportationTitle = document.getElementById('transportationDropdown').value;
    const timeInMinutes = document.getElementById('timeInMinutes').value;

    fetch(`https://${ipForAPI}:7212/api/TransportationsContoller/BuyTransportation`, { 
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            transportationTitle: transportationTitle,
            timeInMinutes: parseInt(timeInMinutes, 10)
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to post transportation usage');
        }
        return response.json();
    })
    .then(data => {
        console.log('Transportation usage logged successfully');
        alert(`${data.message}`);
        window.location.href = '/';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting data.');
        // Handle error, e.g., show an error message
    });
}
function buyItem() {
    const itemName = document.getElementById('itemSelection').value;
    const token = localStorage.getItem('token');

    fetch(`https:/${ipForAPI}:7212/api/Items/BuyItem`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemName: itemName })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to buy item');
        }
        alert(`Item bought successfully!`);
        window.location.href = '/';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error buying item: ' + error.message);
    });
}
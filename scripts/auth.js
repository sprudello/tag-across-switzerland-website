function isLoggedIn() {
    return !!localStorage.getItem('token'); // Simple check for a token
}

function displayHeaderContent() {
    const headerContent = document.getElementById('headerContent');
    if (isLoggedIn()) {
        fetchUserData(); // Fetch and display user-specific data
    } else {
        headerContent.innerHTML = '<button id="loginFormButton" onclick="showLoginForm()">Login</button>';
    }
}

function fetchUserData() {
    const token = localStorage.getItem('token');
    fetch('https://10.1.38.115:7212/api/Users/Profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('headerContent').innerHTML = `<p>Balance: ${data.gottstattCoins}, PenaltyEndTime: ${data.penaltyEndTime}</p>`;
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}

function showLoginForm() {
    const existingPopup = document.getElementById('loginPopup');
    if (existingPopup) {
        existingPopup.remove();  // Remove the existing popup if it's already there
    }

    const formHtml = `
        <div id="loginPopup" class="popup">
            <div class="popup-content">
                <span class="close" onclick="closeLoginForm()">&times;</span>
                <h2>Login</h2>
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <div class="popup-buttons">
                    <button onclick="loginUser()">Login</button>
                    <button onclick="registerUser()">Register</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', formHtml);
}

function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://10.1.38.115:7212/api/Users/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName: username, Password: password }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        localStorage.setItem('token', data.token); // Save the token
        displayHeaderContent(); // Update the header content
        closeLoginForm(); // Close the login form
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed: ' + error.message);
    });
}

function closeLoginForm() {
    const loginPopup = document.getElementById('loginPopup');
    if (loginPopup) {
        loginPopup.remove();
    }
}

function logoutUser() {
    localStorage.removeItem('token');
    displayHeaderContent(); // Refresh the header to show the login button
    navigateTo(event, '/'); // Redirect to the home page after logout
}

function registerUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://10.1.38.115:7212/api/Users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserName: username, Password: password }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Registration failed');
        }
    })
    .then(data => {
        alert('Registration successful. Please log in.');
        closeLoginForm(); // Optionally, close the form or prompt to log in
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed: ' + error.message);
    });
}
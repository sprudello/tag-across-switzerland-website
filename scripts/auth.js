function isLoggedIn() {
    return !!localStorage.getItem('token'); // Simple check for a token
}

function displayHeaderContent() {
    const headerContent = document.getElementById('headerContent');
    if (isLoggedIn()) {
        fetchUserData(); // Fetch and display user-specific data
    } else {
        headerContent.innerHTML = '<button onclick="showLoginForm()">Login</button>';
    }
}

function fetchUserData() {
    const token = localStorage.getItem('token');
    fetch('https://localhost:7212/api/Users/Balance', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('headerContent').innerHTML = `<p>Welcome, ${data.username}</p>`;
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });
}

function showLoginForm() {
    // Show login form logic here
}
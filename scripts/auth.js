document.getElementById('showLoginForm').addEventListener('click', function() {
    const formContainer = document.getElementById('formContainer');
    
    // Toggle the form visibility
    if (formContainer.innerHTML.trim()) {
        formContainer.innerHTML = '';
        return;
    }

    formContainer.innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
            Username: <input type="text" id="loginUsername"><br>
            Password: <input type="password" id="loginPassword"><br>
            <button type="submit">Login</button>
        </form>
        <div id="loginMessage" style="color: red;"></div>
    `;

    // Add the event listener for the newly added form
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        fetch('https://localhost:7212/api/Users/login', {
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
                // Handle non-200 responses
                throw new Error('Login unsuccessful');
            }
        })
        .then(data => {
            console.log('Login Successful:', data.message);
            localStorage.setItem('token', data.token);
            document.getElementById('loginMessage').textContent = 'Login successful!';
            document.getElementById('loginMessage').style.color = 'green';
            
            // Optionally, clear the form or hide it upon successful login
            formContainer.innerHTML = '';
        })
        .catch((error) => {
            console.error('Error:', error);
            document.getElementById('loginMessage').textContent = 'Login failed: Wrong username or password.';
        });
    });
});
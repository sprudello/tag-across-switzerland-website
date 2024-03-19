document.getElementById('getChallenge').addEventListener('click', function() {
    const token = localStorage.getItem('token');

    if (!token) {
        console.log("No token found. Please login.");
        return;
    }

    fetch('https://localhost:7212/api/Challenges/GetRandom', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('challengeDetails').textContent = JSON.stringify(data);
    })
    .catch(error => console.error('Error fetching data:', error));
});
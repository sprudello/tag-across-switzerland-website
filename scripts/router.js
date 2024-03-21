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
}

function homeView() {
    return '<h1>Home</h1><p>Welcome to the Home page of TagAcrossCH!</p>';
}

function challengesView() {
    // Placeholder content or fetch challenges and display them
    return '<h1>Challenges</h1><p>Challenge content will be displayed here.</p>';
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
    return '<h1>Profile</h1><p>Profile content will be displayed here.</p>';
}

function errorView() {
    return '<h1>404</h1><p>Page not found.</p>';
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', () => router());
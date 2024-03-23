document.addEventListener('DOMContentLoaded', () => {
    // Initialization code or any global setup
    displayHeaderContent();
    console.log("Application initialized");
    // You can also invoke router() here if needed, but it's already being called in router.js
});

function makeCollapsible() {
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach((collapsible) => {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}
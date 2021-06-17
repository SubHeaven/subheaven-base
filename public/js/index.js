window.addEventListener("load", function(event) {
    document.getElementById('js-toggle-trigger').addEventListener('click', function() {
        var menu = document.querySelector('.js-toggle') // Using a class instead, see note below.
        menu.classList.toggle('is-closed');
    });
});
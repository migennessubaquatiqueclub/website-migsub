document.addEventListener("DOMContentLoaded", function () {
    fetch("top-page-button.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Impossible de charger le bouton de retour en haut (${response.status})`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById("top-page-button");
            if (!container) {
                throw new Error("Conteneur du bouton de retour en haut introuvable");
            }
            container.innerHTML = data;

            const button = container.querySelector(".top-page-button-control");
            if (!button) {
                throw new Error("Bouton de retour en haut introuvable dans le composant");
            }

            function updateButtonVisibility() {
                if (window.scrollY > 200) {
                    button.classList.add("active");
                } else {
                    button.classList.remove("active");
                }
            }

            window.addEventListener("scroll", updateButtonVisibility);
            updateButtonVisibility();
        })
        .catch(error => console.error(error));
});
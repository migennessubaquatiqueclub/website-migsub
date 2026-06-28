const form = document.querySelector("form");
const STORAGE_KEY = form.getAttribute("name");

if (form) {
    // Remplir automatiquement les champs déjà enregistrés
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    Object.entries(savedData).forEach(([key, value]) => {
        const field = form.elements[key];
        if (field) {
            field.value = value;
        }
    });

    // Gestion des boutons "Suivant"
    document.querySelectorAll("[data-next-step]").forEach(button => {
        button.addEventListener("click", e => {
            e.preventDefault();
            if (!form.reportValidity()) {
                return; // bloque la navigation si invalide
            }
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
            const formData = new FormData(form);
            formData.forEach((value, key) => {
                data[key] = value;
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            window.location.href = button.href;
        });
    });

    // Dernière étape : avant l'envoi à Netlify
    form.addEventListener("submit", (e) => {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        Object.entries(data).forEach(([key, value]) => {
            if (form.elements[key]) return;
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });
        // ===== MODE TEST =====
        //e.preventDefault();
        //console.log("=== Données qui seraient envoyées à Netlify ===");
        //const finalFormData = new FormData(form);
        //console.table(Object.fromEntries(finalFormData.entries()));
        
        localStorage.removeItem(STORAGE_KEY);
    });
}
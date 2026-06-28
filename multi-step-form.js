document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (!form) return;

    const STORAGE_KEY = form.getAttribute("name");

    // =========================
    // CHARGEMENT DES DONNÉES
    // =========================
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

    Object.entries(savedData).forEach(([key, value]) => {
        const fields = form.elements[key];

        if (!fields) return;

        if (fields instanceof RadioNodeList) {
            fields.forEach(field => {
                if (field.type === "checkbox") {
                    if (Array.isArray(value)) {
                        field.checked = value.includes(field.value);
                    } else {
                        field.checked = field.value === value;
                    }
                } else if (field.type === "radio") {
                    field.checked = field.value === value;
                } else {
                    field.value = value;
                }
            });
        } else {
            fields.value = value;
        }
    });

    // =========================
    // SAUVEGARDE
    // =========================
    function saveFormData() {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        const formData = new FormData(form);

        formData.forEach((value, key) => {
            if (data[key] === undefined) {
                data[key] = value;
                return;
            }

            // gestion des checkbox multiples
            if (Array.isArray(data[key])) {
                if (!data[key].includes(value)) {
                    data[key].push(value);
                }
            } else {
                data[key] = [data[key], value];
            }
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // =========================
    // NAVIGATION ETAPE SUIVANTE
    // =========================
    document.querySelectorAll("[data-next-step]").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            if (!form.reportValidity()) return;

            saveFormData();
            window.location.href = button.href;
        });
    });

    // =========================
    // CHECKBOX GROUP ACTIVITES
    // =========================
    const checkboxes = document.querySelectorAll(
        'input[name="activities"], input[name="activites_et_formations"], input[name="activites et formations[]"]'
    );

    function validateCheckboxes() {
        if (!checkboxes.length) return;

        const isChecked = [...checkboxes].some(cb => cb.checked);

        checkboxes.forEach(cb => {
            cb.setCustomValidity(
                isChecked ? "" : "Sélectionnez au moins une activité"
            );
        });
    }

    checkboxes.forEach(cb => {
        cb.addEventListener("change", validateCheckboxes);
    });

    validateCheckboxes();

    // =========================
    // AUTORISATION PARENTALE
    // =========================
    const parentAuth = form.querySelector('input[name="autorisation_parentale"]');
    const childField = form.querySelector(
        'input[name="personne autorisée à venir récupérer l\'enfant"]'
    );

    function updateParentRequirement() {
        if (!parentAuth || !childField) return;

        childField.required = parentAuth.checked;
    }

    if (parentAuth && childField) {
        parentAuth.addEventListener("change", updateParentRequirement);
        updateParentRequirement();
    }

    // =========================
    // SUBMIT FINAL (NETLIFY)
    // =========================
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

        // créer un form virtuel propre
        const fakeForm = document.createElement("form");
        fakeForm.method = "POST";

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = v;
                    fakeForm.appendChild(input);
                });
            } else {
                const input = document.createElement("input");
                input.type = "hidden";
                input.name = key;
                input.value = value;
                fakeForm.appendChild(input);
            }
        });

        document.body.appendChild(fakeForm);

        localStorage.removeItem(STORAGE_KEY);

        fakeForm.submit();
    });
});
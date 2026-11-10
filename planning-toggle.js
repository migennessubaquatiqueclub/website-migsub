const planningToggle = document.querySelector(".planning-toggle");
const planningTitle = document.querySelector("#planning-title");
const clubPlanning = document.querySelector("#club-planning");
const clubAgenda = document.querySelector("#club-agenda");
const desktopPlanning = window.matchMedia("(min-width: 900px)");

function updatePlanningView() {
    const agendaSelected = clubAgenda.hidden === false;
    const nextView = agendaSelected ? "planning" : "agenda";
    const nextLabel = nextView === "agenda" ? "Afficher l'agenda du club" : "Afficher le planning du club";

    planningTitle.textContent = desktopPlanning.matches || !agendaSelected
        ? "Planning du club"
        : "Agenda du club";
    planningToggle.setAttribute("aria-label", nextLabel);
    planningToggle.title = nextLabel;
}

planningToggle.addEventListener("click", () => {
    const showAgenda = clubAgenda.hidden;
    clubAgenda.hidden = !showAgenda;
    clubPlanning.hidden = showAgenda;
    updatePlanningView();
});

desktopPlanning.addEventListener("change", updatePlanningView);

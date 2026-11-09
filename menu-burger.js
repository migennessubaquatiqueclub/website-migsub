document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const burgerBtn = event.target.closest('#burger-btn');
    if (!burgerBtn) return;

    const navLinks = document.getElementById('nav-links');
    if (!navLinks) return;

    const isOpen = navLinks.classList.toggle('active');
    document.getElementById('burger-btn-open')?.classList.toggle('active', isOpen);
    document.getElementById('burger-btn-close')?.classList.toggle('active', !isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    burgerBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});
async function loadHTML(url, targetId) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur: ${response.status}`);
    const html = await response.text();
    document.getElementById(targetId).innerHTML = html;
}

loadHTML('./header.html', 'header');
loadHTML('./footer.html', 'footer');
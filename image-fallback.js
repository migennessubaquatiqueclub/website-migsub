function restoreOriginalImage(image) {
    const picture = image.parentElement;
    if (!(picture instanceof HTMLPictureElement) || !image.currentSrc) return;

    const failedUrl = new URL(image.currentSrc, document.baseURI);
    if (failedUrl.origin !== window.location.origin || failedUrl.pathname !== "/.netlify/images") return;

    picture.querySelectorAll("source").forEach(source => source.remove());
    image.removeAttribute("srcset");
    image.removeAttribute("sizes");
    image.src = image.getAttribute("src");
}

document.addEventListener("error", event => {
    if (event.target instanceof HTMLImageElement) restoreOriginalImage(event.target);
}, true);

document.querySelectorAll("picture > img").forEach(image => {
    if (image.complete && image.naturalWidth === 0) restoreOriginalImage(image);
});

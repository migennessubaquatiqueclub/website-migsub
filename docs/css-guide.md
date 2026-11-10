# Guide CSS du site Migennes Subaquatique

## Architecture

- `site.css` contient les variables du thème, les règles de base, les styles partagés et les indicateurs de focus.
- `header.css`, `footer.css` et `top-page-button.css` définissent les composants partagés.
- `index.css`, `adhesion.css`, `adhesion-form.css`, `administratif.css`, `bapteme.css` et `boutique.css` contiennent les styles spécifiques aux pages.

Les pages chargent les styles de base et composants communs avant leur feuille dédiée. Les composants partagés utilisent les variables de `site.css`; évitez de redéfinir la palette dans une feuille de page.

## Mise en page responsive

Les styles mobiles constituent la base. Les media queries ajoutent progressivement de l'espace et des colonnes lorsque le contenu le permet :

- jusqu'à 600 px : dispositions mobiles;
- dès 601 px : conteneurs et espacements adaptés aux tablettes et écrans plus larges;
- dès 701 px : grille de profils du bureau à largeur de carte confortable;
- dès 900 px : navigation horizontale et organisation en colonnes de la page d'accueil;
- dès 1200 px : conteneur maximal et espacement de grand écran.

Les composants de cartes s'appuient également sur Grid intrinsèque, `minmax()` et `clamp()`. Un point de rupture propre à un composant est pertinent si sa largeur minimale diffère de celle des autres éléments.

## Accessibilité

- Chaque page propose un lien d'évitement vers `#main-content`.
- Le menu est un élément `nav` doté d'un nom accessible; le bouton burger conserve son état `aria-expanded`.
- Les liens, boutons et champs ont un focus visible, avec un contour clair et un halo bleu pour rester perceptible sur fonds clairs comme foncés.
- Les icônes décoratives ont un texte alternatif vide; les portraits informatifs décrivent la personne et sa fonction.
- `prefers-reduced-motion` réduit les transitions et désactive le défilement doux.
- Vérifiez les contrastes, la visibilité du focus, les cibles tactiles et l'ordre clavier lors de toute évolution.

## Comportements JavaScript existants

- `import-header-footer.js` charge l'en-tête et le pied de page.
- `menu-burger.js` bascule le menu et actualise ses attributs ARIA.
- `top-page-button.js` affiche le lien de retour en haut au défilement.
- `image-fallback.js` restaure les sources d'images si le format optimisé échoue.

Le CSS adapte leur présentation sans remplacer ces interactions.

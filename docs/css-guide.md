# Guide CSS du site Migennes Subaquatique

Ce document explique comment le design du site est structuré et comment les styles interagissent entre eux.

## 1. Architecture générale

Le site utilise un système CSS classique en HTML natif :

- `site.css` : fondations globales et variables de thème.
- `header.css` : navigation, menu burger et logo.
- `footer.css` : bloc de contact et affiches.
- `index.css` : mise en page de la page d'accueil.
- `adhesion.css`, `bapteme.css`, `administratif.css`, `boutique.css`, `adhesion-form.css` : styles propres aux pages concernées.
- `top-page-button.css` : bouton de retour en haut de page.

Chaque page charge ses feuilles dans l'ordre suivant :

1. `site.css` (base globale)
2. `header.css`
3. le CSS spécifique à la page
4. `top-page-button.css`
5. `footer.css`

L'ordre est important : les règles qui viennent plus tard dans le chargement ont priorité si elles ciblent le même sélecteur, sauf si une règle plus spécifique ou plus récente est appliquée par le navigateur.

## 2. Variables de thème

La palette est définie dans `:root` dans plusieurs fichiers, par exemple :

```css
:root {
  --color-ocean-950: #082f49;
  --color-ocean-800: #075985;
  --color-ocean-700: #0369a1;
  --color-aqua-500: #06b6d4;
  --color-sky-200: #bae6fd;
  --color-sky-100: #e0f2fe;
  --color-sky-50: #f0f9ff;
  --color-text: #18334a;
  --color-white: #ffffff;
}
```

Ces variables centralisent la palette du site. Cela permet de modifier rapidement un bleu, un texte ou un fond sans devoir corriger tous les sélecteurs manuellement.

## 3. Base globale (`site.css`)

`site.css` applique les règles de fondation :

- `box-sizing: border-box` pour éviter les calculs de largeur imprévisibles.
- `scroll-behavior: smooth` pour les ancrages de page.
- `body` en flex column, centré horizontalement, avec une hauteur minimale de 100vh.
- `img` avec largeur maximale de 100% pour éviter les débordements.
- classes communes comme `.site-main`, `.page-heading`, `.content-panel`.

La plupart des pages partagent donc le même cadre visuel et la même hiérarchie de blocs.

## 4. La navigation (`header.css`)

Le menu est construit depuis un `header` et un `nav` contenant :

- le logo,
- le bouton burger,
- la liste de liens.

Le schéma est le suivant :

- `.header` est sticky en haut de page avec fond bleu marine.
- `.burger-btn` affiche ou masque les deux icônes du menu.
- `.nav-links` est masqué par défaut.
- `.nav-links.active` passe en mode visible en colonne pleine page.

Le JavaScript dans `menu-burger.js` bascule la classe `active` et met à jour `aria-expanded` et `aria-label` pour conserver une bonne accessibilité.

## 5. Les pages spécifiques

### Page d'accueil (`index.css`)

Cette feuille définit :

- la section hero avec le titre principal,
- les cartes d'actualités,
- la grille des moniteurs,
- la zone du planning avec iframe.

Les éléments sont disposés en colonnes et les espacements sont régis par `gap`, `padding` et `border-radius` pour rester cohérents avec le thème global.

### Adhésion (`adhesion.css`)

Cette feuille structure la page d'inscription avec :

- une bannière d'accueil,
- des cartes d'options d'adhésion,
- un bloc photo d'illustration,
- une liste de documents téléchargeables.

La grille `membership-options` utilise `grid-template-columns: repeat(2, ...)` puis passe en une seule colonne sur mobile.

### Baptême, administratif et boutique

- `bapteme.css` : formulaire simple, compact, avec champs larges et bouton d'envoi.
- `administratif.css` : grille de profils du bureau avec photos et fonctions.
- `boutique.css` : cartes produits, prix et bouton de commande.

Chaque fichier garde un style répondant à la structure HTML de la page, sans émietter le design général.

## 6. Responsive design

Le site repose principalement sur :

- `flex` pour les blocs simples,
- `grid` pour les grilles de cartes,
- `@media (max-width: 600px)` ou `@media (max-width: 650px)` pour ajuster les éléments sur mobile.

Exemple :

```css
@media (max-width: 600px) {
  .affiches-list {
    width: min(90%, 420px);
    flex-direction: column;
    align-items: center;
  }
}
```

Ces règles réduisent les largeurs, réorganisent les éléments et empêchent les débordements sur petit écran.

## 7. Focus, états et accessibilité

Le projet inclut des états visuels pour l'accessibilité :

- `a:focus-visible` et `button:focus-visible` appliquent un contour visible.
- les liens au survol changent de couleur.
- le bouton burger met à jour `aria-expanded` pour indiquer son état ouvert/fermé.

Ces détails sont importants pour les utilisateurs clavier et les lecteurs d'écran.

## 8. Interactions JavaScript et classes CSS

Le JavaScript ne repose pas sur des frameworks. Il ajoute ou enlève des classes CSS pour des états dynamiques :

- `menu-burger.js` active/désactive le menu mobile.
- `top-page-button.js` affiche le bouton de retour en haut après 200px de défilement.
- `image-fallback.js` restaure les images si leur version `avif` ou WebP échoue.

Le principe est simple : le DOM est modifié, puis les classes CSS déclenchent les effets visuels.

## 9. Bonnes pratiques observées

- Palette cohérente et réutilisable.
- Utilisation de variables CSS pour la couleur.
- Structure en plusieurs fichiers claire.
- Gestion de la navigation mobile solide.
- Bon usage de `aria` pour le menu.
- Conformité avec le thème visuel existant.

## 10. Points à surveiller

Même si le site est bien organisé, il convient de rester vigilant sur :

- les chemins d'images cassés,
- les liens internes pointant vers des pages non existantes,
- les doublons de styles entre fichiers,
- la maintenance du CSS au fil des nouvelles pages.

Le plus important est de garder une logique de cascade stable : global > structure > section > composant.

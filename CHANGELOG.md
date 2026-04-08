# Changelog

## [En cours] — 2026-04-08

### Ajouté
- **Niveau de l'atelier** : nouveau champ dans le panneau de configuration — Niveau 1 (Basique), Niveau 2 (Intermédiaire), Niveau 3 (Expérimenté). Affiché dans l'en-tête de session et inclus dans le JSON exporté (`session.niveau`).

### Modifié
- Bouton **💾 JSON** renommé en **💾 Exporter**
- L'export ouvre automatiquement le SharePoint FAN dans un nouvel onglet après le téléchargement du fichier

---

## [En cours] — 2026-04-04

### Ajouté
- Bouton **🗑 Réinitialiser** dans le panneau de configuration : vide toutes les données et recharge la page avec les briques essentielles prêtes à remplir

### Modifié
- Refonte graphique UX/UI complète (charte FAN — palette, typographie Avenir, élévation, cartes)
- Numérotation des briques : le carré gris est supprimé, remplacé par un cercle coloré seul (`--primaire` bleu marine par défaut, `--lavande` en mode Atelier, `--ambre` quand la brique est marquée vue)
- L'emoji/icône de chaque fonctionnalité est supprimé de l'affichage et du panneau de configuration
- Les briques essentielles après réinitialisation sont : Sources (Recherche sur internet, Lecteur web, Analyser vos propres fichiers), Outils (Génération d'image, Traduire un document, Envoyer un mail, Générer un fichier audio, Canvas), Assistant (Créer votre propre assistant, Utiliser 'Outils communication' pour des documents à la charte)

---

## [1.0.0] — 2026-04-04

### Modifié
- La pop-up de rappel SharePoint s'affiche désormais après l'export **💾 JSON** (et non plus après **📧 Envoyer**)

### Modifié
- Le modèle de mail `.eml` intègre maintenant les numéros de step et le mode Atelier : badge rond numéroté sur chaque ligne, fond violet et badge `Atelier` pour les exercices participants

### Ajouté
- Numérotation des briques (1, 2, 3…) visible en présentation — se met à jour automatiquement lors du glisser-déposer
- Mode **Atelier** : case à cocher dans le formulaire d'ajout et dans l'édition de chaque fonctionnalité — les briques Atelier s'affichent avec un fond violet, une bordure violette et un badge `Atelier` devant le titre
- Ouverture des liens **Démo** dans une nouvelle fenêtre positionnée sur la moitié droite de l'écran

### Supprimé
- Bandeau "SNCF GPT — gpt.sncf.fr" dans l'en-tête

### Technique
- `index.html` découpé en trois fichiers séparés : `index.html`, `styles.css`, `app.js`

---

## [Initial] — 2026-04-01

### Ajouté
- Application monopage de sensibilisation à l'IA Générative SNCF
- Panneau de configuration : titre, collectif, famille de métiers, date, animateur, participants, email commanditaire, lien questionnaire satisfaction, logo entité
- Liste de 12 fonctionnalités GenAI par défaut, activables/désactivables individuellement
- Cas d'usage et lien démo GPT SNCF configurables par fonctionnalité
- Réordonnancement par glisser-déposer
- Marquage des fonctionnalités comme "vues" pendant la session
- Export de configuration en JSON (nommé automatiquement avec date + collectif)
- Import de configuration JSON avec fusion sécurisée
- Génération d'un mail récapitulatif `.eml` compatible Outlook avec tableau des fonctionnalités, lien GPT SNCF et questionnaire de satisfaction
- Support logo entité en pièce jointe inline dans le mail
- Panneau d'aide "Mode d'emploi" accessible via le bouton ℹ️
- Pop-up de rappel upload SharePoint après export JSON
- Responsive mobile et styles impression

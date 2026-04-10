# ☀️ SUNSHINE

> **S**ensibilisation **U**nifiée aux **N**ouvelles **S**olutions d'**H**umanisation de l'**I**ntelligence **N**umérique en **E**ntreprise

*Éclairez vos ateliers IA en un clin d'œil.*

---

## L'histoire du nom

En 2026, la Fabrique de l'Adoption Numérique animait des dizaines de sessions de sensibilisation à l'IA Générative chaque mois à travers tout le groupe SNCF. Le problème : chaque animateur repartait avec son propre PowerPoint, sa propre mise en forme, ses propres cas d'usage — et aucune cohérence d'une session à l'autre.

L'idée de SUNSHINE est née d'une frustration simple : *pourquoi passer 2 heures à préparer un support pour une session d'1 heure ?*

Le nom s'est imposé naturellement. Le soleil, c'est ce qui illumine, qui réchauffe, qui rend les choses visibles. C'est exactement ce que font ces sessions : elles ne forment pas, elles **éclairent**. Elles montrent aux agents SNCF que l'IA n'est pas un danger ou une abstraction — c'est un outil concret, accessible dès aujourd'hui, qui peut alléger leur quotidien.

SUNSHINE, c'est aussi un acronyme : **Sensibilisation Unifiée aux Nouvelles Solutions d'Humanisation de l'Intelligence Numérique en Entreprise**. Une façon de rappeler que la technologie ne vaut que si elle sert les humains qui la portent.

Un seul fichier HTML. Zéro installation. Une session prête en 5 minutes.

---

## Fonctionnalités

- **Configuration complète** de la session : collectif, date, animateur, famille de métiers, niveau (Basique / Intermédiaire / Expérimenté), logo entité
- **12 fonctionnalités GenAI** pré-configurées, activables/désactivables individuellement
- **Cas d'usage métier** personnalisables par fonctionnalité
- **Mode Atelier** : marquez une fonctionnalité comme exercice participant — la brique change de couleur et affiche un badge `Atelier`
- **Numérotation automatique** des briques selon l'ordre de la session
- **Glisser-déposer** pour réordonner le déroulé en temps réel
- **Liens Démo** s'ouvrant dans une fenêtre positionnée sur la moitié droite de l'écran
- **Suivi en live** : cochez les fonctionnalités au fur et à mesure qu'elles sont présentées
- **Export JSON** pour archiver et réutiliser la configuration
- **Import JSON** pour reprendre une session existante ou partager avec un collègue animateur
- **Génération de mail `.eml`** compatible Outlook avec tableau récap (colonnes à largeur fixe), lien GPT SNCF, bouton communauté Viva Engage et questionnaire de satisfaction mis en valeur
- **Responsive** mobile et styles impression

---

## Utilisation

### Avant la session
1. Ouvrir `index.html` dans un navigateur
2. Cliquer sur ✏️ pour configurer la session (collectif, date, cas d'usage, liens démo…)
3. Activer/désactiver les fonctionnalités pertinentes, cocher `Atelier` pour les exercices
4. Réordonner par glisser-déposer
5. Cliquer **✅ Appliquer**

### Pendant la session
- Projeter la page en plein écran
- Cliquer **Démo** pour ouvrir GPT SNCF dans une fenêtre à droite
- Cocher ✓ les fonctionnalités au fil de la présentation

### Après la session
- Cliquer **💾 Exporter** pour télécharger le JSON et ouvrir automatiquement le SharePoint FAN
- Cliquer **📧 Envoyer** pour générer le mail récap `.eml` à ouvrir dans Outlook

---

## Stack technique

Vanilla HTML / CSS / JS — aucune dépendance, aucun build, aucune installation.  
Données persistées en `localStorage`. Compatible avec tous les navigateurs modernes.

---

*Fabrique de l'Adoption Numérique · e.SNCF Solutions*

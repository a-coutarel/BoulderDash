Projet de développement web

• Objectif : recréer le jeu "Boulder Dash" qui a bercé l'enfance de M. Meunier

• Sujet complet : https://www.lamarmotte.info/wp-content/uploads/2022/03/Projet-Boulder-Dash.pdf

• Lancer le projet directement depuis GitHub : https://devnemoo.github.io/BoulderDash/


⚠ IMPORTANT ⚠

Le bouton permettant de relancer une partie n'est visible que si une sauvegarde existe.
Toute modification des maps (ajout, supression, modification de l'odre) entraine une perte de la sauvegarde...

Le message :
"⚠ Error with Permissions-Policy header: Unrecognized feature: 'interest-cohort'."
est dû à GitHub, il n'apparaît pas en local. Il est dû à GitHub Pages.

Le message :
"❌ Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
est dû au navigateur chrome (et d'autres) qui bloque la lecture de fichier audio tant que l'utilisateur n'a pas interagi avec la page (on a tout essayé mais on n'y peut rien). Opera par exemple ne semble pas avoir ce problème...

Si la musique ne se lance pas automatiquement dû à cette erreur, un clic sur le bouton Mute/Unmute permet alors de la lancer.

# 2S Extensions

Userscripts, CSS... repo for 2S

## 2S 1080p

CSS to adapt to 1080p height resolutions

**Mis à jour le 28/10 - Avertissement pour les textes cachés**

**Ergonomie :**
- **aperçu de tous les topics d'une page sans scroll**
 - l'index du forum fait 940px de haut, laissant la place au navigateur pour les différentes barres d'onglets, de favoris, barre du menu démarrer...
- header plus petit pour rentrer dans une résolution de 1080p de hauteur sans fullscreen
- diminution de beaucoup de marges
- suppression du nom du forum "Blabla général"
- Risibank plus pratique
 - taille minimale de l'aperçu (pour les petits stickers dont le bouton suppression recouvre toute la zone cliquable)
 - couleur au survol
- les tableaux dans les topics ont une forme de tableau visible
- avertissement pour les textes cachés

**Minor fixes :**
- modification de l'avatar dans le header : ses bordures rond-carré deviennent un rond sans bordure
- l'icône refresh à côté de "Sujet" (autorefresh actif) ne déplace plus les titres des sujets
- les boutons d'actualisation et de changement de page sont fixes même quand le bouton "retour première page" apparaît (utile quand on se balade entre les pages)
- les pseudos trop longs qui s'affichaient sur 2 lignes dans l'index sont ellipsés et ne débordent pas
- alignement icône suppression dans Favoris/Abonnements
- les listes de badge  dans le profil apparaissent en ligne (Chef)
- le footer est plus petit et "Nous contacter" n'est plus invisible

**Esthétique :**
- taille de la police de la barre de navigation "Accueil / Mon Espace / Forum / Aide" augmentée pour la rendre plus lisible
- la ligne pointillée en-dessous du nom+avatar+date d'un post n'apparaît plus une fois sur deux bleu claire
- avatars transparents et sans bordures (merci @Chef)
- icône "OP" remplacée par ✏️
- mosaïques d'images sans espace

## Messages

Add interface in /message/ to navigate between messages with IDs.

## Bacteria

Add interface in Bacteria topic to play Bacteria easily.

## Message Manager
Message Manager est un script utilitaire pour vous faciliter les tâches que 2S ne peut pas faire :
- ✔️ compteur de messages d'un membre
- ✔️ consulter tous vos messages
- ✔️ recherche de message par auteur, contenu
- ❌ suppression de masse de vos messages

Si les recherches sont lentes c'est à cause de l'API 2S qui limite le nombre de requêtes. Préférez les recherches fines sur au maximum quelques centaines de messages. Balayer 5000 messages équivaut à au moins 10min.
http://image.noelshack.com/fichiers/2018/36/1/1535962177-trds.png
https://www.youtube.com/watch?v=DLCPY_AAaWo

## Stream Viewer

Add interface to view Twitch stream inside 2S frame.

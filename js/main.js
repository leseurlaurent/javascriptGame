// on execute les fonction dans l'ordre afin de créer notre plateau.
//on créé le plateau
createTable();
// On grise les cases desactivées
disableSquaresAction();
//On place les joueurs
placePayers();
//on Place les armes
placeWeapons();
//On fait commencer le jeu avec le joueur "red"
var mainPlayer = 'red';
initializeMove();

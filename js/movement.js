// on créé un objet qui represente une case où le joueur peut se deplacer sur le plateau
function MovableSquare(i,j,d,o,tdref) {
	this.i = i; //coordonnée de ligne
    this.j  = j; //coordonnée de colonne
	this.direction = d;//direction
	this.order = o;//ordre
}

//Fonction qui permet d'initialiser chaques mouvements
function initializeMove() {

var movableSquares = [];

//On recupere la case du joueur
	var playerSquare;
		playerSquare = document.getElementsByClassName(mainPlayer + "-player")[0];
		
	var playerI = parseInt(playerSquare.id.charAt(0));
	var playerJ = parseInt(playerSquare.id.charAt(1));
	
//On instancie toutes les cases où il peeut aller (3 cases dans chaque direction)
	var idSquareAtRight1OfRed = new MovableSquare(playerI,(playerJ+1),'right',1);
	movableSquares.push(idSquareAtRight1OfRed);
	var idSquareAtRight2OfRed = new MovableSquare(playerI,(playerJ+2),'right',2);
	movableSquares.push(idSquareAtRight2OfRed);
	var idSquareAtRight3OfRed = new MovableSquare(playerI,(playerJ+3),'right',3);
	movableSquares.push(idSquareAtRight3OfRed);
	
	var idSquareAtLeft1OfRed = new MovableSquare(playerI,(playerJ-1),'left',1);
	var idSquareAtLeft2OfRed = new MovableSquare(playerI,(playerJ-2),'left',2);
	var idSquareAtLeft3OfRed = new MovableSquare(playerI,(playerJ-3),'left',3);
	movableSquares.push(idSquareAtLeft1OfRed);
	movableSquares.push(idSquareAtLeft2OfRed);
	movableSquares.push(idSquareAtLeft3OfRed);
	
	var idSquareAtUp1OfRed = new MovableSquare((playerI-1),playerJ,'up',1);
	var idSquareAtUp2OfRed = new MovableSquare((playerI-2),playerJ,'up',2);
	var idSquareAtUp3OfRed = new MovableSquare((playerI-3),playerJ,'up',3);
	movableSquares.push(idSquareAtUp1OfRed);
	movableSquares.push(idSquareAtUp2OfRed);
	movableSquares.push(idSquareAtUp3OfRed);
	
	var idSquareAtdown1OfRed = new MovableSquare((playerI+1),playerJ,'down',1);
	var idSquareAtdown2OfRed = new MovableSquare((playerI+2),playerJ,'down',2);
	var idSquareAtdown3OfRed = new MovableSquare((playerI+3),playerJ,'down',3);
	movableSquares.push(idSquareAtdown1OfRed);
	movableSquares.push(idSquareAtdown2OfRed);
	movableSquares.push(idSquareAtdown3OfRed);

//Check si la case est une case sésactivée ou l'autre joueur, dans ce cas le joueur ne pourra pas aller dessus, ni plus loin
	var lastOrder = 0;
	var lastDirection = '';

for (var d = 0; d < movableSquares.length; d++){
		if (!(movableSquares[d].i > 9 || movableSquares[d].i < 0)&&!(movableSquares[d].j > 9 || movableSquares[d].j < 0))
		{
		var td = document.getElementById('board').rows[movableSquares[d].i].cells[movableSquares[d].j];
		if(td)
		{
			if((td.className == 'disabled' || td.className.indexOf('player') > -1) || (movableSquares[d].direction == lastDirection && movableSquares[d].order == (lastOrder + 1)))
			{
				lastOrder = movableSquares[d].order;
				lastDirection = movableSquares[d].direction;
			}
			else{
			td.className += " " + 'movable';
			}
		}
		}
	}
	
	var classname = document.getElementsByClassName('movable');

//Fonction qui sera appeler quand le joueur cliquera sur une case pour bouger
    var myFunction = function() {

    	while( 0 < classname.length ) {
		classname[classname.length-1].removeEventListener('click', myFunction);
        classname[classname.length-1].className = classname[classname.length-1].className.replace('movable','');
    	}	

//si il se deplace sur une arme, laisse son actuelle sur place et prend la nouvelle
		if(this.className.indexOf('weapon') > -1)
		{
			if(sessionStorage.getItem("weapon" + mainPlayer) != "")
			{
				document.getElementsByClassName(mainPlayer +'-player')[0].className = sessionStorage.getItem("weapon" + mainPlayer);
			}
			else
			{
				document.getElementsByClassName(mainPlayer +'-player')[0].className = 'classic';
			}
			sessionStorage.setItem("weapon" + mainPlayer,this.className);
			this.className += " " + mainPlayer +'-player';

			//afficher arme dans UI
			PromptWeapon(mainPlayer,sessionStorage.getItem("weapon" + mainPlayer));
		}
		else
		{
			document.getElementsByClassName(mainPlayer +'-player')[0].className = 'classic';
			if(sessionStorage.getItem("weapon" + mainPlayer) != "")
				this.className =  sessionStorage.getItem("weapon" + mainPlayer) + " " + mainPlayer +'-player';
			else
				this.className = mainPlayer +'-player';
		}

// on recupere les 2 cases qui representent les joueurs
		var table = document.getElementById('board');
var tds = table.getElementsByTagName('td');
var matchingTds = [];

for (var i = 0, len = tds.length, td, tdName; i < len; ++i) {
    td = tds[i];
    tdName = td.className;
    if (tdName && tdName.indexOf("player") > -1) {
        matchingTds.push(td);
    }

}
//si il y a bien 2 joueurs, et qu'ils sont mittoyen, alors on appelle la fonction "fight"
 if(matchingTds.length == 2)
    {
    	var player0I = parseInt(matchingTds[0].id.charAt(0));
		var player0J = parseInt(matchingTds[0].id.charAt(1));

		var player1I = parseInt(matchingTds[1].id.charAt(0));
		var player1J = parseInt(matchingTds[1].id.charAt(1));

		if (((player1J == (player0J-1)) && player1I == player0I) || ((player1J == (player0J+1)) && player1I == player0I))
			fight(mainPlayer);

		if (((player1I == (player0I-1)) && player1J == player0J) || ((player1I == (player0I+1)) && player1J == player0J))
			fight(mainPlayer);
    }

	// on change de joueur avant de rappeler la methode d'initialisation du prochain mouvement	
		if (mainPlayer == 'red')
			mainPlayer = 'blue';
		else
			mainPlayer = 'red';

		initializeMove();
    };

//on asscocie la methode de click a chaque case où le joueur peux bouger.
    for(var i=0;i<classname.length;i++){
        classname[i].addEventListener('click', myFunction, false);
    }
}

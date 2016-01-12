// on defini les parametres de notre plateau
var lines = 10;
var col = 10;
var disabledSquareMin = 10;
var disabledSquareMax = 20;

// fonction qui retourne un nombre aleatoire dans un internal
function randomFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

// on créé un objet qui represente une case à désactiver sur le plateau
function Square(i,j, direction) {
	this.i = i; //coordonnée de ligne
    this.j  = j; //coordonnée de colonne
}

// fonction qui s'occupe de désactiver les cases
function disableSquaresAction() {
	// on defini le nombre de case désactivée il y aura sur notre plateau
	var nbgrey = randomFromInterval(disabledSquareMin,disabledSquareMax);

	// instanciation d'un tableau regroupant toutes nos cases à désactiver
	var disabledSquares = [];

	for (var i = 0; i < nbgrey; i++){
		var square = new Square((randomFromInterval(0,lines-1)),(randomFromInterval(0,col-1))); //on met -1 ici car les index commencent à 0
		disabledSquares.push(square); // on ajoute une case à désactiver dans le tableau correspondant
	}
	sessionStorage.setItem("disabledSquares",disabledSquares);
	
	// pour chaque element du tableau, on prend la TD correspondante et on lui applique le style 'désactivée'
	for (var d = 0; d < disabledSquares.length; d++){
		var td = document.getElementById('board').rows[disabledSquares[d].i].cells[disabledSquares[d].j];
		if(td)
		{
			td.className = "disabled";
		}
	}
}

//fonction qui place nos personnages (red & blue)
function placePayers() {
	var playerPlaced = false; // nous permet de savoir que les personnages sont bien placés
	do{
		var red = new Square((randomFromInterval(0,lines-1)),(randomFromInterval(0,col-1)));
		var blue = new Square((randomFromInterval(0,lines-1)),(randomFromInterval(0,col-1)));

		var tdRed = document.getElementById('board').rows[red.i].cells[red.j];
		var tdBlue = document.getElementById('board').rows[blue.i].cells[blue.j];
		
		// On defini les cases adjacentes au joueur rouge
		var idSquareAtRightOfRed = '' + red.i.toString() + (red.j+1).toString() +'';
		var idSquareAtLeftOfRed = '' + red.i.toString() + red.j-1 +'';
		var idSquareAtUpOfRed = '' + (red.i-1).toString() + red.j.toString() +'';
		var idSquareAtdownOfRed = '' + (red.i+1).toString() + red.j.toString() +'';
		
		// si la case n'est pas classic, ou si les joueurs se touchent on relancera le tirage.
		if (tdBlue.id != idSquareAtRightOfRed && tdBlue.id != idSquareAtLeftOfRed && tdBlue.id != idSquareAtUpOfRed && tdBlue.id != idSquareAtdownOfRed && tdBlue.id != tdRed.id)
		{
			if(tdRed.className == 'classic' && tdBlue.className == 'classic')
			{
				tdRed.className = 'red-player weapon';
				
				tdBlue.className = 'blue-player weapon';
				playerPlaced = true; // les deux cases choisies étaient bien 'classic' ont peut donc mettre ici nos persos.
			}
		}
	}while(!playerPlaced);


}

//fonction qui place nos armes 
function placeWeapons() {
	var weapons = []
	var weaponsPlaced = false; // nous permet de savoir que les personnages sont bien placés
	do{
		var w1 = new Square((randomFromInterval(0,lines-1)),(randomFromInterval(0,col-1)));
		weapons.push(w1);
		var w2 = new Square((randomFromInterval(0,lines-1)),(randomFromInterval(0,col-1)));
		weapons.push(w2);
		var w3 = new Square((randomFromInterval(0,lines-1)),(randomFromInterval(0,col-1)));
		weapons.push(w3);
		var w4 = new Square((randomFromInterval(0,lines-1)),(randomFromInterval(0,col-1)));
		weapons.push(w4);

		var tdW1 = document.getElementById('board').rows[w1.i].cells[w1.j];
		var tdW2 = document.getElementById('board').rows[w2.i].cells[w2.j];
		var tdW3 = document.getElementById('board').rows[w3.i].cells[w3.j];
		var tdW4 = document.getElementById('board').rows[w4.i].cells[w4.j];
		
		// si la case n'est pas classic, on relancera le tirage.
		if(tdW1.className == 'classic' && tdW2.className == 'classic' && tdW3.className == 'classic' && tdW4.className == 'classic')
		{
			tdW1.className = 'weapon1';
			tdW2.className = 'weapon2';
			tdW3.className = 'weapon3';
			tdW4.className = 'weapon4';
			weaponsPlaced = true; // les deux cases choisies étaient bien 'classic' ont peut donc mettre ici nos persos.
		}
	}while(!weaponsPlaced);

sessionStorage.setItem("weapons",weapons);
}

// fonction qui se charge de créer le squelette de notre plateau
function createTable() {

	var table = document.createElement('table');

	// construction des lignes
	for (var i = 0; i < lines; i++){
		var tr = document.createElement('tr');  
		
		//construction des colonnes
		for (var j = 0; j < col; j++){
			var td = document.createElement('td');
			td.className = 'classic';
			td.id = '' + i + j + '';
			tr.appendChild(td);
		}	
		table.appendChild(tr);
		table.cellPadding='0';
		table.cellSpacing='0';
		table.style.borderCollapse = 'collapse';
		table.id = 'board';
	}
	var game = document.getElementById('game');
	game.appendChild(table);
}
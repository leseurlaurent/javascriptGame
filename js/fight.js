//permet de savoir si un joueur a defendu ou pas
var callDefense = false;

//Methode qui gère l'attaque
function fight(attacker){
	//Determine quel joueur attaque et quel joueur défend
	var defender;
	var player = attacker;
	if(attacker == 'red')
		defender = 'blue';
	else
		defender='red';

//tant que l'un des joeuurs ne tombe pas sous les Zeros points de vie (ou les atteins pile)
	while((sessionStorage.getItem("lifered") > 0 && sessionStorage.getItem("lifeblue") > 0))
	{
		var damaged;
		if (player == attacker)
			damaged = defender;
		else
			damaged = attacker;


		var choice = prompt("A toi " + player + ": 1 pour ATTAQUER, 2 pour DEFENDRE le prochain coup");
		if (choice == 1) {
				damagedPlayer(damaged,getDamageWeapon(sessionStorage.getItem("weapon" + player).replace(/ /g,'')));
    	}
    	else if(choice == 2)
    	{
			callDefense = true;
    	}
    	//pour sortir du combat plus vite et debuger
    	else if(choice == 'quit')
    	{
			break;
    	}
    	else
    		alert('Mauvaise saisie, dommage, vous ne ferez aucune action ce tour ci.');

    	//on change de joueur attaquant avant la prochaine boucle
    	if(player == attacker)
    		player = defender;
    	else
    		player = attacker;
	};
	
//Message de victoire
	if(sessionStorage.getItem("lifered") <= 0)
		alert("Blue a gagné, Bravo !");
	else
		alert("Red a gagné, Bravo !");
//rechargement d'une partie
	window.location.reload();

}

//on enleve les dégats a la vie du joueur
function damagedPlayer(player,damage)
{
	var life = sessionStorage.getItem("life" + player);
	if(!callDefense)
	life -= damage;
else
	life -= (damage/2);
    callDefense = false;
	sessionStorage.setItem("life" + player,life);
	promptLife(player);
}
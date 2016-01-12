//affiche sur le UI l'arme actuelle du joueur
function PromptWeapon(player) {

	var weaponName = document.getElementById('weaponName-'+player+'-info');
	var weaponDamage = document.getElementById('weaponDamage-'+player+'-info');
	weaponName.innerHTML = 'Arme : ' + getCommonNameWeapon(sessionStorage.getItem("weapon" + player).replace(/ /g,''));
	weaponDamage.innerHTML = 'Dégats : ' + getDamageWeapon(sessionStorage.getItem("weapon" + player).replace(/ /g,''));

}

// met a jour la vie du joueur
function promptLife(player) {
	var life = document.getElementById('lifePoints-'+player+'-info');
	life.innerHTML = "Vie : " + sessionStorage.getItem("life" + player);
}

//PAr rapport a la key de l'arme, donne le nom commun
function getCommonNameWeapon(key){

	switch(key){
    case 'weapon1':
        return "Sabre Laser";
        break;
    case 'weapon2':
        return "Arc";
        break;
    case 'weapon3':
        return "Epée";
        break;
    case 'weapon4':
        return "Revolver";
        break;
    default :
    	return "Couteau";
   		break;
	}
}

//Donne le nombre de dégats d'une arme
function getDamageWeapon(key){

	switch(key){
    case 'weapon1':
        return "60";
        break;
    case 'weapon2':
        return "40";
        break;
    case 'weapon3':
        return "30";
        break;
    case 'weapon4':
        return "90";
        break;
    default :
    	return "10";
   		break;
	}
}
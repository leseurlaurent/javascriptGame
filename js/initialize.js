//On instancie notre UI pour la premiere fois, et on sauvegarde aussi les parametres de bases comme la vie et l'arme
// par défaut
	var weaponNameBlue = document.getElementById('weaponName-blue-info');
	var weaponNameRed = document.getElementById('weaponName-red-info');
	weaponNameRed.innerHTML = 'Arme : Couteau';
	weaponNameBlue.innerHTML = 'Arme : Couteau';

	var weaponDamageBlue = document.getElementById('weaponDamage-blue-info');
	var weaponDamageRed = document.getElementById('weaponDamage-red-info');
	weaponDamageRed.innerHTML = 'Dégats : 10';
	weaponDamageBlue.innerHTML = 'Dégats : 10';

	var lifeblue = document.getElementById('lifePoints-blue-info');
	var lifered = document.getElementById('lifePoints-red-info');
	lifered.innerHTML = 'Vie : 100';
	lifeblue.innerHTML = 'Vie : 100';

sessionStorage.setItem("weaponblue","weapon");
sessionStorage.setItem("weaponred","weapon");
sessionStorage.setItem("lifered",100);
sessionStorage.setItem("lifeblue",100);
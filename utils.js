//look at the function name non (might wnat to fix for roman numerals
function capFirstLets(string) {

	var words = string.split(" ");

	for (let i = 0; i < words.length; i++) {
		if(words[i] === ""){
			words = words.splice(i + 1,words.length);
			continue;			
		}
		words[i] = words[i][0].toUpperCase() + words[i].substr(1);
	}
	return words.join(" ");

}

//gets the image for an item usings its keyid 
function getImg(key) {

	var tempt = "Textures/beef_raw.png";

	key = sortedAucs[key][0][7];

	var searchField = "type";
	console.log(key);


	for (var i = 0; i < imgData.length; i++) {
		if (imgData[i].type === key) {

			var itemName = imgData[i].name;
			var itemNameU = itemName.replace(/\s/g, "_");
			console.log(itemNameU);
			return "Textures/".concat(itemNameU.toLowerCase(), ".png");;

		}
	}


}

//adds color to an item name taking into account its stars and rarity
function addColor(data) {
	var name = data[5];
	var tier = data[4];
	var stars = "";
console.log(name);
	if (name.match(/[^a-zA-Z\s'-]+/g) !== null) {
		
		stars = name.match(/[^a-zA-Z\s']+/g);
		console.log(stars);
		name = name.replace(/[^a-zA-Z\s']+/g, '');
	}

	var color;

	if (tier === "COMMON") {
		color = "#FFFFFF";
	} else if (tier === "UNCOMMON") {
		color = "#55FF55";
	} else if (tier === "RARE") {
		color = "#5555FF";
	} else if (tier === "EPIC") {
		color = "#AA00AA";
	} else if (tier === "LEGENDARY") {
		color = "#FFAA00";
	} else if (tier === "MYTHIC") {
		color = "#FF55FF";
	} else if (tier === "SUPREME") {
		color = "#AA0000";
	}


return "<span style='color:".concat(color, ";'>", name, "</span><span style='color:#FFAA00;'>", stars, "</span>");



}
//lmao not eeven used
function colorSkullNone() {
	return 0;
}

//comppiles item lore into a readable manner and includes all colorizing and indetations
function loreStuff(str) {

	console.log(str);

	while (str.search("§l") !== -1) {
		str = str.replace("§l", "");
	}

	while (str.search("§o") !== -1) {
		str = str.replace("§o", "");
	}

	var colorCode = [
		["4", "AA0000"],
		["c", "FF5555"],
		["6", "FFAA00"],
		["e", "FFFF55"],
		["2", "00AA00"],
		["a", "55FF55"],
		["b", "55FFFF"],
		["3", "00AAAA"],
		["1", "0000AA"],
		["9", "5555FF"],
		["d", "FF55FF"],
		["5", "AA00AA"],
		["f", "FFFFFF"],
		["7", "AAAAAA"],
		["8", "555555"],
		["0", "000000"]
	];
	var formatCode = [
		["k"],
		["l", "<b>", "</b>"],
		["m"],
		["n"],
		["o", "<i>", "</i>"]
	];

	var finalStr = "<p class ='singleCardLore'><b><br>";

	for (var e = 0; str.search(/[^\w:()\\+%, .!-]+/g) !== -1; e++) {
		var testIndent = str.search("\n");
		var testColor = str.search(/[^\w:()\\+%, .!-]+/g);


		var colorLoad = 0;
		var fm = "none";

		if (testColor < testIndent) {
			var colorKey = str.charAt(testColor + 1);
			str = str.slice(2, str.length);

			var secondColor = str.search(/[^\w:()\\+%, .!]+/g);

			var textToColorize = str.slice(0, secondColor);

			str = str.slice(secondColor, str.length);

			//get color key
			for (var i = 0; i < colorCode.length; i++) {
				if (colorKey === colorCode[i][0]) {
					colorLoad = colorCode[i][1];
					fm = 0;
					break;
				}
			}

			if (colorLoad === 0) {
				for (var i = 0; i < formatCode.length; i++) {
					if (colorKey === formatCode[i][0]) {
						colorLoad = formatCode[i][1];
						fm = 1;
						break;
					}
				}
			}


			finalStr = finalStr.concat("<span style='color:".concat(colorLoad, ";'>", textToColorize, "</span>"));
		} else {
			str = str.slice(1, str.length);


			finalStr = finalStr.concat("<br>");
		}
	}

	finalStr = finalStr.concat("</b></p>");

	return finalStr;
}

//removes reforge of an item and returns the plain item name and reforge, can work as a reforge searcher but currently is not used for that purpose
function nukeItemName(item, iType, reforgeNeeded) {
	//finds reforges

	var iName = item
	var reforgeMisc = ["Salty", "Treacherous", "Fruitful", "Magnetic", "Refined", "Blessed", "Moil", "Toil", "Fleet", "Stellar", "Mithraic", "Auspicious", "Gentle", "Odd", "Fast", "Fair", "Epic", "Sharp", "Heroic", "Spicy", "Legendary", "Dirty", "Fabled", "Suspicious", "Withered"]; //all reforges, sort by item type, misc has all weapons + tool
	var reforgeWeapon = ["Gentle", "Odd", "Fast", "Fair", "Epic", "Sharp", "Heroic", "Spicy", "Legendary", "Dirty", "Fabled", "Suspicious", "Gilded", "Warped", "Withered", "Deadly", "Fine", "Grand", "Hasty", "Neat", "Rapid", "Unreal", "Awkward", "Rich", "Precise", "Spiritual", "Headstrong"];
	var reforgeArmor = ["Clean", "Fierce", "Heavy", "Godly", "Unpleasant", "Light", "Mythic", "Pure", "Smart", "Titanic", "Wise", "Perfect", "Necrotic", "Ancient", "Spiked", "Renowned", "Jaded", "Cubic", "Warped", "Reinforced", "Loving", "Ridiculous", "Giant", "Submerged"];
	var reforgeAccessories = ["Bizarre", "Itchy", "Ominous", "Pleasant", "Pretty", "Shiny", "Simple", "Strange", "Vivid", "Godly", "Demonic", "Forceful", "Hurtful", "Keen", "Strong", "Superior", "Unpleasant", "Zealous", "Silky", "Bloody", "Shaded", "Sweet"];
	var reforge = "";
	//search exceptions   too much work nvm (useless too)

	if (iType === "weapon") {

		for (var z = 0, length = reforgeWeapon.length; z < length; z++) {
			var search = iName.search(reforgeWeapon[z]);
			if (search !== -1) {
				reforge = reforgeWeapon[z];
				iName = iName.replace(reforgeWeapon[z].concat(" "), "");
			}
		}
	}
	if (iType === "misc") {

		for (var z = 0, length = reforgeMisc.length; z < length; z++) {
			var search = iName.search(reforgeMisc[z]);
			if (search !== -1) {
				reforge = reforgeMisc[z];
				iName = iName.replace(reforgeMisc[z].concat(" "), "");
			}
		}
	}

	if (iType === "armor") {
		for (var z = 0, length = reforgeArmor.length; z < length; z++) {
			var search = iName.search(reforgeArmor[z]);
			if (search !== -1) {
				reforge = reforgeArmor[z];
				iName = iName.replace(reforgeArmor[z].concat(" "), "");
			}
		}
	}

	if (iType === "accessories") {
		for (var z = 0, length = reforgeAccessories.length; z < length; z++) {
			var search = iName.search(reforgeAccessories[z]);
			if (search !== -1) {
				reforge = reforgeAccessories[z];
				iName = iName.replace(reforgeAccessories[z].concat(" "), "");
			}
		}
	}
	//Finds stars
	iName = iName.replace(/[^\x00-\x7F]/g, "");
	iName = iName.replace(/[ \t]+$/g, "");

	if (reforgeNeeded === "") {
		return [iName.toLowerCase(), ""];

	} else {
		return [iName.toLowerCase(), reforge.toLowerCase()];
	}


}
//get the first enchant from an enchanted book using its data (extraatributes.value)
function uncompileEnchatedbook(data){
	try{
	var enchants = data.enchantments.value;
	var labels = Object.keys(enchants);
	
		if(labels.length > 1){
			return "enchanted book";
		}
		
var val = enchants[labels[0]].value;		
labels = labels[0].replace("ultimate_","").toLowerCase();
			
		while(labels.search("_") !== -1){
labels = labels.replace("_"," ");			
		}
		
labels = labels.concat(" ",val);

	return labels;}
	catch(err){
		return "enchanted book";
	}
	
}

function efficientAucSearch(itemS){  //reforgeless  parameter set as enchated book will return all books
	var returnarr = [];
	var bookarr = [];
	for (var i = 0; i < auc[0].length; i++) { //goes through auctions

		try {
			const item = auc[0][i];
			var itemName = item.item_name;

			if (itemName.search(itemS) !== -1 && item.bin === true) {

				const itemBytes = item.item_bytes;
				const base64 = atob(itemBytes);
				const ungzip = pako.inflate(base64);
				var itemData;

				var itemDataExtract = nbt.parse(ungzip, function(error, data) {
					if (error) {
						console.log(error);
					}
					var simData = data.value.i.value.value[0];
					itemData = simData.tag.value.ExtraAttributes.value;

				})
				if(itemS === "Enchanted Book"){
					itemName = uncompileEnchatedbook(itemData);
					
					
					if(bookarr.includes(itemName) === true ){
						var location = bookarr.indexOf(itemName);
						console.log(bookarr[location], itemName);
						returnarr[location][returnarr[location].length] = [itemName, itemData, item.starting_bid];
						continue;
				}
				else{
					console.log(itemName);
					bookarr[bookarr.length] = itemName;
					console.log(bookarr);
					returnarr[returnarr.length] = [[itemName, itemData, item.starting_bid]];
					continue;
				}
				}

				 returnarr[returnarr.length] = [itemName, itemData, item.starting_bid];
			
			}
		} catch (err) {
			console.log(err);
		}
	}
	returnarr = returnarr.sort(function(a, b){return a[2] - b[2]});
	if(bookarr.length < 5){
	return returnarr;}
	else{
		for (var o = 0; o < returnarr.length; o++){
			returnarr[o] = returnarr[o].sort(function(a, b){return a[2] - b[2]});
		
		}
		return [returnarr, bookarr];}
}

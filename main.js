var pages = 1;
var auc = [0, 0];
var totalAucs;
var sortedAucs = [];
var sortedAucsKey = [];
var imgData;
getImgData()

//gets the item id of an item to be used for finding its image (maybe replace with own array to lower data transfer 
async function getImgData() {
	var raw = await fetch("https://minecraft-ids.grahamedgecombe.com/items.json");
	const data = await raw.json();
	imgData = data;
}


async function getPages() {

	var raw = await fetch("https://api.hypixel.net/skyblock/auctions?page=".concat(0));
	const d = await raw.json();
	console.log(d);
	auc[0] = d.auctions;
	pages = d.totalPages - 1;
	totalAucs = d.totalAuctions;
	var amount = Math.floor(pages*(document.getElementById("pRange").value / 100));
	console.log(amount);

	for (var p = 1; p < amount; p++) { // 2 to pages
		document.getElementById("LoadBar").innerHTML = Math.round(p / pages * 100);
		var raw = await fetch("https://api.hypixel.net/skyblock/auctions?page=".concat(p));
		const d = await raw.json();
		console.log(d);
		auc[0] = auc[0].concat(d.auctions);
	}
	console.log(imgData);
	auc[1] = 1;

}





function searchItem(filter) {

	sortedAucs = [];
	sortedAucsKey = [];

	itemSearch = document.getElementById('searchbar').value;

	if (auc[0] === 0) {
		alert("wait non");
		return;
	}
	itemSearch = itemSearch.toLowerCase();




	for (var i = 0; i < auc[0].length; i++) { //goes through auctions

		try {
			const item = auc[0][i];
			const itemName = nukeItemName(item.item_name, item.category);



			if (itemName[0].search(itemSearch) !== -1) {

				const itemBytes = item.item_bytes;
				const base64 = atob(itemBytes);
				const ungzip = pako.inflate(base64);
				var itemData;
				var CSN;
				var itemID;

				var itemDataExtract = nbt.parse(ungzip, function(error, data) {
					if (error) {
						console.log(error);
					}


					var simData = data.value.i.value.value[0];

					itemData = simData.tag.value.ExtraAttributes.value;


					itemID = simData.id.value;
					CSN = colorSkullNone();
				})
				if(itemName[0] === "enchanted book"){
					itemName[0] = uncompileEnchatedbook(itemData);
				}

				if (searchExclude(filter, itemName, itemData) === false) {
					continue;
				}
				

				addItemtoArray(itemData, capFirstLets(itemName[0]), item.starting_bid, item.auctioneer, item.bin, item.tier, item.item_name, item.item_lore, itemID, CSN);

			}
		} catch (err) {
			console.log(err);
		}
	}

	console.log(sortedAucs);
	console.log(sortedAucsKey);
	clearCards("search");

}



function addItemtoArray(data, name, price, uuid, bin, tier, trueName, lore, itemID) {

	if (sortedAucsKey.indexOf(name) === -1) {
		var key = sortedAucsKey.length;
		sortedAucsKey[key] = name;
		sortedAucs[key] = [];
		sortedAucs[key][0] = [data, price, uuid, bin, tier, trueName, lore, itemID];

	} else {
		var key = sortedAucsKey.indexOf(name);
		sortedAucs[key][sortedAucs[key].length] = [data, price, uuid, bin, tier, trueName, lore];
	}

}



function searchExclude(filter, item, itemData) { //(['enchants','indeferency','reccom'','reforge','star']







	var indeferency = document.getElementById('indeferency').checked;


	if (indeferency === true) {
		return true;
	}


	//enchants test
	var enchants = document.getElementById('enchants').value.split(",");
	if (filter[0] === true && enchants[0] !== "") {

		var enchants = document.getElementById('enchants').value.split(",");

		if (typeof itemData.enchantments === 'undefined') {
			console.log(7);
			return false;
		} else {
			var safe = 0;
			var enchantments = Object.keys(itemData.enchantments.value)
			for (var j = 0; j < enchantments.length; j++) {
				for (var k = 0; k <= enchants.length; k++) {
					if (enchantments[j] === enchants[k]) {
						safe = safe + 1;
					}
				}
			}

			if (safe !== enchants.length) {
				return false;
			}

		}
	}

	//reccom test
	if (filter[2] === true) {
		var reccomTest;
		var reccom = document.getElementById('reccomCheck').checked;

		if (typeof itemData.rarity_upgrades === 'undefined') {
			reccomTest = false;
		} else {
			reccomTest = true;
		}
		if (reccom !== reccomTest) {
			return false;
		}
	}


	//reforge test
	if (filter[3] === true) {
		var reforge = document.getElementById('reforge').value.toLowerCase();
		if (item[1] !== reforge) {
			return false;
		}
	}


	//test star
	if (filter[4] === true) {
		var starTest;
		var stars = document.getElementById('stars').value;
		if (typeof itemData.dungeon_item_level === 'undefined') {
			starTest = "0";
		} else {
			starTest = itemData.dungeon_item_level.value.toString();
		}
		if (stars !== "0/None" && starTest !== stars) {
			return false;
		}
	}

}




function callback(a, b) {
	console.log(a, b);;
}
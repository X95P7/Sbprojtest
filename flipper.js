var pages = 1;
var auc = [0, 0];
var totalAucs;
var sortedAucs = [];
var sortedAucsKey = [];
var imgData;
var reforgePrices;
var acceptedReforges = ["shaded","sweet","silky","bloody","candied","submerged","spiked","jaded","loving","renowned","giant","ancient","spiritual","fleet","auspicious","refined","ambered","fabled","suspicious","gilded","warped","withered","lucky","dirty"];	
var enchantPrices;
var enchantsKey;
var finalEstimates = [];
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
		var raw = await fetch("https://api.hypixel.net/skyblock/auctions?page=".concat(p));
		const d = await raw.json();
		console.log(d);
		auc[0] = auc[0].concat(d.auctions);
	}
	console.log(imgData);
	auc[1] = 1;
efficientAucExtract()
}
 
function efficientAucExtract(){ //goes through all auctions and gets the byte data of every item as long as the lowest bin for an item in over 250K
var trashMap = [];
var currentTime = Math.floor(Date.now());
	for (var i = 0; i < auc[0].length - 1 ; i++) { //goes through auctions
			const item = auc[0][i];
			try{
			var itemName = item.item_name;}
			catch(err){continue;}
			
			var price = item.starting_bid;
			
			itemName = nukeItemName(itemName, item.category);
			
			if(item.bin !== true){ continue;}
			
				if(trashMap.includes(itemName[0]) === true ){
					continue;
				}
				if(price <= 250000 && itemName[0] !== "enchanted book"){
					trashMap[trashMap.length] = itemName[0];
					
					continue;
				}

				const itemBytes = item.item_bytes;
				const base64 = atob(itemBytes);
				const ungzip = pako.inflate(base64);
				var itemData;
				var itemID;

				var itemDataExtract = nbt.parse(ungzip, function(error, data) {
					if (error) {
						console.log(error);
					}
					var simData = data.value.i.value.value[0];
				    itemID = simData.id.value;
					itemData = simData.tag.value.ExtraAttributes.value;

				})
				if(itemName[0] === "enchanted book"){
					itemName[0] = uncompileEnchatedbook(itemData);
				}
				
					addItemtoArray(itemData, capFirstLets(itemName[0]), item.starting_bid, item.auctioneer, item.bin, item.tier, capFirstLets(item.item_name), item.item_lore, itemID, currentTime - item.start);
	}
	reforgePrices = grabReforgeStones();
	
	var enchantStuff = efficientAucSearch("Enchanted Book");
	enchantPrices = enchantStuff[0];
	enchantsKey = enchantStuff[1];
	console.log(trashMap);
	console.log(sortedAucs);
	
	for( var i = 0; i < sortedAucs.length; i++){ //sortedAucs.length
		determineVaules(i) 
	}
	var timeSortData = document.getElementById("timeVSprofit").value / 100;
	console.log(timeSortData, 1- timeSortData);
	
	finalEstimates = finalEstimates.sort(function(a, b){return ((1 - timeSortData )* (b[0] / a[0] - 1)) + (timeSortData * (b[3] / a[3] - 1))});   //i ahve no idea
	
	clearCards("auc",);
}


function addItemtoArray(data, name, price, uuid, bin, tier, trueName, lore, time) {

	if (sortedAucsKey.indexOf(name) === -1) {
		var key = sortedAucsKey.length;
		sortedAucsKey[key] = name;
		sortedAucs[key] = [];
		sortedAucs[key][0] = [data, price, uuid, bin, tier, trueName, lore, time];

	} else {
		var key = sortedAucsKey.indexOf(name);
		sortedAucs[key][sortedAucs[key].length] = [data, price, uuid, bin, tier, trueName, lore, time];
	}

}

function determineVaules(KEY){    //CHANGE TO ID!!!!!!!!!!!!!!!!!!
	var currentItemArray = sortedAucs[KEY];
	
	if(currentItemArray.length < 15){
		return;
	}
	
	if(sortedAucsKey[KEY].search("Midas") !== -1){
		return;
	}
	
	var itemRegresion = [];
	
	var ultsKey = [];
	var ultsVal = [];
	
	//find reforge vaule of items and determine percentage weight based on population data
	var reforges = [];
	var reforgesval = [];
	for(var i = 0; i <= currentItemArray.length; i++){
		
			try{
			var itemReforge = currentItemArray[i][0].modifier.value;}
			catch(err){
				console.log(err);
			continue;}
		
			var index = reforges.indexOf(itemReforge);
			
			if(index !== -1){
				reforgesval[index] = reforgesval[index] + 1;
			}
			else{
				reforges[reforges.length] = itemReforge;
				reforgesval[reforgesval.length] = 1;
	}} 
	console.log(reforgesval);
		var totalReforges = 0;
				totalReforges = reforgesval.reduce((a, b) => a + b, 0);
		
		for(var i = 0; i < reforges.length; i++){
			reforgesval[i] = (reforgesval[i] / totalReforges) + 1;
			}
//saem thing as the refoge thing but with ultimate enchants
//how tf will this work a: get ult enchan using ultimate_ :frick: I do this in there already and it sounds tedious,  this would be better to put at the bottom

//wip

//to singular items
		console.log(currentItemArray.length);
	
	for(var e = 0; e < currentItemArray.length; e++){
		
		var itemData = currentItemArray[e][0];
		
	//stars calc
	var starVal = 0;
	
	try{
	var starData = itemData.dungeon_item_level.value;	
	for(var i = 0; i < starData; i++){ 
			starVal = starVal + (i ** 1.85);
		}}
			catch(err){
			}
	//calc hpb
	var hpbVal = 0;
	
	try{
	var hpbData = itemData.hot_potato_count.value;
			if(hpbData <= 10){
				for(var i = 0; i < hpbData; i++){
   //determineVaules("Livid Dagger");
					hpbVal = hpbVal + 30;
			}}	
			else{
				hpbVal = 300;
					for(var i = 0; i < hpbData-10; i++){
					
						hpbVal = hpbVal + 1000;
				
	}}}	
			catch(err){
			}
	//calc reccom
	var reccomVal = 0;	
	try{
			var reccomData = itemData.rarity_upgrades.value;
			reccomVal = 5000;
	}	
			catch(err){
				reccomVal =0;
			}
			
	//calc reforge
		var reforge = 0;
	try{
	var reforgeData = itemData.modifier.value;

		if(acceptedReforges.indexOf(reforgeData) !== -1){
			
			var spent = reforgePrices[acceptedReforges.indexOf(reforgeData)]
			reforge = (spent * 0.7) + ((spent * 0.3) * reforgesval[reforges.indexOf(reforgeData)]);
		}
		else{
			reforge = (30000 * 0.7) + ((30000 * 0.3) * reforgesval[reforges.indexOf(reforgeData)]);

			}
	}			
			catch(err){
				console.log(err);
			}
	
	//calc enchants
	var enchantsVal = 0;
	var enchantNum = 0;
	try{
		var enchants = itemData.enchantments.value;
		var enchantList = Object.keys(enchants);
		
		var completetedList = [];
			for(var i = 0; i < enchantList.length; i++){
				

						//remove unessicary stuff	
						completetedList[i] = enchantList[i];
						
						//if its an ultimate enchant account it in the bias
						if(completetedList[i].search("ultimate_") !== -1){
							

						completetedList[i] = completetedList[i].replace("ultimate_","").toLowerCase();

							var ultThis = completetedList[i];
						    var index = ultsKey.indexOf(ultThis);
							
							 enchantNum = ultThis;	
							
									if(index !== -1){
										ultsVal[index] = ultsVal[index] + 1;
									}
									else{
										ultsKey[ultsKey.length] = ultThis;
										ultsVal[ultsVal.length] = 1;
							}} 
												
						while(completetedList[i].search("_") !== -1){
						completetedList[i] = completetedList[i].replace("_"," ");			
			}

				completetedList[i] = completetedList[i].concat(" ",enchants[enchantList[i]].value);		
			}
			
			for(var i = 0; i < completetedList.length; i ++){
				var name = completetedList[i];

				var singleEnchantData = enchantPrices[enchantsKey.indexOf(name)];
				
				try{
				if(singleEnchantData.length > 1){
				var avg = (singleEnchantData[0][2] + singleEnchantData[1][2]) / 2;}
			
			else{
				var avg = singleEnchantData[0][2];
			}
					if(avg < 100000){
						continue;
				}}
				catch(err){}
				
				enchantsVal = enchantsVal + avg;
					
			}

}
	catch(err){console.log(err);}
	
		itemRegresion[itemRegresion.length] = [currentItemArray[e][1], reccomVal,  Math.floor(starVal), Math.floor(reforge), hpbVal, Math.floor(enchantsVal), enchantNum];
		
		}
		//becasue it works better here array of all ults 
	var totalUlts = 0;
				totalUlts = ultsVal.reduce((a, b) => a + b, 0);
		
		
		for(var i = 0; i < ultsKey.length; i++){
			ultsVal[i] = (ultsVal[i] / totalUlts) + 1;
			}
	
		
							for(var i = 0; i < itemRegresion.length; i++){
								if(itemRegresion[i][6] !== 0){
								currentItemEnchantWeight = itemRegresion[i][5];
								currentItemEnchantType = itemRegresion[i][6];
								
								itemRegresion[i][5] = Math.floor(currentItemEnchantWeight * (ultsVal[ultsKey.indexOf(currentItemEnchantType)] / 2));
								}
								
								itemRegresion[i] = itemRegresion[i].splice(0,6);
							} 

							
							var equation = formMatrix(itemRegresion);
								if(equation[0] === "ignore"){
								return;}
									
									var b = equation[0][0];
									
									var m = equation[0].splice(1,5);
									console.log(m,b);
									
									for(var e = 0; e < currentItemArray.length; e++){
										var flipThis =  itemRegresion[e];
									
										
											var profit = Math.trunc(((m[0] * flipThis[1]) + (m[1] * flipThis[2]) + (m[2] * flipThis[3]) + (m[3] * flipThis[4]) + (m[4] * flipThis[5]) + b) - flipThis[0]);
											
											if(profit > 0){
											finalEstimates[finalEstimates.length] = [profit, KEY, e, sortedAucs[KEY][e][7]]; }
										
										
										
									}
								
						
}
	




function grabReforgeStones(){
	var stoneForge = ["Shaded","Sweet","Silky","Bloody","Candied","Submerged","Spiked","Jaded","Loving","Renowned","Giant","Ancient","Spiritual","Fleet","Auspicious","Refined","Ambered","Fabled","Suspicious","Gilded","Warped","Withered","Lucky","Dirty"];
	var stones = ["Dark Orb","Rock Candy","Luxurious Spool","Beating Heart","Candy Corn","Deep Sea Orb","Dragon Scale","Jaderald","Red Scarf","Dragon Horn","Giant Tooth","Precursor Gear","Spirit Stone","Diamonite","Rock Gemstone","Refined Amber","Amber Material","Dragon Claw","Suspicious Vial","Midas Jewel","Warped Stone","Wither Blood","Lucky Dice","Dirt Bottle"];
	
	var result = [];
	
	for(var i = 0; i < stones.length; i++){
		var currentStone = efficientAucSearch(stones[i]);
			console.log(currentStone);
		if(currentStone.length > 1){
		var avg = Math.floor((currentStone[0][2] + currentStone[1][2]) / 2);
		}
		
		result[result.length] = avg;
		console.log(result);
	}
	return result;
}



	var pages = 1;
	var auc = [0,0];
	var totalAucs;
	var sortedAucs = [];
	var sortedAucsKey = [];
	var  imgData; 
	getImgData()
	
async function getPages() {
	
		var raw = await fetch("https://api.hypixel.net/skyblock/auctions?page=".concat(0));
        const d = await raw.json();
		console.log(d);
        auc[0] = d.auctions;  
        pages = d.totalPages - 1;
		totalAucs = d.totalAuctions;
	
    for (var p = 1; p <=pages; p++) { // 2 to pages
		document.getElementById("LoadBar").innerHTML = Math.round(p/pages * 100);
        var raw = await fetch("https://api.hypixel.net/skyblock/auctions?page=".concat(p));
        const d = await raw.json();
        console.log(d);
        auc[0] = auc[0].concat(d.auctions);  
        }
			console.log(imgData);
			auc[1] = 1;

			}
				
getPages();


	function searchItem(itemSearch){
	
				 sortedAucs = [];
				 sortedAucsKey = [];
	
	
				if(itemSearch === "q9wgvsd2"){
				itemSearch = document.getElementById('searchbar').value;
				}
				
				if(auc[0] === 0){
				console.log("wait non");
				return;
				}
	itemSearch = itemSearch.toLowerCase();
	
	
				for (var i = 0; i < auc[0].length; i++) { //goes through auctions
				
			try{
                const item = auc[0][i];
				const itemName = nukeItemName(item.item_name,item.category).toLowerCase();
				
				 if (itemName.search(itemSearch) !== -1 ) {
				 
					const itemBytes = item.item_bytes;
					const base64 = atob(itemBytes);
					const ungzip = pako.inflate(base64);
					var itemData;
					var CSN;
					var itemID; 
		
					var itemDataExtract = nbt.parse(ungzip, function(error, data) {
	if (error) { console.log(error); }
console.log(data);

	var simData = data.value.i.value.value[0];	
	
	 itemData =  simData.tag.value.ExtraAttributes.value;
	 
	  itemID = simData.id.value;
	  CSN = colorSkullNone();
	})   
			
			addItemtoArray(itemData, capFirstLets(itemName), item.starting_bid, item.auctioneer, item.bin, item.tier,item.item_name,item.item_lore, itemID, CSN);

					}
				}
				catch(err){
				console.log(err);
				}}
				console.log(sortedAucs);
				console.log(sortedAucsKey);
				displayAucs();
				
				}

function nukeItemName(item, iType){
	//finds reforges

                    var iName = item
                    var reforgeMisc = ["Salty","Treacherous","Fruitful","Magnetic","Refined","Blessed","Moil","Toil","Fleet","Stellar","Mithraic","Auspicious","Gentle","Odd","Fast","Fair","Epic","Sharp","Heroic","Spicy","Legendary","Dirty","Fabled","Suspicious","Withered"]; //all reforges, sort by item type, misc has all weapons + tool
                    var reforgeWeapon = ["Gentle","Odd","Fast","Fair","Epic","Sharp","Heroic","Spicy","Legendary","Dirty","Fabled","Suspicious","Gilded","Warped","Withered","Deadly","Fine","Grand","Hasty","Neat","Rapid","Unreal","Awkward","Rich","Precise","Spiritual","Headstrong"];
                    var reforgeArmor = ["Clean","Fierce","Heavy","Godly","Unpleasant","Light","Mythic","Pure","Smart","Titanic","Wise","Perfect","Necrotic","Ancient","Spiked","Renowned","Cubic","Warped","Reinforced","Loving","Ridiculous","Giant","Submerged"];
                    var reforgeAccessories = ["Bizarre","Itchy","Ominous","Pleasant","Pretty","Shiny","Simple","Strange","Vivid","Godly","Demonic","Forceful","Hurtful","Keen","Strong","Superior","Unpleasant","Zealous","Silky","Bloody","Shaded","Sweet"];

                    //search exceptions   too much work nvm (useless too)

                        if (iType === "weapon") {

                            for (var z = 0, length = reforgeWeapon.length; z < length; z++) {
                                var search = iName.search(reforgeWeapon[z]);
                                if (search !== -1) {
                                    iName = iName.replace(reforgeWeapon[z].concat(" "), "");
                                }
                            }
                        }
                        if (iType === "misc") {

                            for (var z = 0, length = reforgeMisc.length; z < length; z++) {
                                var search = iName.search(reforgeMisc[z]);
                                if (search !== -1) {
                                    iName = iName.replace(reforgeMisc[z].concat(" "), "");
                                }
                            }
                        }

                        if (iType === "armor") {
                            for (var z = 0, length = reforgeArmor.length; z < length; z++) {
                                var search = iName.search(reforgeArmor[z]);
                                if (search !== -1) {
                                    iName = iName.replace(reforgeArmor[z].concat(" "), "");
                                }
                            }
                        }

                        if (iType === "accessories") {
                            for (var z = 0, length = reforgeAccessories.length; z < length; z++) {
                                var search = iName.search(reforgeAccessories[z]);
                                    iName = iName.replace(reforgeAccessories[z].concat(" "), "");
                                }
                            }					
						 //Finds stars
						iName = iName.replace(/[^\x00-\x7F]/g, "");   
					    iName = iName.replace(/[ \t]+$/g, "");
								return iName;									
								}

				function addItemtoArray(data,name,price,uuid,bin,tier,trueName, lore, itemID){
				
					if (sortedAucsKey.indexOf(name) === -1){
					var key = sortedAucsKey.length;
					sortedAucsKey[key] = name;
					sortedAucs[key] = [];
					sortedAucs[key][0]= [data,price,uuid,bin,tier,trueName, lore, itemID];
					
					}
						else{	
							var key = sortedAucsKey.indexOf(name);
							sortedAucs[key][sortedAucs[key].length] = [data,price,uuid,bin,tier,trueName,lore];
						}
				
				}
				
				function colorSkullNone(){
				return 0;}



				 function callback(a,b){
	console.log(a,b);;}

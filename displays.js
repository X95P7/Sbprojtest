

//dynamic card thrower that allows for data too appear any way you want it based on its parameters
function throwCards(keyID, keyIMG, pre, innerText, type, noclick, amount, singleID, fromEstimations) { //key for image it is to be the same boolean for if image should alter, what to put before id's, textt thats diplayed use in line function (same as button), single or item in clear cards, are cards buttons?, # of loops 


	if (keyIMG === true) {
		const imgKey = getImg(keyID);
	}

	for (var i = 0; i <= amount - 1; i++) {

		var buttonWrap = document.createElement("button");
		buttonWrap.type = "button";
		buttonWrap.id = i
		buttonWrap.className = "card";

		if (noclick === false) {
			buttonWrap.onclick = function() {
				
				if(fromEstimations === false){
				clearCards(type, this.id, keyID);}
				
				else{
					console.log(finalEstimates,i);
					clearCards(type, finalEstimates[this.id][2], finalEstimates[this.id][1]);
					
				}
			};
		}

		pre.concat("DivBase", i);
		var para = document.createElement("div");
		para.id = pre.concat("DivBase", i);
		para.className = "c"; 												//add premeter for id change i to by sortedaucs[finalestimates[i][1]] adn stuff
		buttonWrap.appendChild(para);

		var imgdiv = document.createElement("div");
		imgdiv.id = pre.concat("DivIMG", i);
		imgdiv.className = "ImgDiv";

		var img = document.createElement("img");
		img.id = pre.concat("IMG", i);

		if (keyIMG === true) {
			img.src = getImg(keyID);
		} else {
			img.src = getImg(i);
		}

		img.className = "Img";
		imgdiv.appendChild(img);

		var info = document.createElement("div");
		info.id = pre.concat("DivInfo", i);
		info.className = "cardInfo";
		//Items[i][0][0].concat("  ", Items[i].length, )
		info.innerHTML = innerText(keyID, i); //"<p id='itemCardinfo'>".concat(sortedAucsKey[i],"</p><p id='itemCardinfo'>Amount:",sortedAucs[i].length + 1,"</p><p id='itemCardinfo'> Click for more info!</p>");

		para.appendChild(info);
		para.appendChild(imgdiv);


		var element = document.getElementById("info");
		element.appendChild(buttonWrap);
	}
}

//creates a larger card for a single item and displays its lore
async function throwSingle(keyID, id, innerText, pre) {




	pre.concat("DivBase");
	var para = document.createElement("div");
	para.id = pre.concat("DivBase");
	para.className = "singleCard";


	var imgdiv = document.createElement("div");
	imgdiv.id = pre.concat("DivIMG", id);
	imgdiv.className = "ImgDiv";

	var img = document.createElement("img");
	img.id = pre.concat("IMG");
	img.src = getImg(keyID);
	img.className = "Img";
	imgdiv.appendChild(img);

	var info = document.createElement("div");
	info.id = pre.concat("DivInfo");
	info.className = "cardInfo";
	//Items[i][0][0].concat("  ", Items[i].length, )
	
	console.log(keyID,id);
	
	info.innerHTML = "<p id='auctioneer'>/ah ".concat(await getUUID(keyID,id),"</p>",innerText(keyID, id),loreStuff(sortedAucs[keyID][id][6])); //"<p id='itemCardinfo'>".concat(sortedAucsKey[i],"</p><p id='itemCardinfo'>Amount:",sortedAucs[i].length + 1,"</p><p id='itemCardinfo'> Click for more info!</p>");

	para.appendChild(info);
	para.appendChild(imgdiv);


	var element = document.getElementById("info");
	element.appendChild(para);

}

//creates back button on top of info div
function throwBack(what, id, keyID) {


	var buttonWrap = document.createElement("button");
	buttonWrap.type = "button";
	buttonWrap.id = "backCard"
	buttonWrap.onclick = function() {
		console.log(id);
		clearCards(what, keyID, keyID);
	};

	var para = document.createElement("div");
	para.id = "backButtondiv"
	para.appendChild(buttonWrap);

	var txt = document.createElement("p");
	txt.id = "BackText";
	txt.innerHTML = "BACK";
	buttonWrap.appendChild(txt);

	var element = document.getElementById("info");
	element.appendChild(para);

}

//clears cards and displays new ones based on the parameters
function clearCards(throwtype, id, keyID) {
	var info = document.getElementById("info");
	var children = info.children;
	const length = children.length;

	for (var i = 0; i < length; i++) {
		children[0].remove();
	}
	if (throwtype === "search") {
		throwCards(0, false, "info", tcSearchText, "item", false, sortedAucsKey.length, 0, false)
	} else if (throwtype === "item") {
		throwBack("search", id, keyID);
		console.log(id);
		console.log(sortedAucs);
		throwCards(id, true, "item", domSingleItemData, "single", false, sortedAucs[id].length, 0, false);

	} else if(throwtype === "single"){
		throwBack("item", id, keyID);
		throwSingle(keyID, id, singleCardAuc, "single");
	}
	else if(throwtype === "auc"){
		throwCards(0, false, "flippable", flipDetails, "singleAuc", false, finalEstimates.length, 0, true);
	}
	else if(throwtype === "singleAuc"){
		throwBack("auc", id, keyID);
		throwSingle(keyID, id, singleCardAuc, "single");

}
}

async function getUUID(KeyID, id) {


var uuid = sortedAucs[KeyID][id][2];
console.log(uuid);

 var raw = await fetch("https://playerdb.co/api/player/minecraft/".concat(uuid));
        var d = await raw.json();
		var Username = d.data.player.username;
		console.log(Username);
		return Username;
}


//info boxes text functions 
function domSingleItemData(keyID, i, useless) {
	var data = sortedAucs[keyID][i];
	var price = data[1];


	return "<p id='itemCardinfo'><b>".concat(addColor(data, keyID, i), "</b></p><p id='itemCardinfo'>Price:", price, "</p><p id='itemCardinfo'> Click for more info!</p>");
}

function tcSearchText(unneeded, i, useless) {
	return "<p id='itemCardinfo'>".concat(sortedAucsKey[i], "</p><p id='itemCardinfo'>Amount:", sortedAucs[i].length, "</p><p id='itemCardinfo'> Click for more info!</p>");
}

function singleItemTxt(keyID, i, id) {

	var data = sortedAucs[keyID][id];
	var price = data[1];


	return "<p id='itemCardinfo'><b>".concat(addColor(data, keyID, i), "</b></p><p id='itemCardinfo'>Price:", price, "</p><p id='itemCardinfo'> Click for more info!</p>");

}

function singleCardAuc(keyID, id) {

	var obj = sortedAucs[keyID][id];
	var name = addColor(obj);

	var loreTxt; //loreComplier(obj); this is rly weird

	return "<p id='singleCardInfoTitle'><b>".concat(name, "</b></p>");

}

function flipDetails(keyID, id) {

	var obj = finalEstimates[id];
	var objData = sortedAucs[obj[1]][obj[2]];
	
	var profit = obj[0];
	
	console.log(profit);
	var name = addColor(objData);

	var loreTxt; //loreComplier(obj); this is rly weird

	return "<p id='singleCardInfoTitle'><b>".concat(name,"</b><br> Price: ",objData[1], "<br> Profit: ", profit,"</p>");

}




//			https://minecraft-ids.grahamedgecombe.com/items.json
//https://coolors.co/2d212e-d9d6d4-55c24c-114522-025578
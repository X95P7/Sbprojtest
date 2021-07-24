
				function displayAucs(){
					clearCards("search");
					
				
				}
function throwCards(keyID, keyIMG, pre, innerText, type ,noclick, amount, singleID){	//key for image it is to be the same boolean for if image should alter, what to put before id's, textt thats diplayed use in line function (same as button), single or item in clear cards, are cards buttons?, # of loops 
					
					
								if(keyIMG === true){
									const imgKey = getImg(keyID);
								}
					
							 for (i = 0; i <= amount -1; i++) {
									
									var buttonWrap = document.createElement("button");
									buttonWrap.type = "button";
									buttonWrap.id = i
									buttonWrap.className = "card";
									
									if(noclick === false){
									buttonWrap.onclick = function() {
										clearCards(type , this.id, keyID);
									};}
									
									pre.concat("DivBase",i);
									var para = document.createElement("div");
									para.id = pre.concat("DivBase",i);
									para.className = "c";
									buttonWrap.appendChild(para);
									
									var imgdiv = document.createElement("div");
									imgdiv.id = pre.concat("DivIMG",i);
									imgdiv.className = "ImgDiv";
									
									var img = document.createElement("img");
									img.id = pre.concat("IMG",i);
									
									if(keyIMG === true){
										img.src = getImg(keyID);
									}
									else{img.src = getImg(i);}
									
									img.className = "Img";
									imgdiv.appendChild(img);
									
										var info = document.createElement("div");
									info.id = pre.concat("DivInfo",i);
									info.className = "cardInfo";
																												//Items[i][0][0].concat("  ", Items[i].length, )
									info.innerHTML = innerText(keyID,i); 																	//"<p id='itemCardinfo'>".concat(sortedAucsKey[i],"</p><p id='itemCardinfo'>Amount:",sortedAucs[i].length + 1,"</p><p id='itemCardinfo'> Click for more info!</p>");
									
									para.appendChild(info);
									para.appendChild(imgdiv);
									
									
									var element = document.getElementById("info");
									element.appendChild(buttonWrap);
				}}

				
				
				function clearCards(throwtype,id, keyID){
					var info = document.getElementById("info");
					var children = info.children;
					const length = children.length;
					console.log(children.length);
						for (var i = 0; i < length; i++){
								children[0].remove();
						}
							if(throwtype === "search"){
							throwCards(0,false,"info",tcSearchText,"item",false,sortedAucsKey.length,0)}
							
							else if(throwtype === "item"){
								throwCards(id,true,"item",domSingleItemData,"single",false,sortedAucs[id].length,0);
							}
							else{
								throwSingle(keyID,id,singleCardAuc,"single");
							}
						
				}
				
				function capFirstLets(string){

					var words = string.split(" ");
					
					for (let i = 0; i < words.length; i++) {
						words[i] = words[i][0].toUpperCase() + words[i].substr(1);
					}
						return words.join(" ");
					
				}
				
				
				
				function getImg(key){
					
					var tempt = "Textures/beef_raw.png";
					
					key  = sortedAucs[key][0][7];
					
					var searchField = "type";
					console.log(key);
					
					
									for (var i=0 ; i < imgData.length ; i++)
				{
											if (imgData[i].type === key) {
													
													var itemName = imgData[i].name;
													var itemNameU = itemName.replace(/\s/g,"_");
													console.log(itemNameU);
													return "Textures/".concat(itemNameU.toLowerCase(),".png");;
													
											}
										}
					
					
				}
				
				function domSingleItemData(keyID, i, useless){
									var data = sortedAucs[keyID][i];
									var price = data[1];
									
									
									return "<p id='itemCardinfo'><b>".concat(addColor(data, keyID, i),"</b></p><p id='itemCardinfo'>Price:",price,"</p><p id='itemCardinfo'> Click for more info!</p>");						
				}
				
				function addColor(data){
					var name = data[5];
					var tier  = data[4];
					var stars = "";
					
					if(name.match(/[^a-zA-Z\s']+/g) !== null){
						stars = name.match(/[^a-zA-Z\s']+/g);
						name = name.replace(/[^a-zA-Z\s']+/g,'');
					}
					
					var color; 
					
						if(tier === "COMMON"){
							color = "#FFFFFF";
						}
						else if(tier === "UNCOMMON"){
							color = "#55FF55";
						}
						else if(tier === "RARE"){
							color = "#5555FF";
						}
						else if(tier === "EPIC"){
							color = "#AA00AA";
						}
						else if(tier === "LEGENDARY"){
							color = "#FFAA00";
						}
						else if(tier === "MYTHIC"){
							color = "#FF55FF";
						}
						else if(tier === "SUPREME"){
							color = "#AA0000";
						}
						
						
					return "<span style='color:".concat(color,";'>",name,"</span><span style='color:#FFAA00;'>",stars,"</span>");
					
				}
				
				async function getImgData(){
					var raw = await fetch("https://minecraft-ids.grahamedgecombe.com/items.json");
					const data = await raw.json();
					imgData = data;
				}
				
				function tcSearchText(unneeded,unused, useless){
				return "<p id='itemCardinfo'>".concat(sortedAucsKey[i],"</p><p id='itemCardinfo'>Amount:",sortedAucs[i].length,"</p><p id='itemCardinfo'> Click for more info!</p>");
				}
				
				function singleItemTxt(keyID,i,id){
									
									var data = sortedAucs[keyID][id];
									var price = data[1];
									
									
									return "<p id='itemCardinfo'><b>".concat(addColor(data, keyID, i),"</b></p><p id='itemCardinfo'>Price:",price,"</p><p id='itemCardinfo'> Click for more info!</p>");	
	
				}
				
				function throwSingle(keyID,id, innerText, pre){
					
									
								
									
									pre.concat("DivBase");
									var para = document.createElement("div");
									para.id = pre.concat("DivBase");
									para.className = "singleCard";
								
									
									var imgdiv = document.createElement("div");
									imgdiv.id = pre.concat("DivIMG",i);
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
									info.innerHTML = innerText(keyID,id).concat(loreStuff(sortedAucs[keyID][id][6]));																//"<p id='itemCardinfo'>".concat(sortedAucsKey[i],"</p><p id='itemCardinfo'>Amount:",sortedAucs[i].length + 1,"</p><p id='itemCardinfo'> Click for more info!</p>");
									
									para.appendChild(info);
									para.appendChild(imgdiv);
									
									
									var element = document.getElementById("info");
									element.appendChild(para);
					
				}
				
				function singleCardAuc(keyID,id){
					
					var obj = sortedAucs[keyID][id];
					var name = addColor(obj);
					
					var loreTxt; //loreComplier(obj); this is rly weird
					
					return "<p id='singleCardInfoTitle'><b>".concat(name,"</b></p>");
					
				}
				
				function loreStuff(str){

console.log(str);

	while(str.search("§l") !== -1) { 	
		str = str.replace("§l","");
	}
	
	while(str.search("§o") !== -1) { 	
		str = str.replace("§o","");
	}

	var colorCode = [["4","AA0000"],["c","FF5555"],["6","FFAA00"],["e","FFFF55"],["2","00AA00"],["a","55FF55"],["b","55FFFF"],["3","00AAAA"],["1","0000AA"],["9","5555FF"],["d","FF55FF"],["5","AA00AA"],["f","FFFFFF"],["7","AAAAAA"],["8","555555"],["0","000000"]];
	var formatCode = [["k"],["l","<b>","</b>"],["m"],["n"],["o","<i>","</i>"]];
	
	var finalStr = "<p class ='singleCardLore'><b><br>";
	
for(var e = 0; str.search(/[^\w:()\\+%, .!]+/g) !== -1; e++){
	var testIndent = str.search("\n");
	var testColor = str.search(/[^\w:()\\+%, .!]+/g);
	

	var colorLoad = 0;
	var fm = "none";

	if(testColor < testIndent){
		var colorKey = str.charAt(testColor+1);	
		str = str.slice(2,str.length);

		var secondColor =str.search(/[^\w:()\\+%, .!]+/g);

		var textToColorize = str.slice(0,secondColor);
		
		str = str.slice(secondColor,str.length);	

	//get color key
			for(var i = 0; i < colorCode.length; i++){
				if(colorKey === colorCode[i][0]){
					colorLoad = colorCode[i][1];
					fm = 0;
					break;
				}}
			
			if(colorLoad === 0){
				for(var i = 0; i < formatCode.length; i++){
				if(colorKey === formatCode[i][0]){
					colorLoad = formatCode[i][1];
					fm = 1;
				break;}
			}}
		
		
		finalStr = finalStr.concat("<span style='color:".concat(colorLoad,";'>",textToColorize,"</span>"));
	}
else {
	str = str.slice(1,str.length);

	
		finalStr = finalStr.concat("<br>");
}}
		

console.log(textToColorize);
console.log(colorKey);

finalStr = finalStr.concat("</b></p>");

return finalStr;
}
					
					
					
				
	//			https://minecraft-ids.grahamedgecombe.com/items.json
	//https://coolors.co/2d212e-d9d6d4-55c24c-114522-025578

				function displayAucs(){
					throwCards();
				
				}


				function throwCards(){
					console.log("hhhhhh");
					var amount = sortedAucsKey.length;
					const rows = amount / 5;
					
							 for (i = 0; i <= amount - 1 ; i++) {
									var para = document.createElement("div");
									para.id = "div".concat(i);
									para.className = "card";
									var node = document.createTextNode(sortedAucsKey[i]);                                   //Items[i][0][0].concat("  ", Items[i].length, )
									para.appendChild(node);
									
									var element = document.getElementById("info");
									element.appendChild(para);
								}
				
				
				}
				
				
	//			https://minecraft-ids.grahamedgecombe.com/items.json
	//https://coolors.co/2d212e-d9d6d4-55c24c-114522-025578
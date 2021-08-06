function formMatrix(itemArray){
	
	if(itemArray.length < 15){
		return ["ignore","ignore"];
	}
	
	itemArray = itemArray.sort(function(a, b){return a[0] - b[0]});
	console.log(itemArray);
	
	var y = []; // price
	var x1 = []; // star
	var x2 = []; // reccom
	var x3 = [];// reforge
	var x4 = [];// hpb
	var x5 = [];// enchants
	
		for(var i = 0; i < math.floor(itemArray.length * 0.7); i++){
			var item = itemArray[i];
			y[y.length] = itemArray[i][0];
			
			x1[x1.length] = itemArray[i][1];
			x2[x2.length] = itemArray[i][2];
			x3[x3.length] = itemArray[i][3];
			x4[x4.length] = itemArray[i][4];
			x5[x5.length] = itemArray[i][5];
		}
		return [findMultivaribleLine(y, x1, x2,x3, x4, x5),0];
		
}




function findMultivaribleLine(y, x1, x2,x3, x4, x5) { 

	var bVaule = [0,0,0,0,0];
	//Y matrix
	var matrixY = math.matrix(y);
	//X matrix
	//generate first row
	var ones = [];
	for(var i= 0; i < x1.length; i++){
	ones[ones.length] = 1;
	}

	
//Create adjusted or noraml matrix	
var arrayX = [];
	 arrayX[0] = ones;
	

		arrayX[arrayX.length] = x1; 
	
	

		arrayX[arrayX.length] = x2;
	


		arrayX[arrayX.length] = x3;
	


		arrayX[arrayX.length] = x4;
		
		
		arrayX[arrayX.length] = x5;
	
	console.log(y);
	console.log(arrayX);
	
	var matrixX = math.transpose(math.matrix(arrayX));
console.log(matrixX);
	

	//Calc (X'X)^-1
	var matrixXT = math.transpose(matrixX);
	var matrixXX = math.multiply(arrayX,matrixX);

//If not enough data is availible it will go to standard linear regression
try{
	var matrixXXInverse = math.inv(matrixXX);
	}
	catch{
		console.log("ignore");
		return "ignore"}  
	
	var matrixXY = math.multiply(matrixXT,matrixY);
	
	var matrixM = math.multiply(matrixXXInverse,matrixXY);
	return matrixM._data;}
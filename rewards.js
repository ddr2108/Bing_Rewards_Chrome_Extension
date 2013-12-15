var data = new Array();						//parsed JSON data 
var stringArr = new Array();	//holds names
var dataRequests = 0;			//# Data Request
var dataRecieved = 0; 			//Data Recieved
var searched = 0;				//# bing Searches

//Search Items
stringArr[0] = "United States"; 
stringArr[1] = "Obama"; 
stringArr[2] = "China"; 
stringArr[3] = "Europe"; 
stringArr[4] = "Mexico"; 
stringArr[5] = "Russia"; 
stringArr[6] = "India"; 
stringArr[7] = "Brazil"; 
stringArr[8] = "Atlanta"; 
stringArr[9] = "New York"; 
stringArr[10] = "Hollywood"; 
stringArr[11] = "NASDAQ"; 
stringArr[12] = "Gold"; 
stringArr[13] = "phones"; 
stringArr[14] = "movies"; 
stringArr[15] = "Europe"; 
stringArr[16] = "music"; 
stringArr[17] = "health"; 
stringArr[18] = "sports"; 
stringArr[19] = "Chicago"; 
stringArr[20] = "London"; 


//Begin Search
createPointsRequests();

function createPointsRequests(){
    var reqPoints = new XMLHttpRequest();									//Create Request
    reqPoints.open("GET", "http://www.bing.com/rewards/dashboard", true);	//Set link
    reqPoints.onreadystatechange = receivePoints;							//Create Callback
    reqPoints.send(null);													//Send data
}

function receivePoints(){
	var index;
	var str;
	var searches;
	var points;

	if (this.readyState==4){
		//Find location of points
		index = this.responseText.indexOf("Earn 1 credit per");

		if (index != -1){	
			searches = this.responseText.substring(index + 18, index + 19);

			index = this.responseText.indexOf("Bing searches up to");
			str = this.responseText.substring(index + 20, index + 150);
			points = str.substring(0, str.indexOf(" "));
	 
			dataRequests = points*searches/3;		//Find necessary requests
			dataRequests = 10;

			createDataRequests();			//Start Requests for Data
		}else{
			chrome.tabs.create({"url":"http://www.bing.com/search?q=" + "Log In", active: false});
		}
	}

}


function createDataRequests(){
	var i = 0;
	var search; 

	//Do a request for data
	for (i = 0; i<dataRequests; i++){
		//Create link
		search = "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=" + stringArr[i];

		var reqData = new XMLHttpRequest();											//Create Request
		reqData.open(																//Set link
		    "GET",
		    search,
		    true);																	
		reqData.onreadystatechange  = receiveData;									//Create Callback
		reqData.send(null);															//Send data
	}
}


//After getting JSON data
function receiveData() {
	//Check if data is ready
	if (this.readyState==4){
		data[dataRecieved] = JSON.parse(this.responseText);		//Store data
		dataRecieved++;
	}
	
	//If all data recieved, do seaches
	if (dataRecieved==dataRequests){
		bing();
	}
}

function bing(){
	var indexData = 0;
	var indexJSON = 0;
	var stringArr;
	var url;

	//Do the search
	if (searched < dataRequests*3){
		//Find where to get data
		indexData = Math.floor(searched/3);
		indexJSON = searched++%3;

		//Parese and clean data
        stringArr = data[indexData]["responseData"]["results"][indexJSON]["title"];
		stringArr = stringArr.replace(/#/gi,"");
		stringArr = stringArr.replace("<b>","");
		stringArr = stringArr.replace("</b>","");

		//Do Search
		url = "http://www.bing.com/search?q=" + stringArr;
		chrome.tabs.create({"url":url, active: false});
        
        //Do recursive search
        setTimeout(bing, 1000);
	}

}	

var data;						//parsed JSON data
var stringArr = new Array();	//holds names
var dataRequests = 0;			//# Data Request
var dataRecieved = 0; 			//Data Recieved
var searched = 0;				//# bing Searches

//Search Items
stringArr[0] = "Mexico"; 
stringArr[1] = "USA"; 
stringArr[2] = "China"; 


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
	var points;

	if (this.readyState==4){
		//Find location of points
		index = this.responseText.indexOf("Bing searches up to");		
		str = this.responseText.substring(index + 20, index + 150);
		points = str.substring(0, str.indexOf(" "));
 
		dataRequests = points/5;		//Find necessary requests

		createDataRequests();			//Start Requests for Data
	}
}


function createDataRequests(){
	var i = 0;
	var search; 

	//Do a request for data
	for (i = 0; i<2; i++){
		//Create link
		search = "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=" + stringArr[i];

		var reqData = new XMLHttpRequest();											//Create Request
		reqData.open(																//Set link
		    "GET",
		    search,
		    true);																	
		reqData.onreadystatechange  = receiveData;								//Create Callback
		reqData.send(null);															//Send data
	}
}


//After getting JSON data
function receiveData() {
	//Check if data is ready
	if (this.readyState==4){
		dataRecieved++;
	}
	
	//If all data recieved, do seaches
	if (dataRecieved==2){
		bing();
	}
}

function bing(){
	
	//Do the search
	if (searched++<12){
		chrome.tabs.create({"url":"http://www.bing.com/search?q=" + (searched+20)+"a", active: false});		//Do the search
        setTimeout(bing, 1000);			//Do another search
	}

}	

//Search Items
var stringArr = ["United States","Obama","China", "Europe", "Mexico", "Russia", "India","Brazil", "Atlanta", "New York", 
"Hollywood", "NASDAQ","Gold","phones","movies", "Europe", "music", "health", "sports", "Chicago", 
"London", "Paris", "Los Angeles", "Amazon", "Apple", "Microsoft", "Sony", "Korea", "Samsung", "Cisco",
"insurance", "CDC", "gas", "AAA", "ford", "GM", "GE", "San Francisco","Florida", "California",
"Washington", "Texas","gun","deal","purchase","politics","world","biden","google","mission",
"UN","Canada","Japan","UK","dead","fight","law","song","today","news",
"progress"]


var data = new Array();						//parsed JSON data 
var dataRequests = 0;			//# Data Request
var dataRecieved = 0; 			//Data Recieved
var searched = 0;				//# bing Searches

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
	 
			dataRequests = points*searches/3+1;		//Find necessary requests
			dataRequests = 10;

			createDataRequests();					//Start Requests for Data
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
        var reqData = new XMLHttpRequest();											//Create Request
		reqData.open(																//Set link
		    "GET",
		    url,
		    true);																	
		reqData.send(null);															//Send data

        //Do recursive search
        setTimeout(bing, 1000);
	}
}	
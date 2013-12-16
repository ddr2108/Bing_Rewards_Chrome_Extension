//Search Items
var stringArr = ["United States","Obama","China", "Europe", "Mexico", "Russia", "India","Brazil", "Atlanta", "New York", 
"Hollywood", "NASDAQ","Gold","phones","movies", "Europe", "music", "health", "sports", "Chicago", 
"London", "Paris", "Los Angeles", "Amazon", "Apple", "Microsoft", "Sony", "Korea", "Samsung", "Cisco",
"insurance", "CDC", "gas", "AAA", "ford", "GM", "GE", "San Francisco","Florida", "California",
"Washington", "Texas","gun","deal","purchase","politics","world","biden","google","mission",
"UN","Canada","Japan","UK","dead","fight","law","song","today","news",
"progress"]


var data = new Array();			//parsed JSON data 

var points = 0;					//Potential Points
var searches;					//# searches / point

var dataRequests = 0;			//# Data Request
var dataRecieved = 0; 			//Data Recieved
var searched = 0;				//# bing Searches

var checkFlag = 0;				//Flag to determine if doing checking

//Begin Search on click
chrome.browserAction.onClicked.addListener(createPointsRequests);

//////////////////////////
//Create a request to get
//points data
//////////////////////////
function createPointsRequests(){
    var reqPoints = new XMLHttpRequest();									//Create Request
    reqPoints.open("GET", "http://www.bing.com/rewards/dashboard", true);	//Set link

    //Create Callback
    if (checkFlag==1){
    	checkFlag = 0;
        reqPoints.onreadystatechange = receiveCompletion;
    }else{
    	reqPoints.onreadystatechange = receivePoints;							
    }						

    reqPoints.send(null);													//Send data

    return;
}

//////////////////////////
//Recieve points data and
//calculate the number of 
//searches that need to do
//////////////////////////
function receivePoints(){
	var index;
	var str;

	if (this.readyState==4){

		//Find location of points
		index = this.responseText.indexOf("Earn 1 credit per");

		if (index != -1){	
			searches = this.responseText.substring(index + 18, index + 19);

			index = this.responseText.indexOf("Bing searches up to");
			str = this.responseText.substring(index + 20, index + 150);
			points = str.substring(0, str.indexOf(" "));
	 
			dataRequests = points*searches/3+1;		//Find necessary requests

			createDataRequests();					//Start Requests for Data
		}
	}

	return;
}

//////////////////////////
//Recieve points data and
//calculate the number of 
//searches that need to do-
//specific to second try
//////////////////////////
function receiveCompletion(){
	var index;
	var str;
	var pointsDone;

	if (this.readyState==4){

		str = "of " + points + " credits";
		//Find location of points
		index = this.responseText.indexOf(str);

		if (index != -1){	
			//Get points done
			pointsDone = this.responseText.substring(index -3, index-1);
			pointsDone = pointsDone.replace(">","");
	 
			dataRequests = (points-pointsDone)*searches/3+1;		//Find necessary requests

			if (dataRequests>0){
				createDataRequests();					//Start Requests for Data
			}else{
				chrome.tabs.create({"url":"http://www.google.com", active: false});                //Open google to say done
			}
		}else{
			chrome.tabs.create({"url":"http://www.google.com", active: false});                //Open google to say done
		}
	}

	return;

}

//////////////////////////
//Do a request to get news 
//data to use in searches
//////////////////////////
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

	return;
}


//////////////////////////
//Recieve news data and
//do the actual searches
//////////////////////////
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

	return;
}

//////////////////////////
//Do the actual searches
//////////////////////////
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
	}else{
		dataRequests = 0;			//# Data Request
		dataRecieved = 0; 			//Data Recieved
		searched = 0;				//# bing Searches
		checkFlag = 1;

		createPointsRequests();

		return;
	}
}
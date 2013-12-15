var data;					//parsed JSON data
var stringArr;				//holds names
var searched = 0;						//index
var dataRecieved = 0; 					//Ready Flags


createRequests();


function createRequests(){
	var i = 0;

	//Do a request for data
	for (i = 0; i<2; i++){
		var reqData = new XMLHttpRequest();
		reqData.open(													//Sync Request
		    "GET",
		    "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=mexico",
		    true);
		reqData.onreadystatechange  = onTrendData;						//Call fx
		reqData.send(null);											//Send Request
	}
}


//After getting JSON data
function onTrendData() {

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

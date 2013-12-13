//Requests from data from Google News
var req0 = new XMLHttpRequest();
req0.open(													//Sync Request
    "GET",
    "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=europe",
    true);
req0.onreadystatechange  = onTrendData;						//Call fx
req0.send(null);											//Send Request

//Requests from data from Google News
var req1 = new XMLHttpRequest();
req1.open(													//Sync Request
    "GET",
    "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=obama",
    true);
req1.onreadystatechange  = onTrendData;						//Call fx
req1.send(null);											//Send Request

//Requests from data from Google News
var req2 = new XMLHttpRequest();
req2.open(													//Sync Request
    "GET",
    "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=atlanta",
    true);
req2.onreadystatechange  = onTrendData;						//Call fx
req2.send(null);											//Send Request

//Requests from data from Google News
var req3 = new XMLHttpRequest();
req3.open(													//Sync Request
    "GET",
    "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=china",
    true);
req3.onreadystatechange  = onTrendData;						//Call fx
req3.send(null);											//Send Request

//Requests from data from Google News
var req4 = new XMLHttpRequest();
req4.open(													//Sync Request
    "GET",
    "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=israel",
    true);
req4.onreadystatechange  = onTrendData;						//Call fx
req4.send(null);											//Send Request

//Requests from data from Google News
var req5 = new XMLHttpRequest();
req5.open(													//Sync Request
    "GET",
    "https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=mexico",
    true);
req5.onreadystatechange  = onTrendData;						//Call fx
req5.send(null);											//Send Request



var data;					//parsed JSON data
var stringArr;				//holds names
var i;						//index

//Ready Flags
var index = new Array();	//holds flags
index[0]=0;
index[1]=0;
index[2]=0;
index[3]=0;
index[4]=0;
index[5]=0;

i =0;

//After getting JSON data
function onTrendData() {
	//Get data from each trend when ready
	if(req0.readyState == 4 && index[0]==0) {
		index[0] = 1;			//Set index bit as read
		search(req0);			//Do the actual searches
	} else if(req1.readyState == 4 && index[1]==0) {
		index[1] = 1;			//Set index bit as read
		search(req1);			//Do the actual searches
	} else if(req2.readyState == 4 && index[2]==0) {
		index[2] = 1;			//Set index bit as read
		search(req2);			//Do the actual searches
	} else if(req3.readyState == 4 && index[3]==0) {
		index[3] = 1;			//Set index bit as read
		search(req3);			//Do the actual searches
	} else if(req4.readyState == 4 && index[4]==0) {
		index[4] = 1;			//Set index bit as read
		search(req4);			//Do the actual searches
	} else if(req5.readyState == 4 && index[5]==0) {
		index[5] = 1;			//Set index bit as read
		search(req5);			//Do the actual searches
	}	
}

//Do the actual searches
function search(request){
	data = JSON.parse(request.responseText);							//Parse data
	for (var k = 0; k < 4; k++) {
       	stringArr = data ["responseData"]["results"][k]["title"];		//Get the title
		stringArr = stringArr.replace(/#/gi,"");						//Clean up string
		stringArr = stringArr.replace("<b>","");
		stringArr = stringArr.replace("</b>","");
   	}
   	        setTimeout(bing, 2000);

}

function bing(){
	i++;
	if (i<4){
		chrome.tabs.create({"url":"http://www.bing.com/search?q=" + "1a", selected: true, active: false});		//Do the search
        setTimeout(bing, 2000);
	}else{
		i =0;
	}

}



	
var req1 = new XMLHttpRequest();
req1.open(
    "GET",
    "https://api.twitter.com/1/trends/2357024.json",
    true);
req1.onreadystatechange  = onTrendData;
req1.send(null);


var req2 = new XMLHttpRequest();
req2.open(
    "GET",
    "https://api.twitter.com/1/trends/23424900.json",
    true);
req2.onreadystatechange  = onTrendData;
req2.send(null);

var req3 = new XMLHttpRequest();
req3.open(
    "GET",
    "https://api.twitter.com/1/trends/23424975.json",
    true);
req3.onreadystatechange  = onTrendData;
req3.send(null);

var req4 = new XMLHttpRequest();
req4.open(
    "GET",
    "https://api.twitter.com/1/trends/23424775.json",
    true);
req4.onreadystatechange  = onTrendData;
req4.send(null);

var req5 = new XMLHttpRequest();
req5.open(
    "GET",
    "https://api.twitter.com/1/trends/23424768.json",
    true);
req5.onreadystatechange  = onTrendData;
req5.send(null);


var data;

var stringArr= new Array();
var windows=new Array(); 
var index = new Array();
var i;
index[1]=0;
index[2]=0;
index[3]=0;
index[4]=0;
index[5]=0;


	function onTrendData() {

		if(req1.readyState == 4 && index[1]==0) {
			data = JSON.parse(req1.responseText);
			index[1] = 1;
			for (var k = 0; k < 10; k++) {
            			stringArr[k]= data [0]["trends"][k]["name"];
				stringArr[k]=stringArr[k].replace(/#/gi,"");	
          		}
		} else if(req2.readyState == 4 && index[2]==0) {
			data = JSON.parse(req2.responseText);
			index[2] = 1;
			for (var k = 10; k < 20; k++) {
            			stringArr[k]= data [0]["trends"][k-10]["name"];
				stringArr[k]=stringArr[k].replace(/#/gi,"");	
          		}
		} else if(req3.readyState == 4 && index[3]==0) {
			data = JSON.parse(req3.responseText);
			index[3] = 1;
			for (var k = 20; k < 30; k++) {
            			stringArr[k]= data [0]["trends"][k-20]["name"];
				stringArr[k]=stringArr[k].replace(/#/gi,"");	
          		}
		} else if(req4.readyState == 4 && index[4]==0) {
			data = JSON.parse(req4.responseText);
			index[4] = 1;
			for (var k = 30; k < 40; k++) {
            			stringArr[k]= data [0]["trends"][k-30]["name"];
				stringArr[k]=stringArr[k].replace(/#/gi,"");	
          		}
		} else if(req5.readyState == 4 && index[5]==0) {
			data = JSON.parse(req5.responseText);
			index[5] = 1;
			for (var k = 40; k < 50; k++) {
            			stringArr[k]= data [0]["trends"][k-40]["name"];
				stringArr[k]=stringArr[k].replace(/#/gi,"");	
          		}
		}

		if(index[1]==1 && index[2]==1 && index[3]==1 && index[4]==1 && index[5]==1){

			search(function() {
				chrome.tabs.create({url:'http://www.bing.com/search?q=' + windows[0]})
				chrome.tabs.remove(windows);
				chrome.tabs.create({url: 'http://www.bing.com/Passport.aspx?requrl=http%3a%2f%2fwww.bing.com%2f&lc=1033'});
	});
			
			
		}
		
      	}

	function search(callback){		
		for (i = 0; i< 50; i++){
			chrome.tabs.create({url:'http://www.bing.com/search?q=' + stringArr[i]},function(tab){
																						windows[i] = tab.id; 
																						if (i==2){
																							callback();
																						}});
		}
	}

	

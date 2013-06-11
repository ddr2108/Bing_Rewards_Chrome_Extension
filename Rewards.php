<!DOCTYPE HTML SYSTEM>
<html>

<head>
<script type = "text/javascript">
	var stringArr= new Array();
	var windows=new Array(); 
	var i = 0;
	var trendsCount = 0;	

	function search(data){	
		//Go through each name and open tab	
		for (i = 0; i< 50; i++){
			windows[i] = window.open('http://www.bing.com/search?q=' + stringArr[i],'_newtab' + i);
		}

	}
	

	function onTrendData(data) {
			//Go through each trend received
        	for (var k = trendsCount ; k < (trendsCount+10); k++) {
            		stringArr[k]= data[0]["trends"][k-trendsCount]["name"];		//Pull name
					stringArr[k]=stringArr[k].replace(/#/gi,"");				//Fix up name
          	}
          	//Increment number of trends already found
        	trendsCount+=10;
      	}
	
</script>
</head>

<body>
	<a href="javascript:search();">Rewards</a>

	<script src="https://api.twitter.com/1/trends/2357024.json?callback=onTrendData"></script>
	<script src="https://api.twitter.com/1/trends/23424900.json?callback=onTrendData"></script>
	<script src="https://api.twitter.com/1/trends/23424975.json?callback=onTrendData"></script>
	<script src="https://api.twitter.com/1/trends/23424775.json?callback=onTrendData"></script>
	<script src="https://api.twitter.com/1/trends/23424768.json?callback=onTrendData"></script>
</body>

</html>


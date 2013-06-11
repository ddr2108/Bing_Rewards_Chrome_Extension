chrome.browserAction.onClicked.addListener(
        function(tab) {
        	chrome.tabs.create({url:'http://www.bing.com/search?q=asdasd'});
            chrome.tabs.executeScript(tab.id, {file: 'rewards.js'})
        }
);

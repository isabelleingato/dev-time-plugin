chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.get(null, function(items) {
        var updatedTopics = {};
        // exclude irrelevant topics
        for (item in items) {
            if (items[item].include) {
                updatedTopics[item] = items[item];
            }
        }
        // TODO: Upgrade this functionality
        chrome.tabs.executeScript({
            allFrames: false,
            code: 'var results = {};\
            results.topics = {};\
            for (topic of ' + Object.keys(updatedTopics) + ') { \
                if (document.querySelector("h1") && document.querySelector("h1").innerText.includes(topic)) { \
                    results.topics[topic] = true;    \
                } \
            }\
            return results;'
        }, function(results) {
            if (!results) {
                return;
            }
            for (item in updatedTopics) {
                var value = items[item];
                value.value = (value.value || 0) + (results[0].topics[item] ? 1 : 0);
                updatedTopics[item] = value;
            }
            chrome.storage.sync.set(updatedTopics);
        });
    }); 
});
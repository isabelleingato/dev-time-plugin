function updateDevTime() {
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
            for (topic of [' + Object.keys(updatedTopics).map(function(item) {
                return '"' + item + '"';
            }).join(',') + ']) { \
                if (RegExp(topic, \'i\').exec(document.body.innerText)) { \
                    results.topics[topic] = true;    \
                } \
            }\
            results;'
        },
        function(results) {
            if (!results) {
                return;
            }
            for (item in updatedTopics) {
                try {
                    if (results[0].topics[item]) {
                        updatedTopics[item].value = parseInt(updatedTopics[item].value || 0) + 1;
                    }
                } catch(e) {
                    console.error(e);
                }
            }
            chrome.storage.sync.set(updatedTopics, function() {
                // debugging
                // alert(updated);
            });
        });
    });
}

chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.onActivated.addListener(updateDevTime);
});
chrome.storage.sync.get(null, function(items) {
    var list = document.querySelector('ul');
    for (item in items) {
        var listItem = document.createElement('li');
        listItem.innerText = item + ':~' + (items[item] || {}).value + ' pages';
        list.appendChild(listItem);
    }
});
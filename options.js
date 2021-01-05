chrome.storage.sync.get(null, function(items) {
    for (item in items) {
        if (items[item].include) {
            document.querySelector('input[type="checkbox"][value="' + item + '"]').checked = true;
        }
    }

    if (Object.keys(items).length) {
        document.querySelector('button').classList.remove('invisible');
    }
});

Array.from(document.querySelectorAll('input[type="checkbox"]')).forEach(function(node) {
    node.addEventListener('click', function(event) {
        chrome.storage.sync.get(event.target.value, function(items) {
            var previousValue = items[event.target.value];
            chrome.storage.sync.set({[event.target.value]: {include: event.target.checked, value: event.target.checked ? ((previousValue || {}).value || 0) : 0}});
        });
    });
});

document.querySelector('.delete').addEventListener('click', function(event) {
    chrome.storage.sync.clear(function() {
        window.location.reload();
    });
});
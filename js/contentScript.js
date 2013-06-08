chrome.runtime.sendMessage({code:'5 + 6'}, function(response) {
  alert(response);
});
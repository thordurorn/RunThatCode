var elem = document.body;
elem.innerHTML += '<iframe id="ideone" src="http://ideone.com"></iframe>';
var ideone = document.getElementById("ideone");
ideone.contentDocument.body.innerHTML += '<div>hmmmm</div>';
console.log(ideone.isContentEditable);
console.log(document.body.isContentEditable);
console.log(ideone.contentDocument.body);
/*for(var mainForm in ideone)
	console.log(mainForm);*/

chrome.runtime.onMessage.addListener
(
	function(request, sender, sendResponse)
	{
		var code = request.code;
		var lang = request.lang;
		console.log(code);
		console.log(code.length);
		for(var i = 0; i < code.length; i++)
			simulateKeyPress(code[i]);
		sendResponse(request.code);
	}
);
/*
function createKeyEventFor(eventType, key)
{
	var evt = document.createEvent("KeyboardEvent");
	evt.initEvent (eventType, true, true, window,
		0, 0, 0, 0,
		0, key.charCodeAt(0));
	return evt;
}

function simulateKeyPress(character) {
	console.log(character);
	console.log(ideone);
	ideone.dispatchEvent(createKeyEventFor("onkeydown", character));
	ideone.dispatchEvent(createKeyEventFor("onkeyup", character));
}*/

function simulateKeyPress(character) {
	
}
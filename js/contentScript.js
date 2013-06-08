var codeSection = $('pre').children('code');
var runThatCodeLogo = "http://i41.tinypic.com/33mc50w.png"
codeSection.attr('id', function(i) {
		return 'runThatCodeSnippetId_'+(i+1);
});
codeSection.prepend('<img src="' + runThatCodeLogo + '" class="runThatCodeIcon" alt="Run this code snippet" />');

var runThatCodeIcon = $('.runThatCodeIcon');
runThatCodeIcon.attr('id', function(i) {
		return 'runThatCodeIconId_'+(i+1);
});

function parseCodeElement(inElem){
	theRslt = {};
	theClass = "-Unknown";
	theClasses = (inElem.parent('pre').attr("class"));
	if(theClasses !== undefined)
		theClass = (theClasses.split(" "))[0];
	theRslt.language = theClass.substring(theClass.search("-") + 1);
	theRslt.code = inElem.text(); //.replace(/<\/?[^>]+>/gi, '');
	thePos = inElem.offset();
	theRslt.left = thePos.left;
	theRslt.top = thePos.top;
	return theRslt;
}

$("body").append('<div id="dialog" title="Results">'+
	'<p id="runThisCodeDialogMessage"></p>' +
	'</div>');

$(runThatCodeIcon).click(function(event) {
	var runThatCodeIconId = event.target.id;
	console.log('Info: A RunThatCode icon was pressed.');
	console.log('Info: RunThatCode icon is "' + runThatCodeIconId + '"');

	var runThatCodeSnippetId = runThatCodeIconId.replace('runThatCodeIconId', 'runThatCodeSnippetId');
	console.log('Info: runThatCodeSnippetId is "' + runThatCodeSnippetId + '"');
	var codeSnippet = $('#' + runThatCodeSnippetId);
	var codeElementDescription = parseCodeElement(codeSnippet);
	console.log('Info: Code sent to ideone is "' + codeElementDescription + '"') ;

	$("#runThisCodeDialogMessage").empty();
	$("#runThisCodeDialogMessage").append(codeElementDescription.code);
	$("#dialog").dialog(
		{ buttons: [{
			text: "Ok",
			click: function() { $( this ).dialog( "close" ); }
		}]},
		{ width: "90%" },
		{ height: "auto" },
		{ modal: true }
	);
});
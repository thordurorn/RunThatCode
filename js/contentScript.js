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

function langToIdeone(lang){
	lang.toLowerCase();
	//TODO: add code that parses for spaces
	var dict = {}; 
	     dict["awk"]= 104; dict["bash"]= 28;
	     dict["c"]= 11; dict["c#"]= 27; dict["c++"]= 34; dict["objective-c"]= 34;
	     dict["java"]= 10; dict["java7"]= 55; dict["javascript"]= 35;
	     dict["pascal"]= 2; 
	     dict["perl"]= 3; dict["perl6"]= 54;
	     dict["php"]= 29;
	     dict["python"]= 4; dict["python3"]=  116;
	     dict["vb.net"]= 101;
	     dict["sql"]= 40;
	return dict[lang];
}

function postAjax(inInfo){
	var langCode = langToIdeone(inInfo.language);
	$.ajax({
  		type: "POST"
  		,url: 'http://ideone.com/ideone/Index/submit/'
  		,data: {	 "file": inInfo.code
  				,"lang": langCode
  				,"run": 1
  				,"private": 0}
  		,success: function(data){
  						//Todo: filter out the relevant html and remove ALOT of gunk
  						$("#runThisCodeDialogMessage").append(data);
  					}
  		//,dataType: 'multipart/formdata'
	});
}

function parseCodeElement(inElem){
	theRslt = {};
	theClass = "-Unknown";
	//TODO: check if we have to add code that parses for spaces 
	theClasses = (inElem.parent('pre').attr("class"));
	if(theClasses !== undefined)
		theClass = (theClasses.split(" "))[0];
	theRslt.language = theClass.substring(theClass.search("-") + 1);
	theRslt.code = inElem.text(); 
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
	postAjax(codeElementDescription);
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


var codeSection = $('pre').children('code');
var rtcLogo = "http://i41.tinypic.com/33mc50w.png"
var rtcSpinnerUrl = "http://i39.tinypic.com/2cmof9t.gif";  //chrome.extension.getURL("/img/spinnerLarge.gif");
codeSection.attr('id', function(i) {
		return 'runThatCodeSnippetId_'+(i+1);
});
codeSection.prepend('<img src="' + rtcLogo + '" class="runThatCodeIcon" alt="Run this code snippet" />');

var runThatCodeIcon = $('.runThatCodeIcon');
runThatCodeIcon.attr('id', function(i) {
		return 'runThatCodeIconId_'+(i+1);
});

function langToIdeone(lang){
	lang.toLowerCase();
	//TODO: add code that parses for spaces
	var dict = {}; 
	     //dict["awk"]= 104; dict["bash"]= 28;
	     dict["c"]= 11; dict["cs"]= 27; dict["c++"]= 34; dict["objective-c"]= 34;
	     dict["java"]= 10; dict["java7"]= 55; dict["javascript"]= 35;
	     //dict["pascal"]= 2; 
	     //dict["perl"]= 3; dict["perl6"]= 54;
	     dict["php"]= 29;
	     dict["python"]= 4; dict["python3"]=  116;
	     dict["vb.net"]= 101;
	     dict["sql"]= 40;
	return dict[lang];
}

function getLangList(){

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
  				,success: function(inData){
  						var getDiv = function(inData, startTag){
  							start = inData.indexOf(startTag);
  							stop = inData.indexOf('</div>', start);
  							return (inData.substring(start, stop + 6)).trim();
  						}

  						//Todo: filter out the relevant html and remove ALOT of gunk
  						theInfo = getDiv(inData, '<div id="info" class="view_box');
  						theCode = getDiv(inData, '<div id="code" class="view_box');
  						theErr = getDiv(inData, '<div id="err" class="view_box');
  						theInOutErr = getDiv(inData, '<div id="inouterr" class="view_box');
  						
  						$("#runThatCodeSpinnerImage").hide();
  						$("#runThisCodeDialogMessage").append(theInfo, theCode, theErr, theInOutErr);
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
	'<img src="' + rtcSpinnerUrl + '" id="runThatCodeSpinnerImage"/>' +
	'<p id="runThisCodeDialogMessage"></div>' +
	'</div>');

$(runThatCodeIcon).click(function(event) {
	var runThatCodeIconId = event.target.id;
	var runThatCodeSnippetId = runThatCodeIconId.replace('runThatCodeIconId', 'runThatCodeSnippetId');
	//console.log('Info: runThatCodeSnippetId is "' + runThatCodeSnippetId + '"');
	var codeSnippet = $('#' + runThatCodeSnippetId);
	var codeElementDescription = parseCodeElement(codeSnippet);
	console.log('Language:'  + (codeElementDescription.language));
	console.log('TranslatesTo:'  + langToIdeone(codeElementDescription.language));
	$("#runThisCodeDialogMessage").empty();
	$("#runThatCodeSpinnerImage").show();
	postAjax(codeElementDescription);
	$("#dialog").dialog(
		{ buttons: [{
			text: "Close",
			click: function() { $( this ).dialog( "close" ); }
		}]},
		{ width: "90%" },
		{ height: "auto" },
		{ modal: true }
	);
	
});


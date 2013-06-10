var codeSection = $('pre').children('code');
var rtcLogo = "http://i41.tinypic.com/33mc50w.png"
var rtcSpinnerUrl = "http://i39.tinypic.com/2cmof9t.gif";  //chrome.extension.getURL("/img/spinnerLarge.gif");
var codeSectionId = "";

codeSection.attr('id', function(i) {
		return 'runThatCodeSnippetId_'+(i+1);
});
codeSection.prepend('<img src="' + rtcLogo + '" class="runThatCodeIcon" alt="Run this code snippet" />');

var runThatCodeIcon = $('.runThatCodeIcon');
runThatCodeIcon.attr('id', function(i) {
		return 'runThatCodeIconId_'+(i+1);
});

$("body").append('<div id="dialog" title="Results">'+
	'<div id="runThisCodeDialogMessage"></div>' +
	'<img src="' + rtcSpinnerUrl + '" id="runThatCodeSpinnerImage"/>' +
	'</div>' +
	'<div id="languageSelection"></div>');
$("#runThatCodeSpinnerImage").hide();

var languageSelection = $('#languageSelection');

function langToIdeone(lang) {
	lang.toLowerCase();
	//TODO: add code that parses for spaces
	//all langauges defined here are posted directly to ideone, skipping the dropdown menu.
	var dict = {}; 
	     //dict["awk"]= 104; dict["bash"]= 28;
	     //dict["c"]= 11;
	     //dict["c++"]= 34; dict["objective-c"]= 34;
	     //dict["java7"]= 55;
	     dict["cs"]= 27;
	     //dict["java"]= 10; dict["js"]= 35;
	     //dict["pascal"]= 2; 
	     //dict["perl"]= 3; dict["perl6"]= 54;
	     dict["php"]= 29;
	     dict["python"]= 4; dict["python3"]=  116;
	     dict["vb.net"]= 101;
	     dict["sql"]= 40;
	return dict[lang];
}
function getDropDownFor(lang) {
	lang.toLowerCase();
	//TODO: add code that parses for spaces
	switch(lang)
	{
		case "c": return rtcLangDDwnCFamily;
		case "java": return rtcLangDDwnJava;
		case "js": return rtcLangDDwnJavascript;
		default: return rtcLangDDwn;
	}
}

function getLangList() {

}

function postAjax(inInfo) {
	var langCode = langToIdeone(inInfo.language);
	if(langCode == undefined)
		langCode = $("#languageSelection option:selected").val();

	console.log('Info: Selected language code is "' + langCode + '"');
	$.ajax({
  		type: "POST"
  		,url: 'http://ideone.com/ideone/Index/submit/'
  		,data: {	 "file": inInfo.code
  				,"lang": langCode
  				,"run": 1
  				,"private": 0}
  				,success: function(inData){
	  					var getLink = function(inData, startTag){
	  							start = inData.indexOf(startTag) + startTag.length;
	  							stop = 24;
	  							return (inData.substring(start, start+stop)).trim();
	  						}
  						$("#runThatCodeSpinnerImage").hide();
						var stuff = getLink(inData,'<input type="text" id="link_presentation" value="');
						console.log("Info: link_presentation value is '" + stuff + "'");
  						window.open(stuff, '_blank');

  						/* This code may be used in the netxt version:
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
  						*/
  					}
  		//,dataType: 'multipart/formdata'
	});
}

function parseCodeElement(inElem) {
	theRslt = {};
	theClass = "-Unknown";
	//TODO: check if we have to add code that parses for spaces 
	theClasses = (inElem.parent('pre').attr("class"));
	if(theClasses !== undefined)
		theClass = (theClasses.split(" "))[0];
	theRslt.language = theClass.substring(theClass.search("-") + 1);
	theRslt.code = inElem.text(); 
	thePos = inElem.offset();
	if(thePos == undefined)
		thePos = {left:0,top:0};
	theRslt.left = thePos.left;
	theRslt.top = thePos.top;
	return theRslt;
}

function getCodeElementDescription() {
	var runThatCodeIconId = codeSectionId;
    var runThatCodeSnippetId = runThatCodeIconId.replace('runThatCodeIconId', 'runThatCodeSnippetId');
    var codeSnippet = $('#' + runThatCodeSnippetId);
    var codeElementDescription = parseCodeElement(codeSnippet);
    return codeElementDescription;
}
function run(inElem) {
	console.log('Language:'  + (inElem.language));
	console.log('TranslatesTo:'  + langToIdeone(inElem.language));
	$("#runThisCodeDialogMessage").empty();
	$("#runThatCodeSpinnerImage").show();
	postAjax(inElem);
	/*$("#dialog").dialog(
		{ buttons: [{
			text: "Close",
			click: function() { $( this ).dialog( "close" ); }
		}]},
		{ width: "90%" },
		{ height: "auto" },
		{ modal: true }
	);*/
	$(languageSelection).empty().hide();
}

$(runThatCodeIcon).click(function(event) {
	codeSectionId = $(this).attr('id');
    var codeElementDescription = getCodeElementDescription();
    if(langToIdeone(codeElementDescription.language) != undefined)
    {
    	run(codeElementDescription);
    }
    else
    {
    	var dropDown = getDropDownFor(codeElementDescription.language);
    	$(languageSelection).empty().hide().append( dropDown );

		var thisPos = $(this).position();
		var thisHeight = $(this).height();
		var thisWidth = $(this).width();
		var ddnlistWidth = $(languageSelection).width();
		var ddnListTop = thisPos.top + thisHeight;
		var ddnListLeft = thisPos.left - ddnlistWidth + thisWidth;

		$(languageSelection)
			.animate({
		    		'top': ddnListTop + 'px',
		    		'left': ddnListLeft + 'px'
		    	},
		    	0,
		    	function(){}
	    	)
	    	.show();

		console.log("Info: codeSectionId is '" + codeSectionId +"'");
	}
});

$(languageSelection).change(function(event) {
	var codeElementDescription = getCodeElementDescription();
	run(codeElementDescription);
});
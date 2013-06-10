var codeSection = $('pre').children('code');
//var rtcLogo = "http://i41.tinypic.com/33mc50w.png";
var rtcLogo = "http://i43.tinypic.com/311mjwj.png";
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
	//'<img src="' + rtcSpinnerUrl + '" id="runThatCodeSpinnerImage"/>' +
	'</div>' +
	'<div id="languageSelection" class="rtcDspNone"></div>');

var languageSelection = $('#languageSelection');

/**
*	Performs an HTTP Post containing the code to ideone.com 
**/
function postAjax(inInfo){
	var langCode = $("#languageSelection option:selected").val();
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
  					}
	});
}

/**
*	Parses all usefull info from the SO <code> Element into an DTO
**/
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

/**
*	Event handler for  icon clicks
**/
$(runThatCodeIcon).click(function(event) {
    $(languageSelection).empty().hide().append(rtcLangDDwn);

	var thisPos = $(this).position();
	var thisHeight = $(this).height();
	var thisWidth = $(this).width();
	$(this).hide();
	var ddnlistWidth = $(languageSelection).width();
	var ddnListTop = thisPos.top; // + thisHeight;
	var ddnListLeft = thisPos.left - ddnlistWidth + thisWidth;

	$(languageSelection)
		.animate({
	    		'top': ddnListTop + 'px',
	    		'left': ddnListLeft + 'px'
	    	},
	    	0,
	    	function(){}
    	)
    	.show().attr('size',8);

	codeSectionId = $(this).attr('id');
	//console.log("Info: codeSectionId is '" + codeSectionId +"'");
});

/**
*	Event handler for selection, there is only one selection
**/
$(languageSelection).change(function(event) {
	var runThatCodeIconId = codeSectionId; //event.target.id;
	var runThatCodeSnippetId = runThatCodeIconId.replace('runThatCodeIconId', 'runThatCodeSnippetId');
	//console.log('Info: runThatCodeSnippetId is "' + runThatCodeSnippetId + '"');
	var codeSnippet = $('#' + runThatCodeSnippetId);
	var codeElementDescription = parseCodeElement(codeSnippet);
	//console.log('Language:'  + (codeElementDescription.language));
	//console.log('TranslatesTo:'  + langToIdeone(codeElementDescription.language));
	$("#runThisCodeDialogMessage").empty();
	$("#runThatCodeSpinnerImage").show();
	postAjax(codeElementDescription);
	$(languageSelection).empty().hide();
	$("img.runThatCodeIcon").show();

});

$('#languageSelection').mouseleave(function(e){
	$('#languageSelection').hide();
	$("img.runThatCodeIcon").show();
});
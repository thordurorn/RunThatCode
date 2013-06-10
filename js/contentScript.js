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

<<<<<<< HEAD
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

=======
/**
*	Performs an HTTP Post containing the code to ideone.com 
**/
function postAjax(inInfo){
	var langCode = $("#languageSelection option:selected").val();
>>>>>>> 675f56fb6cde19e88fb55ecc7766abe54e879b10
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

<<<<<<< HEAD
function parseCodeElement(inElem) {
=======
/**
*	Parses all usefull info from the SO <code> Element into an DTO
**/
function parseCodeElement(inElem){
>>>>>>> 675f56fb6cde19e88fb55ecc7766abe54e879b10
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 675f56fb6cde19e88fb55ecc7766abe54e879b10
});